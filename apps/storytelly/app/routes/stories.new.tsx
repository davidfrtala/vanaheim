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
      <LazyComponent />
    </Suspense>
  );
}
