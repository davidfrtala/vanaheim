import {
  json,
  type MetaFunction,
  type LoaderFunctionArgs,
} from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Box, Heading } from '@radix-ui/themes';
import { createServerClient } from '../../utils/supabase.server';

export const loader = async ({ request, params }: LoaderFunctionArgs) => {
  const response = new Response();

  const { data, error } = await createServerClient(request, response)
    .from('stories')
    .select('id, name, created_at')
    .eq('id', (params as { id: string }).id);

  if (error) throw error;

  return json(
    { data: data[0] },
    {
      headers: response.headers,
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
      <Heading color="orange">{data?.name}</Heading>
    </Box>
  );
}
