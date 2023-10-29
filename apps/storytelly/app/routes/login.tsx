import { Button } from '@radix-ui/themes';
import { useOutletContext } from '@remix-run/react';
import { SupabaseOutletContext } from '@storytelly/utils';

export default function Login() {
  const { supabase } = useOutletContext<SupabaseOutletContext>();

  const handleEmailLogin = async () => {
    await supabase.auth.signInWithPassword({
      email: 'user@test.com',
      password: 'leningrad',
    });
  };

  const handleGitHubLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'github',
      options: {
        redirectTo: 'http://localhost:3000/auth/callback',
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  return (
    <>
      <Button onClick={handleEmailLogin}>Email Login</Button>
      <Button onClick={handleGitHubLogin}>GitHub Login</Button>
      <Button onClick={handleLogout}>Logout</Button>
    </>
  );
}
