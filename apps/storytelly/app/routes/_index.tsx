import type { MetaFunction } from '@remix-run/node';
import { Box, Heading } from '@chakra-ui/react';

export const meta: MetaFunction = () => {
  return [
    { title: 'New Remix App' },
    { name: 'description', content: 'Welcome to Remix!' },
  ];
};

export default function Index() {
  return (
    <Box bg="tomato" w="100%" p={4} color="white">
      <Heading>Storytelly</Heading>
    </Box>
  );
}
