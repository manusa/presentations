"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[2520],{89728:function(e,t,n){n.d(t,{Z5:function(){return l},g6:function(){return o},y$:function(){return a}});var r=n(97326),i=n(94578),c=n(67294),s=n(84854);const l=e=>t=>e<t?"hidden":"visible",a=e=>t=>e!==t?"hidden":"visible",o=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,l){return void 0===l&&(l=1),function(a){function o(e){var t;return(t=a.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,r.Z)(t)),t}(0,i.Z)(o,a);var u=o.prototype;return u.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<l?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},o}(c.Component)}},87014:function(e,t,n){n.r(t);var r=n(67294),i=n(89728);t.default=(0,i.ZP)((e=>{let{currentStep:t}=e;const n=(0,i.Z5)(t);return r.createElement("div",{className:"slide slide1"},r.createElement("div",{className:"title"},"MockMVC"),r.createElement("ul",{className:"content"},r.createElement("li",{className:n(2)},"Main entry point for server-side Spring MVC test support"),r.createElement("li",{className:n(3)},"Presentation",r.createElement("ul",null,r.createElement("li",null,"Test pyramid"),r.createElement("li",null,"The Beer CRUD"),r.createElement("li",null,"Configuration types"),r.createElement("li",null,"Aspect oriented / Code coverage"),r.createElement("li",null,"Examples",r.createElement("ul",null,r.createElement("li",null,"Spring Boot (1 / 2) - Spring MVC 4 - Web"),r.createElement("li",null,"Spring Boot 2 - Spring MVC 5 - Webflux / Project reactor"),r.createElement("li",null,"Bonus - Introducing WebTestClient")))))))}),"/presentations/mock-mvc-in-action","/presentations/mock-mvc-in-action/slide2",3)}}]);
//# sourceMappingURL=component---src-pages-presentations-mock-mvc-in-action-slide-1-jsx-f45ec98d884a385be710.js.map