import { Suspense, lazy } from 'react';
import { LinksFunction } from '@remix-run/node';

const LazyComponent = lazy(() => import('../components/editor/Editor'));
import editorStyles from '../components/editor/editor.css';

export const links: LinksFunction = () => [
  { rel: 'stylesheet', href: editorStyles },
];

export default function Editor() {
  return (
    <Suspense fallback={<p>Loading lazy chunk...</p>}>
      <div className="flex flex-wrap h-screen-minus-navbar -m-8 -mt-6">
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/6 xl:w-1/6">
          <div className="h-full p-4 ">Left Sidebar</div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/2 xl:w-1/2 border-l border-r">
          <div className="h-full p-4">
            <LazyComponent />
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/3 lg:w-1/3 xl:w-1/3">
          <div className="h-full p-4">Right Sidebar</div>
        </div>
      </div>
    </Suspense>
  );
}
