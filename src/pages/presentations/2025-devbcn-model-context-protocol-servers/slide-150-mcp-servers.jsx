import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Slide100 = () => {
  return (
    <DevBcn2025.TitleTemplate
      slide={10}
      title='Implementing MCP Servers'
      subtitle={DevBcn2025.TITLE}
    />
  );
};

export default slideControls(Slide100,
  `/presentations/${DevBcn2025.SLUG}/slide-140-mcp-timeline`,
  `/presentations/${DevBcn2025.SLUG}/slide-160-mcp-servers-features`,
  1);
