"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[2617,277],{89728:function(e,t,n){n.d(t,{Z5:function(){return c},g6:function(){return s},y$:function(){return i}});var a=n(51721),l=n(67294),r=n(14160);const c=e=>t=>e<t?"hidden":"visible",i=e=>t=>e!==t?"hidden":"visible",s=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,c){return void 0===c&&(c=1),function(i){function s(e){var t;return(t=i.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,a.Z)(s,i);var u=s.prototype;return u.render=function(){return l.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,r.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,r.c4)(n);break;case"Esc":case"Escape":(0,r.c4)("/")}},s}(l.Component)}},58641:function(e,t,n){n.r(t);var a=n(67294),l=n(7107),r=n(11688);const c=function(e){return void 0===e&&(e=""),"eclipse-jkube-2020-bcn-jug-slide"+(e?`__${e}`:"")};t.default=e=>{let{slide:t=0,title:n="",children:i}=e;return a.createElement("div",{className:c()},a.createElement("div",{className:c("header")},a.createElement("div",{className:"title"},n),a.createElement(l.oH,{className:"jkube-logo"})),a.createElement("div",{className:c("content")},i),a.createElement("div",{className:c("footer")},a.createElement("img",{src:r.Z}),a.createElement("div",{className:"page-number"},t)))}},83491:function(e,t,n){n.r(t),n.d(t,{default:function(){return i}});var a=n(67294),l=n(89728),r=n(58641),c=n.p+"static/uncle-sam-828e24ce43be7c562bdc1632ebc1ab4d.png";var i=(0,l.ZP)((()=>a.createElement(r.default,{slide:12,title:"What's coming - Roadmap",className:"eclipse-jkube-2020-bcn-jug-roadmap"},a.createElement("div",{className:"roadmap"},a.createElement("div",{className:"roadmap__entries"},a.createElement("ul",null,a.createElement("li",null,"Gradle Plugins"),a.createElement("li",null,"Support for more frameworks and technologies",a.createElement("ul",null,a.createElement("li",null,"Knative"),a.createElement("li",null,"Istio"))),a.createElement("li",null,"Improved image generation",a.createElement("ul",null,a.createElement("li",null,"Multilayer support"),a.createElement("li",null,"Better Podman/Buildah UX"))),a.createElement("li",null,"Additional build strategies",a.createElement("ul",null,a.createElement("li",null,"Kaniko..."))),a.createElement("li",null,"Get involved to decide!"))),a.createElement("img",{className:"roadmap__image",src:c,alt:"We want you!"})))),"/presentations/eclipse-jkube-2020-bcn-jug/slide-110","/presentations/eclipse-jkube-2020-bcn-jug/slide-130")},11688:function(e,t,n){t.Z=n.p+"static/bcn-jug-logo-324e23477630121f83a4631a0a49932b.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-eclipse-jkube-2020-bcn-jug-slide-120-jsx-0929e6244539156718a9.js.map