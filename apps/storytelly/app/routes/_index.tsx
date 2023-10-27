import type { MetaFunction } from '@remix-run/node';
import { Box, Heading } from '@radix-ui/themes';

export const meta: MetaFunction = () => {
  return [
    { title: 'Storytelly' },
    { name: 'description', content: 'Welcome to Storytelly!' },
  ];
};

export default function Index() {
  return (
    <Box p={'4'}>
      <Heading color="orange">Storytelly</Heading>
    </Box>
  );
}
