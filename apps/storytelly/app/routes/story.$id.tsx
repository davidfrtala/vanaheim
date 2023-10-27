import type { MetaFunction, LoaderFunctionArgs } from '@remix-run/node';
import { useLoaderData } from '@remix-run/react';
import { Box, Heading } from '@radix-ui/themes';
import supabase from '../../utils/supabase';

export const loader = async ({ params }: LoaderFunctionArgs) => {
  const { data, error } = await supabase
    .from('stories')
    .select('id, name, created_at')
    .eq('id', (params as { id: string }).id);

  if (error) throw error;

  return { data: data[0] };
};

export const meta: MetaFunction = () => {
  return [
    { title: 'Storytelly' },
    { name: 'description', content: 'Welcome to Storytelly!' },
  ];
};

export default function Index() {
  const { data } = useLoaderData<ReturnType<typeof loader>>();

  return (
    <Box p={'4'}>
      <Heading color="orange">{data?.name}</Heading>
    </Box>
  );
}
