import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from '@vercel/remix';
import { useLoaderData } from '@remix-run/react';
import { Box, Heading } from '@radix-ui/themes';
import { getServerClient } from '@storytelly/db';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const { supabase, headers } = getServerClient(request);

  const { data, error } = await supabase
    .from('stories')
    .select('id, name, created_at')
    .eq('id', (params as { id: string }).id);

  if (data?.length !== 1) {
    throw new Response('Story not found', { status: 404 });
  }

  if (error) {
    throw new Response('Server error', { status: 500 });
  }

  return json(
    { data: data[0] },
    {
      headers,
    }
  );
};

export const meta: MetaFunction = () => {
  return [
    { title: 'Storytelly' },
    { name: 'description', content: 'Welcome to Storytelly!' },
  ];
};

export default function Index() {
  const { data } = useLoaderData<typeof loader>();

  return (
    <Box p={'4'}>
      <Heading color="orange">{data.name}</Heading>
    </Box>
  );
}
