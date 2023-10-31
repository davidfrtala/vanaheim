import { useOutletContext } from '@remix-run/react';
import { SupabaseClient } from '@supabase/supabase-js';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa as theme } from '@supabase/auth-ui-shared';
import { SupabaseOutletContext } from '@storytelly/db';
import { useTheme } from '@storytelly/utils';
import { inputVariant } from '@storytelly/components/ui';
import tailwindConfig from '../../tailwind.config';

export default function AuthLogin() {
  const { supabase } = useOutletContext<SupabaseOutletContext>();
  const [themeMode] = useTheme();
  const {
    theme: {
      extend: { colors, borderRadius },
    },
  } = tailwindConfig;

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="container relative flex-col items-center justify-center h-[100vh] md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col p-10 text-muted dark:border-r lg:flex">
        <div className="absolute inset-0 bg-secondary-foreground" />
        <div className="relative z-20 flex items-center text-lg font-medium">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mr-2 h-6 w-6"
          >
            <path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" />
          </svg>
          Storytelly
        </div>
        <div className="relative z-20 mt-auto">
          <blockquote className="space-y-2">
            <p className="text-lg">
              &ldquo;Storytelly has completely transformed the way I write and
              experience stories! It's like a portal to a world of infinite
              creativity. If you're a storyteller, you need Storytelly in your
              life!&rdquo;
            </p>
            <footer className="text-sm">Emil Prikryl</footer>
          </blockquote>
        </div>
      </div>
      <div className="lg:p-8">
        <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
          <Auth
            theme={themeMode ?? 'light'}
            socialLayout="horizontal"
            supabaseClient={supabase as unknown as SupabaseClient}
            redirectTo="/"
            appearance={{
              theme,
              extend: true,
              variables: {
                default: {
                  radii: {
                    borderRadiusButton: borderRadius.md,
                    buttonBorderRadius: borderRadius.md,
                    inputBorderRadius: borderRadius.md,
                  },
                  colors: {
                    brand: colors.primary.DEFAULT,
                    brandAccent: 'hsl(var(--primary) / .9)',
                    brandButtonText: colors.primary.foreground,
                    defaultButtonBackground: 'transparent',
                    defaultButtonBackgroundHover: colors.accent.DEFAULT,
                    // defaultButtonBorder: 'lightgray',
                    // defaultButtonText: 'gray',
                    // dividerBackground: '#eaeaea',
                    inputBackground: 'transparent',
                    inputBorder: colors.border,
                    inputBorderHover: '',
                    inputBorderFocus: '',
                    inputText: colors.muted.foreground,
                    inputLabelText: '',
                    inputPlaceholder: colors.muted.foreground,
                    // messageText: '#2b805a',
                    // messageBackground: '#e7fcf1',
                    // messageBorder: '#d0f3e1',
                    // messageTextDanger: '#ff6369',
                    // messageBackgroundDanger: '#fff8f8',
                    messageBorderDanger: colors.destructive.DEFAULT,
                    // anchorTextColor: 'gray',
                    // anchorTextHoverColor: 'darkgray',
                  },
                },
              },
              className: {
                input: inputVariant(),
              },
            }}
            providers={['apple', 'google', 'notion', 'facebook', 'twitter']}
          />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <button onClick={handleLogout}>Log out</button>.
          </p>
        </div>
      </div>
    </div>
  );
}
