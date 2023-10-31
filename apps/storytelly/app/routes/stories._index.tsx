import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { formatDistance, parseISO } from 'date-fns';
import { getServerClient } from '@storytelly/db';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Button,
} from '@storytelly/components/ui';

import { EyeOpenIcon as ReadIcon } from '@radix-ui/react-icons';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { supabase, headers } = getServerClient(request);

  const { data, error } = await supabase
    .from('stories')
    .select('id, name, created_at');

  if (error) {
    throw new Response('Server error', { status: 500 });
  }

  return json(
    { data },
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
    <>
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Storytelly</h2>
      </div>

      <div className="p-4">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Name</TableHead>
              <TableHead className="w-[100px]">Created at</TableHead>
              <TableHead className="w-[100px]" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {data?.map((story, index) => (
              <TableRow key={index}>
                <TableCell>{story.id}</TableCell>
                <TableCell>{story.name}</TableCell>
                <TableCell>
                  {formatDistance(parseISO(story.created_at), new Date(), {
                    addSuffix: true,
                  })}
                </TableCell>
                <TableCell>
                  <Link to={`/stories/${story.id}`}>
                    <Button>
                      <ReadIcon className="w-4 h-4 mr-2" /> Read a story
                    </Button>
                  </Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </>
  );
}

export function ErrorBoundary() {
  return (
    <div className="error-container">
      Something unexpected went wrong. Sorry about that.
    </div>
  );
}
