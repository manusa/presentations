"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[5820,7465],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return u},y$:function(){return o}});var r=n(97326),s=n(94578),a=n(67294),c=n(84854);const i=e=>t=>e<t?"hidden":"visible",o=e=>t=>e!==t?"hidden":"visible",u=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(o){function u(e){var t;return(t=o.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,r.Z)(t)),t}(0,s.Z)(u,o);var l=u.prototype;return l.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,c.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,c.c4)(n);break;case"Esc":case"Escape":(0,c.c4)("/")}},u}(a.Component)}},45123:function(e,t,n){n.r(t);var r=n(67294),s=n(94051),a=n(93512);const c=function(e){return void 0===e&&(e=""),s.CLASS_NAME+"-slide"+(e?"__"+e:"")};t.default=e=>{let{slide:t=0,title:n="",children:s}=e;return r.createElement("div",{className:c()},r.createElement("div",{className:c("header")},r.createElement("div",{className:"title"},n),r.createElement("img",{className:"duke-logo",src:a.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),r.createElement("div",{className:c("content")},s),r.createElement("div",{className:c("footer")},r.createElement("div",{className:"page-number"},t)))}},19829:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return i}});var r=n(67294),s=n(94005),a=n(94051),c=n(93512);const i=e=>{let{className:t="",...n}=e;return r.createElement(s.Nc,Object.assign({classNamePrefix:a.CLASS_NAME,logoContent:r.createElement("img",{src:c.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})},n))};t.default=i},94051:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return i}});var r=n(67294),s=n(64593),a=n(89728),c=n(19829);const i="kubernetes-java-developers-2022",o="Kubernetes for Java developers workshop";t.default=(0,a.ZP)((()=>r.createElement("div",{className:i},r.createElement(s.q,null,r.createElement("title",null,o)),r.createElement(c.default,{className:i+"-index",title:o,subtitle:"Marc Nuri"}))),"/","/presentations/2022-kubernetes-for-java-developers/slide-010")},93512:function(e,t,n){t.Z=n.p+"static/duke-kubernetes-surf-sc-32825f7d98640953641762ce0ff4c520.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-kubernetes-for-java-developers-components-slide-template-jsx-05a4d29e0ab193b87336.js.map