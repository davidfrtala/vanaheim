import type { MetaFunction } from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { formatDistance, parseISO } from 'date-fns';
import { Box, Heading, Table, Button } from '@radix-ui/themes';
import { EyeOpenIcon as ReadIcon } from '@radix-ui/react-icons';
import supabase from '../../utils/supabase';

export const loader = async () => {
  const { data, error } = await supabase
    .from('stories')
    .select('id, name, created_at');

  if (error) throw error;

  return { data };
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
      <Heading color="orange">Storytelly</Heading>

      <Table.Root>
        <Table.Header>
          <Table.Row>
            <Table.ColumnHeaderCell>ID</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell>Name</Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={200}>
              Created at
            </Table.ColumnHeaderCell>
            <Table.ColumnHeaderCell width={200} />
          </Table.Row>
        </Table.Header>

        <Table.Body>
          {data?.map((story, index) => (
            <Table.Row key={index}>
              <Table.RowHeaderCell>{story.id}</Table.RowHeaderCell>
              <Table.Cell>{story.name}</Table.Cell>
              <Table.Cell>
                {formatDistance(parseISO(story.created_at), new Date(), {
                  addSuffix: true,
                })}
              </Table.Cell>
              <Table.Cell>
                <Link to={`/story/${story.id}`}>
                  <Button>
                    <ReadIcon width="16" height="16" /> Read a story
                  </Button>
                </Link>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
    </Box>
  );
}
