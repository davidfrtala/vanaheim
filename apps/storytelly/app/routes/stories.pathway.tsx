import { LinksFunction } from '@remix-run/node';

import Flow from '@storytelly/components/flow/Flow';

import style from 'reactflow/dist/style.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];

export default function Componnent() {
  return (
    <div className="w-[95vw] h-[90vh]">
      <Flow />
    </div>
  );
}
