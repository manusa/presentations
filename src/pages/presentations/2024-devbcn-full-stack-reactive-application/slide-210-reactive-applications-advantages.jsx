import React from 'react';
import slideControls from '../../../components/slide-controls/slide-controls';
import { DevBcn2024} from '../../../components';

const Slide210 = () => {
  return (
    <DevBcn2024.TitleTemplate
      slide={21}
      title='Advantages of Reactive Applications'
      subtitle='Demo'
    />
  );
};

export default slideControls(Slide210,
  `/presentations/${DevBcn2024.SLUG}/slide-200-consuming-sse`,
  `/presentations/${DevBcn2024.SLUG}/slide-220`
);
