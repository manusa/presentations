import React from 'react';
import slideControls, {
  visibleClassNameInStep
} from '../../../components/slide-controls/slide-controls';
import SyntaxHighlighter from 'react-syntax-highlighter';
import {androidstudio} from 'react-syntax-highlighter/dist/styles/hljs';
import './slide4.scss';

const Slide4 = ({currentStep}) => {
  const classNameVisibleIn = visibleClassNameInStep(currentStep);
  return (
    <div className={'slide slide4'}>
      <div className={'title'}>100% Code Coverage</div>
      <div className={'content'}>
        <SyntaxHighlighter
          className={classNameVisibleIn(2)}
          language={'java'} style={androidstudio}>
          {`
@PutMapping(
    path = "/{externalId}",
    headers = {"Special-Header=XML Babel"},
    consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_XML_VALUE)
@ResponseStatus(HttpStatus.OK)
public Beer updateBeerAsXML(
    @PathVariable("externalId") String externalId, @Validated @RequestBody Beer beer) {

  return beerService.updateBeer(externalId, beer);
}
          `}
        </SyntaxHighlighter>
        <SyntaxHighlighter
          className={classNameVisibleIn(3)}
          language={'java'} style={androidstudio}>
          {`
  @Test
  public void updateBeerAsXML_validBeer_shouldReturnUpdatedBeer(){
    beerResource.updateBeerAsXML("OST.01", new Beer());
    verify(mockBeerService, times(1))
        .updateBeer(Mockito.eq("OST.01"), Mockito.any(Beer.class));
  }
          `}
        </SyntaxHighlighter>
        <SyntaxHighlighter
          className={classNameVisibleIn(4)}
          language={'java'} style={androidstudio}>
          {`
@PutMapping(
    path = "/{externalId}",
    headers = {"Special-Header=XML Babel"},
    consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_XML_VALUE)
@ResponseStatus(HttpStatus.OK)
public Beer updateBeerAsXML(
    @PathVariable("externalId") String externalId, @Validated @RequestBody Beer beer) {

  return beerService.updateBeer(externalId, beer);
}
          `}
        </SyntaxHighlighter>
        <SyntaxHighlighter
          className={classNameVisibleIn(5)}
          language={'java'} style={androidstudio} wrapLines={true}
          // eslint-disable-next-line no-confusing-arrow
          lineProps={line => [2, 3, 4, 5, 6, 8].includes(line) ? {style: {'background-color': 'rgba(30, 255, 0, 0.36)'}} : {}}>
          {`
@PutMapping(
    path = "/{externalId}",
    headers = {"Special-Header=XML Babel"},
    consumes = MediaType.APPLICATION_JSON_UTF8_VALUE, produces = MediaType.APPLICATION_XML_VALUE)
@ResponseStatus(HttpStatus.OK)
public Beer updateBeerAsXML(
    @PathVariable("externalId") String externalId, @Validated @RequestBody Beer beer) {

  return beerService.updateBeer(externalId, beer);
}
          `}
        </SyntaxHighlighter>
      </div>
    </div>
  );
};

export default slideControls(Slide4, '/presentations/mock-mvc-in-action/slide3', '/presentations/mock-mvc-in-action/slide4', 5);
