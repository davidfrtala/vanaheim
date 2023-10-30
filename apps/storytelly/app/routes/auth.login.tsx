import { Link, useOutletContext } from '@remix-run/react';
import { SupabaseOutletContext } from '@storytelly/utils';
import { AuthForm } from '@storytelly/components/auth/AuthForm';

export default function AuthLogin() {
  const { supabase } = useOutletContext<SupabaseOutletContext>();

  const handleEmailLogin = async () => {
    await supabase.auth.signInWithPassword({
      email: 'user@test.com',
      password: 'leningrad',
    });
  };

  const handleGoogleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <div className="container relative hidden flex-col items-center justify-center h-[100vh] md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
      <div className="relative hidden h-full flex-col bg-muted p-10 text-white dark:border-r lg:flex">
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
          <div className="flex flex-col space-y-2 text-center">
            <h1 className="text-2xl font-semibold tracking-tight">Sign in</h1>
            <p className="text-sm text-muted-foreground">
              Please login to your account
            </p>
          </div>
          <AuthForm
            {...{
              onEmailLogin: handleEmailLogin,
              onGoogleLogin: handleGoogleLogin,
            }}
          />
          <p className="px-8 text-center text-sm text-muted-foreground">
            <button onClick={handleLogout}>Log out</button>.
          </p>
        </div>
      </div>
    </div>
  );
}
