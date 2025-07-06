import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import {DevBcn2025} from '../../../components';

const Slide100 = () => {
  return (
    <DevBcn2025.TitleTemplate
      slide={10}
      title='What is MCP?'
      subtitle={DevBcn2025.TITLE}
    />
  );
};

export default slideControls(Slide100,
  `/presentations/${DevBcn2025.SLUG}/slide-090-problem-statement-summary`,
  `/presentations/${DevBcn2025.SLUG}/slide-110-mcp-general-architecture`,
  1);
