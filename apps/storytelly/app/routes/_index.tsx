import {
  json,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { Link, useLoaderData } from '@remix-run/react';
import { formatDistance, parseISO } from 'date-fns';
import { createServerClient } from '@storytelly/utils';
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
  const response = new Response();
  const supabase = createServerClient(request, response);

  const { data, error } = await supabase
    .from('stories')
    .select('id, name, created_at');

  if (error) throw error;

  return json(
    { data },
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
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <nav className="flex items-center space-x-4 lg:space-x-6 mx-6">
            <Link
              to="/auth/login"
              className="text-sm font-medium transition-colors hover:text-primary"
            >
              Login
            </Link>
          </nav>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
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
                    <Link to={`/story/${story.id}`}>
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
      </div>
    </div>
  );
}
