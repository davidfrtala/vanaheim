import { Suspense, lazy } from 'react';
import { LinksFunction } from '@remix-run/node';
import { PlusIcon } from '@radix-ui/react-icons';
import {
  Button,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@storytelly/components/ui';

import Flow from '@storytelly/components/flow/Flow';
const LazyComponent = lazy(() => import('../components/editor/Editor'));

import flowStyle from 'reactflow/dist/style.css';
import editorStyles from '../components/editor/editor.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: editorStyles },
  { rel: 'stylesheet', href: flowStyle },
];

export default function Editor() {
  return (
    <Suspense fallback={<p>Loading lazy chunk...</p>}>
      <div className="flex flex-wrap h-screen-minus-navbar -m-8 -mt-6">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/6">
          <div className="h-full p-4">
            <Tabs defaultValue="tools">
              <TabsList className="grid w-full grid-cols-2 pb-6">
                <TabsTrigger value="tools">Tools</TabsTrigger>
                <TabsTrigger value="notes">Notes</TabsTrigger>
              </TabsList>
              <TabsContent value="tools">
                <div className="flex w-full flex-1 flex-col justify-end space-y-2 py-2">
                  <p className="text-sm text-muted-foreground">
                    Insert a dialogue
                  </p>
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger>
                        <Button variant="outline" className="w-full">
                          <PlusIcon className="mr-2 h-4 w-4" /> Dialogue
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          When a reader reaches this point, they will need to
                          make a choice <br />
                          that determines the direction the story will take
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                  <p className="text-sm text-muted-foreground">
                    Insert a decision point into the story
                  </p>
                  <TooltipProvider>
                    <Tooltip delayDuration={0}>
                      <TooltipTrigger>
                        <Button variant="outline" className="w-full">
                          <PlusIcon className="mr-2 h-4 w-4" /> Decision
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>
                          When a reader reaches this point, they will need to
                          make a choice <br />
                          that determines the direction the story will take
                        </p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                </div>
              </TabsContent>
              <TabsContent value="notes">
                <p className="text-sm text-muted-foreground">
                  Characters, locations, items, and more
                </p>
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/2 border-l border-r shadow-lg">
          <div className="h-full">
            <LazyComponent />
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div className="h-full">
            <Flow />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
