"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[1008,706],{89728:function(e,t,n){n.d(t,{Z5:function(){return c},g6:function(){return l},y$:function(){return s}});var r=n(51721),a=n(67294),i=n(14160);const c=e=>t=>e<t?"hidden":"visible",s=e=>t=>e!==t?"hidden":"visible",l=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,c){return void 0===c&&(c=1),function(s){function l(e){var t;return(t=s.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(l,s);var o=l.prototype;return o.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},l}(a.Component)}},37725:function(e,t,n){n.r(t);var r=n(67294),a=n(21443),i=n(70446);const c=function(e){return void 0===e&&(e=""),"eclipsecon-2021-slide"+(e?`__${e}`:"")};t.default=e=>{let{slide:t=0,title:n="",children:s}=e;return r.createElement("div",{className:c()},r.createElement("div",{className:c("header")},r.createElement("div",{className:"title"},n),r.createElement(a.oH,{className:"jkube-logo"})),r.createElement("div",{className:c("content")},s),r.createElement("div",{className:c("footer")},r.createElement("img",{src:i.Z,alt:"An image of the EclipseCon logo"}),r.createElement("div",{className:"page-number"},t)))}},62872:function(e,t,n){n.r(t),n.d(t,{default:function(){return s}});var r=n(67294),a=n(37725),i=n(89728),c=n.p+"static/uncle-sam-828e24ce43be7c562bdc1632ebc1ab4d.png";var s=(0,i.ZP)((()=>r.createElement(a.default,{slide:10,title:"What's coming - Roadmap"},r.createElement("div",{className:"roadmap"},r.createElement("div",{className:"roadmap__entries"},r.createElement("ul",null,r.createElement("li",null,"Gradle Plugins full support"),r.createElement("li",null,"Helm Chart generation improvements"),r.createElement("li",null,"Additional build strategies"),r.createElement("li",null,"Support for more frameworks"),r.createElement("li",null,"Get involved to decide!"))),r.createElement("img",{className:"roadmap__image",src:c,alt:"We want you!"})))),"/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-090","/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-110")},70446:function(e,t,n){t.Z=n.p+"static/eclipsecon-white-7d6a164bf0362af837ea4fb021e08b02.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2021-eclipsecon-kubernetes-gradle-plugins-slide-100-jsx-a5aabff66af2b65bb31f.js.map