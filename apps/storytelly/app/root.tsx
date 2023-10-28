import { cssBundleHref } from '@remix-run/css-bundle';
import { json, type LinksFunction } from '@remix-run/node';
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from '@remix-run/react';
import { Theme } from '@radix-ui/themes';
import styles from '@radix-ui/themes/styles.css';
import { useSupabase } from '../utils/supabase.browser';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: styles },
  ...(cssBundleHref ? [{ rel: 'stylesheet', href: cssBundleHref }] : []),
];

export const loader = () =>
  json({
    env: {
      SUPABASE_URL: process.env.SUPABASE_URL as string,
      SUPABASE_ANON: process.env.SUPABASE_ANON as string,
    },
  });

function Document({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
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
  const { env } = useLoaderData<typeof loader>();
  const supabase = useSupabase(env.SUPABASE_URL, env.SUPABASE_ANON);

  return (
    <Document>
      <Theme
        accentColor="brown"
        grayColor="gray"
        panelBackground="solid"
        scaling="100%"
        radius="full"
        appearance="dark"
      >
        <Outlet context={{ supabase }} />
      </Theme>
    </Document>
  );
}
