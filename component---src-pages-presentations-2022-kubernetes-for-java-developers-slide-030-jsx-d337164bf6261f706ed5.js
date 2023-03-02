"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[2926,5820,7465],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return o},y$:function(){return c}});var a=n(97326),r=n(94578),s=n(67294),l=n(84854);const i=e=>t=>e<t?"hidden":"visible",c=e=>t=>e!==t?"hidden":"visible",o=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(c){function o(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,a.Z)(t)),t}(0,r.Z)(o,c);var u=o.prototype;return u.render=function(){return s.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,l.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,l.c4)(n);break;case"Esc":case"Escape":(0,l.c4)("/")}},o}(s.Component)}},45123:function(e,t,n){n.r(t);var a=n(67294),r=n(94051),s=n(93512);const l=function(e){return void 0===e&&(e=""),r.CLASS_NAME+"-slide"+(e?"__"+e:"")};t.default=e=>{let{slide:t=0,title:n="",children:r}=e;return a.createElement("div",{className:l()},a.createElement("div",{className:l("header")},a.createElement("div",{className:"title"},n),a.createElement("img",{className:"duke-logo",src:s.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),a.createElement("div",{className:l("content")},r),a.createElement("div",{className:l("footer")},a.createElement("div",{className:"page-number"},t)))}},19829:function(e,t,n){n.r(t);var a=n(67294),r=n(94051),s=n(93512);const l=function(e){return void 0===e&&(e=""),r.CLASS_NAME+"-title"+(e?"__"+e:"")};t.default=e=>{let{className:t,title:n,subtitle:r="",children:i}=e;return a.createElement("div",{className:l()+" "+t},a.createElement("div",{className:""+l("content")},a.createElement("div",{className:"logo"},a.createElement("img",{src:s.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),a.createElement("div",{className:"title-band"},a.createElement("h1",{className:"title"},n),a.createElement("h2",{className:"subtitle"},r)),i))}},94051:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return i}});var a=n(67294),r=n(64593),s=n(89728),l=n(19829);const i="kubernetes-java-developers-2022",c="Kubernetes for Java developers workshop";t.default=(0,s.ZP)((()=>a.createElement("div",{className:i},a.createElement(r.q,null,a.createElement("title",null,c)),a.createElement(l.default,{className:i+"-index",title:c,subtitle:"Marc Nuri"}))),"/","/presentations/2022-kubernetes-for-java-developers/slide-010")},62366:function(e,t,n){n.r(t);var a=n(67294),r=n(45123),s=n(89728);t.default=(0,s.ZP)((()=>a.createElement(r.default,{slide:3,title:"Goals"},a.createElement("ul",null,a.createElement("li",null,"Have a basic understanding of what Kubernetes is"),a.createElement("li",null,"Be able to deploy a Java application into Kubernetes"),a.createElement("li",null,"Be able to perform basic Kubernetes tasks from Java"),a.createElement("li",null,"Be able to create shareable Kubernetes Java scripts with JBang"),a.createElement("li",null,"Understand the controller pattern in Kubernetes"),a.createElement("li",null,"Hava a basic understanding of Kubernetes operators and their advantages")))),"/presentations/2022-kubernetes-for-java-developers/slide-020","/presentations/2022-kubernetes-for-java-developers/slide-040")},93512:function(e,t,n){t.Z=n.p+"static/duke-kubernetes-surf-sc-32825f7d98640953641762ce0ff4c520.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-kubernetes-for-java-developers-slide-030-jsx-d337164bf6261f706ed5.js.map