"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[8652,5820,7465],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return u},y$:function(){return c}});var r=n(97326),a=n(94578),s=n(67294),l=n(84854);const i=e=>t=>e<t?"hidden":"visible",c=e=>t=>e!==t?"hidden":"visible",u=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(c){function u(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,r.Z)(t)),t}(0,a.Z)(u,c);var o=u.prototype;return o.render=function(){return s.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,l.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,l.c4)(n);break;case"Esc":case"Escape":(0,l.c4)("/")}},u}(s.Component)}},45123:function(e,t,n){n.r(t);var r=n(67294),a=n(94051),s=n(93512);const l=function(e){return void 0===e&&(e=""),a.CLASS_NAME+"-slide"+(e?"__"+e:"")};t.default=e=>{let{slide:t=0,title:n="",children:a}=e;return r.createElement("div",{className:l()},r.createElement("div",{className:l("header")},r.createElement("div",{className:"title"},n),r.createElement("img",{className:"duke-logo",src:s.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),r.createElement("div",{className:l("content")},a),r.createElement("div",{className:l("footer")},r.createElement("div",{className:"page-number"},t)))}},19829:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return i}});var r=n(67294),a=n(94005),s=n(94051),l=n(93512);const i=e=>{let{className:t="",...n}=e;return r.createElement(a.Nc,Object.assign({classNamePrefix:s.CLASS_NAME,logoContent:r.createElement("img",{src:l.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})},n))};t.default=i},94051:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return i}});var r=n(67294),a=n(64593),s=n(89728),l=n(19829);const i="kubernetes-java-developers-2022",c="Kubernetes for Java developers workshop";t.default=(0,s.ZP)((()=>r.createElement("div",{className:i},r.createElement(a.q,null,r.createElement("title",null,c)),r.createElement(l.default,{className:i+"-index",title:c,subtitle:"Marc Nuri"}))),"/","/presentations/2022-kubernetes-for-java-developers/slide-010")},40841:function(e,t,n){n.r(t);var r=n(67294),a=n(45123),s=n(89728),l=n(94005);t.default=(0,s.ZP)((()=>r.createElement(a.default,{slide:10,title:"Controlling Kubernetes from Java"},r.createElement("ul",null,r.createElement("li",null,"Kubernetes Client libraries (",r.createElement(l.rI,{href:"https://kubernetes.io/docs/reference/using-api/client-libraries/"},"kubernetes.io"),")",r.createElement("ul",null,r.createElement("li",null,"You don't need Go"),r.createElement("li",null,"YAML sucks"),r.createElement("li",null,"Fabric8 Kubernetes Client"))),r.createElement("li",null,r.createElement(l.rI,{href:"https://jbang.dev"},"JBang")),r.createElement("li",null,"Kubectl plugins")))),"/presentations/2022-kubernetes-for-java-developers/slide-090","/presentations/2022-kubernetes-for-java-developers/slide-110")},93512:function(e,t,n){t.Z=n.p+"static/duke-kubernetes-surf-sc-32825f7d98640953641762ce0ff4c520.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-kubernetes-for-java-developers-slide-100-jsx-874a8c1d823cc19a1ea7.js.map