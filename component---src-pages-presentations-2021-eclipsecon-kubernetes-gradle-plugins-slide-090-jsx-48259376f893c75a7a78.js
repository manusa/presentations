"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[4240,706],{89728:function(e,t,n){n.d(t,{Z5:function(){return l},g6:function(){return a},y$:function(){return s}});var r=n(51721),c=n(67294),i=n(14160);const l=e=>t=>e<t?"hidden":"visible",s=e=>t=>e!==t?"hidden":"visible",a=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,l){return void 0===l&&(l=1),function(s){function a(e){var t;return(t=s.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(a,s);var o=a.prototype;return o.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<l?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},a}(c.Component)}},37725:function(e,t,n){n.r(t);var r=n(67294),c=n(21443),i=n(70446);const l=function(e){return void 0===e&&(e=""),"eclipsecon-2021-slide"+(e?`__${e}`:"")};t.default=e=>{let{slide:t=0,title:n="",children:s}=e;return r.createElement("div",{className:l()},r.createElement("div",{className:l("header")},r.createElement("div",{className:"title"},n),r.createElement(c.oH,{className:"jkube-logo"})),r.createElement("div",{className:l("content")},s),r.createElement("div",{className:l("footer")},r.createElement("img",{src:i.Z,alt:"An image of the EclipseCon logo"}),r.createElement("div",{className:"page-number"},t)))}},69891:function(e,t,n){n.r(t);var r=n(67294),c=n(37725),i=n(89728);t.default=(0,i.ZP)((()=>r.createElement(c.default,{slide:9,title:"Why should I choose Eclipse JKube?"},r.createElement("ul",null,r.createElement("li",null,"Covers complete Workflow (from code to Kubernetes)"),r.createElement("li",null,"Inner + Outer Loop"),r.createElement("li",null,"No external dependencies"),r.createElement("li",null,"The Java way"),r.createElement("li",null,"Zero Configuration"),r.createElement("li",null,"Additional tools for Developers (Debug, Watch, etc.)")))),"/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-080","/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-100")},70446:function(e,t,n){t.Z=n.p+"static/eclipsecon-white-7d6a164bf0362af837ea4fb021e08b02.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2021-eclipsecon-kubernetes-gradle-plugins-slide-090-jsx-48259376f893c75a7a78.js.map