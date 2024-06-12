"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[4818,277],{89728:function(A,e,t){t.d(e,{Z5:function(){return c},g6:function(){return l},y$:function(){return r}});var n=t(51721),a=t(67294),s=t(14160);const c=A=>e=>A<e?"hidden":"visible",r=A=>e=>A!==e?"hidden":"visible",l=A=>e=>A>e?"hidden":"visible";e.ZP=function(A,e,t,c){return void 0===c&&(c=1),function(r){function l(A){var e;return(e=r.call(this,A)||this).state={currentStep:1},e.handleOnKeyDown=e.onKeyDown.bind(e),e}(0,n.Z)(l,r);var i=l.prototype;return i.render=function(){return a.createElement(A,Object.assign({},this.props,{currentStep:this.state.currentStep}))},i.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},i.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},i.onKeyDown=function(A){switch(A.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(e);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(t);break;case"Esc":case"Escape":(0,s.c4)("/")}},l}(a.Component)}},58641:function(A,e,t){t.r(e);var n=t(67294),a=t(26704),s=t(11688);const c=function(A){return void 0===A&&(A=""),"eclipse-jkube-2020-bcn-jug-slide"+(A?`__${A}`:"")};e.default=A=>{let{slide:e=0,title:t="",children:r}=A;return n.createElement("div",{className:c()},n.createElement("div",{className:c("header")},n.createElement("div",{className:"title"},t),n.createElement(a.oH,{className:"jkube-logo"})),n.createElement("div",{className:c("content")},r),n.createElement("div",{className:c("footer")},n.createElement("img",{src:s.Z}),n.createElement("div",{className:"page-number"},e)))}},65969:function(A,e,t){t.r(e),t.d(e,{default:function(){return h}});var n=t(67294),a=t(89728),s=t(58641),c=t.p+"static/karaf-logo-ce6740a3379857ddbc4f308dc129fdd7.png",r=t.p+"static/micronaut-logo-1a3e9411f238069d68b1781f08ba6391.svg",l=t.p+"static/open-liberty-logo-33d97c5b74aad00582ef5ef3ba5eb2d9.png",i=t.p+"static/spring-boot-logo-94f201ce44348763e6a566f81e91d0f3.png",m=t.p+"static/tomcat-logo-fe0b4f228ce49eeb38c56622239adc8e.png",o=t.p+"static/vertx-logo-be3af7702b83c6a7cd138c4d0a609ed9.png",E=t.p+"static/wildfly-logo-2c31aa4b125c6d804b6a5c24fa1f4ee5.png";var h=(0,a.ZP)((()=>n.createElement(s.default,{slide:5,title:"What is Eclipse JKube? (2)"},n.createElement("ul",{className:"what-is-jkube"},n.createElement("li",null,"Support for multiple frameworks and technologies",n.createElement("div",{className:"framework-container"},n.createElement("img",{className:"item",src:E}),n.createElement("img",{className:"item",src:o}),n.createElement("img",{className:"item",src:"data:image/png;base64,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"}),n.createElement("img",{className:"item",src:i}),n.createElement("img",{className:"item",src:l}),n.createElement("img",{className:"item",src:"data:image/png;base64,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"}),n.createElement("img",{className:"item",src:r}),n.createElement("img",{className:"item",src:m}),n.createElement("img",{className:"item",src:"data:image/png;base64,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"}),n.createElement("img",{className:"item",src:c}))),n.createElement("li",null,"3 configuration modes",n.createElement("ul",null,n.createElement("li",null,n.createElement("strong",null,"Zero Config"),", Opinionated defaults"),n.createElement("li",null,n.createElement("strong",null,"XML")," plugin configuration"),n.createElement("li",null,n.createElement("strong",null,"Resource fragments")," enrich missing parts of opinionated defaults")))))),"/presentations/eclipse-jkube-2020-bcn-jug/slide-040","/presentations/eclipse-jkube-2020-bcn-jug/slide-060")},11688:function(A,e,t){e.Z=t.p+"static/bcn-jug-logo-324e23477630121f83a4631a0a49932b.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-eclipse-jkube-2020-bcn-jug-slide-050-jsx-d7aa8f651828ce44110a.js.map