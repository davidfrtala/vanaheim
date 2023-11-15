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
          <NavigationMenu className="mr-auto">
            <NavigationMenuList className="flex items-center space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <NavLink to="/stories">Stories</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <NavLink to="/stories/new">New story</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <NavLink to="/stories/pathway">Pathway</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <NavLink to="/stories/read">Read</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu className="ml-auto">
            <NavigationMenuList className="flex items-center space-x-6">
              <NavigationMenuItem>{session?.user.email}</NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink>
                  <NavLink to="/auth/login">Auth</NavLink>
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <ModeToggle />
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
      <div className="flex-1 space-y-4 p-8 pt-6">
        <Outlet />
      </div>
    </div>
  );
}
