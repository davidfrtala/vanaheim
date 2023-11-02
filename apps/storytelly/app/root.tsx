import { useEffect } from 'react';
import { cssBundleHref } from '@remix-run/css-bundle';
import { json, LoaderFunctionArgs, type LinksFunction } from '@vercel/remix';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
  useRevalidator,
} from '@remix-run/react';
import { Theme } from '@radix-ui/themes';
import radixStyles from '@radix-ui/themes/styles.css';
import tailwindStyles from './tailwind.css';
import { ThemeProvider, useTheme, getThemeSession } from '@storytelly/utils';
import { useSupabase } from '@storytelly/db';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: radixStyles },
  { rel: 'stylesheet', href: tailwindStyles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const themeSession = await getThemeSession(request);

  return json({
    theme: themeSession.getTheme(),
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL as string,
      SUPABASE_ANON: process.env.SUPABASE_ANON as string,
    },
  });
};

function Document({ children }: { children: React.ReactNode }) {
  const [theme] = useTheme();

  const colorScheme = theme ?? 'light';

  return (
    <html lang="en" className={colorScheme} style={{ colorScheme }}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export default function App() {
  const { env, theme } = useLoaderData<typeof loader>();
  const { revalidate } = useRevalidator();
  const supabase = useSupabase(env.SUPABASE_URL, env.SUPABASE_ANON);

  useEffect(() => {
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      revalidate();
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [supabase.auth, revalidate]);

  return (
    <ThemeProvider specifiedTheme={theme}>
      <Document>
        <Theme
          accentColor="amber"
          grayColor="sand"
          panelBackground="solid"
          scaling="110%"
          radius="large"
        >
          <Outlet context={{ supabase }} />
        </Theme>
      </Document>
    </ThemeProvider>
  );
}
