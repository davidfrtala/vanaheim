import {
  redirect,
  type LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node';
import { Outlet, NavLink, useLoaderData } from '@remix-run/react';
import { getSession } from '@storytelly/db';
import { ModeToggle } from '@storytelly/components/mode-toggle';
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
} from '@storytelly/components/ui';

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const { session } = await getSession(request);
  return session || redirect('/auth/login');
};

export const meta: MetaFunction = () => {
  return [{ title: 'Stories - Storytelly' }];
};

export default function Index() {
  const session = useLoaderData<typeof loader>() as any;
  return (
    <div className="flex-col md:flex">
      <div className="border-b">
        <div className="flex h-16 items-center px-4">
          <div className="mr-auto flex items-center space-x-4">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuLink>
                    <NavLink to="/auth/login">Auth</NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                  <NavigationMenuLink>
                    <NavLink to="/stories/new">New story</NavLink>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className="ml-auto flex items-center space-x-4">
            {session?.user.email}
            <ModeToggle />
          </div>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
