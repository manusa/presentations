"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[9184],{63680:function(e,t,n){n.d(t,{ZP:function(){return i},Z5:function(){return l},y$:function(){return o},g6:function(){return c}});var r=n(51721),a=n(67294),s=n(14160);const l=e=>t=>e<t?"hidden":"visible",o=e=>t=>e!==t?"hidden":"visible",c=e=>t=>e>t?"hidden":"visible";var i=function(e,t,n,l){return void 0===l&&(l=1),function(o){function c(e){var t;return(t=o.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,r.Z)(c,o);var i=c.prototype;return i.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},i.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},i.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},i.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<l?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},c}(a.Component)}},64511:function(e,t,n){n.r(t);var r=n(67294),a=n(63680),s=n(49021),l=n(73587);t.default=(0,a.ZP)((e=>{let{currentStep:t}=e;const n=(0,a.y$)(t);return r.createElement("div",{className:"slide slide5"},r.createElement("div",{className:"title"},"100% Code Coverage"),r.createElement("div",{className:"content"},r.createElement(s.EK,{className:n(2),language:"java",style:l.Z},'\n          @PutMapping(\n              path = "/{externalId}",\n              headers = {"Special-Header=XML Babel"},\n              consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,\n              produces = MediaType.APPLICATION_XML_VALUE)\n          @ResponseStatus(HttpStatus.OK)\n          public Beer updateBeerAsXML(\n              @PathVariable("externalId") String externalId,\n              @Validated @RequestBody Beer beer) {\n          \n            return beerService.updateBeer(externalId, beer);\n          }\n        '),r.createElement(s.EK,{className:n(3),language:"java",style:l.Z},'\n          @Test\n          public void updateBeerAsXML_validBeer_shouldReturnUpdatedBeer(){\n            beerResource.updateBeerAsXML("OST.01", new Beer());\n            verify(mockBeerService, times(1))\n                .updateBeer(Mockito.eq("OST.01"), Mockito.any(Beer.class));\n          }\n        '),r.createElement(s.EK,{className:n(4),language:"java",style:l.Z},'\n          @PutMapping(\n              path = "/{externalId}",\n              headers = {"Special-Header=XML Babel"},\n              consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,\n              produces = MediaType.APPLICATION_XML_VALUE)\n          @ResponseStatus(HttpStatus.OK)\n          public Beer updateBeerAsXML(\n              @PathVariable("externalId") String externalId,\n              @Validated @RequestBody Beer beer) {\n          \n            return beerService.updateBeer(externalId, beer);\n          }\n        '),r.createElement(s.EK,{className:n(5),language:"java",style:l.Z,lineProps:e=>[1,2,3,4,5,6,8,9].includes(e)?{style:{backgroundColor:"rgba(30, 255, 0, 0.36)"}}:{}},'\n          @PutMapping(\n              path = "/{externalId}",\n              headers = {"Special-Header=XML Babel"},\n              consumes = MediaType.APPLICATION_JSON_UTF8_VALUE,\n              produces = MediaType.APPLICATION_XML_VALUE)\n          @ResponseStatus(HttpStatus.OK)\n          public Beer updateBeerAsXML(\n              @PathVariable("externalId") String externalId,\n              @Validated @RequestBody Beer beer) {\n          \n            return beerService.updateBeer(externalId, beer);\n          }\n        ')))}),"/presentations/mock-mvc-in-action/slide4","/presentations/mock-mvc-in-action/slide6",5)},73587:function(e,t){t.Z={hljs:{color:"#a9b7c6",background:"#282b2e",display:"block",overflowX:"auto",padding:"0.5em"},"hljs-number":{color:"#6897BB"},"hljs-literal":{color:"#6897BB"},"hljs-symbol":{color:"#6897BB"},"hljs-bullet":{color:"#6897BB"},"hljs-keyword":{color:"#cc7832"},"hljs-selector-tag":{color:"#cc7832"},"hljs-deletion":{color:"#cc7832"},"hljs-variable":{color:"#629755"},"hljs-template-variable":{color:"#629755"},"hljs-link":{color:"#629755"},"hljs-comment":{color:"#808080"},"hljs-quote":{color:"#808080"},"hljs-meta":{color:"#bbb529"},"hljs-string":{color:"#6A8759"},"hljs-attribute":{color:"#6A8759"},"hljs-addition":{color:"#6A8759"},"hljs-section":{color:"#ffc66d"},"hljs-title":{color:"#ffc66d"},"hljs-type":{color:"#ffc66d"},"hljs-name":{color:"#e8bf6a"},"hljs-selector-id":{color:"#e8bf6a"},"hljs-selector-class":{color:"#e8bf6a"},"hljs-emphasis":{fontStyle:"italic"},"hljs-strong":{fontWeight:"bold"}}}}]);
//# sourceMappingURL=component---src-pages-presentations-mock-mvc-in-action-slide-5-jsx-8f830797b756e3378cfc.js.map