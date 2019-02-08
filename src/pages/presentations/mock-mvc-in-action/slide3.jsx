import React from 'react';
import slideControls, {visibleClassNameFromStep} from '../../../components/slide-controls/slide-controls';
// import {Prism as SyntaxHighlighter} from 'react-syntax-highlighter';
import SyntaxHighlighter from 'react-syntax-highlighter';
// import {java} from 'react-syntax-highlighter/dist/languages/prism';
// import {okaidia} from 'react-syntax-highlighter/dist/styles/prism';
import {androidstudio} from 'react-syntax-highlighter/dist/styles/hljs';
// import './slide3.scss';

const Slide3 = ({currentStep}) => {
  const classNameVisibleFrom = visibleClassNameFromStep(currentStep);
  return (
    <div className={'slide slide3'}>
      <div className={'title'}>100% Code Coverage</div>
      <div className={'content'}>
        <SyntaxHighlighter language={'java'} style={androidstudio}>
          {`
@PostMapping
public ResponseEntity<Void> insertFile(MultipartHttpServletRequest request) throws IOException {
    final MultipartFile multipartFile = request.getFile(request.getFileNames().next());
    fileService.saveFile(multipartFile.getName(), multipartFile.getInputStream());
    return ResponseEntity.noContent().build();
}
          `}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default slideControls(Slide3, '/presentations/mock-mvc-in-action/slide2', '/presentations/mock-mvc-in-action/slide4');
