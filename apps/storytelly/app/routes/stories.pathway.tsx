import { LinksFunction } from '@remix-run/node';
import { ReactFlowProvider } from 'reactflow';
import { StoryPathProvider } from '@storytelly/components/narative/useStoryPath';
import Flow from '@storytelly/components/flow/Flow';

import style from 'reactflow/dist/style.css';

export const links: LinksFunction = () => [{ rel: 'stylesheet', href: style }];

export default function Componnent() {
  return (
    <ReactFlowProvider>
      <StoryPathProvider>
        <div className="w-[95vw] h-[90vh]">
          <Flow />
        </div>
      </StoryPathProvider>
    </ReactFlowProvider>
  );
}
