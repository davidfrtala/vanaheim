import ReactFlow, {
  ReactFlowProps,
  Panel,
  Controls,
  Background,
  ConnectionLineType,
} from 'reactflow';

import { Button } from '../ui';

const edgesType: ConnectionLineType = ConnectionLineType.SimpleBezier;

export type FlowProps = Pick<
  ReactFlowProps,
  | 'nodes'
  | 'edges'
  | 'onNodesChange'
  | 'onEdgesChange'
  | 'onNodeClick'
  | 'onConnect'
> & {
  onHorizontalClick: () => void;
  onVerticalClick: () => void;
};

export function Flow({
  onHorizontalClick,
  onVerticalClick,
  ...flowProps
}: FlowProps) {
  return (
    <ReactFlow
      {...flowProps}
      connectionLineType={edgesType}
      // remove this after we subscribe to React Flow, once we start making shit tons of money :o)))
      proOptions={{ hideAttribution: true }}
      defaultEdgeOptions={{
        type: edgesType,
      }}
      fitView
      snapToGrid
    >
      <Panel position="top-right">
        <Button variant="outline" onClick={onVerticalClick}>
          vertical layout
        </Button>
        <Button variant="outline" onClick={onHorizontalClick}>
          horizontal layout
        </Button>
      </Panel>

      <Background color="hsl(var(--foreground))" gap={30} />
      <Controls position="top-left" />
    </ReactFlow>
  );
}
