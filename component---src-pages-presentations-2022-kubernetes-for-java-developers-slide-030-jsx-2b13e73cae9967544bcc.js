"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[2926,5820,7465],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return c},y$:function(){return l}});var r=n(51721),a=n(67294),s=n(14160);const i=e=>t=>e<t?"hidden":"visible",l=e=>t=>e!==t?"hidden":"visible",c=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(l){function c(e){var t;return(t=l.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(c,l);var o=c.prototype;return o.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},c}(a.Component)}},45123:function(e,t,n){n.r(t);var r=n(67294),a=n(94051),s=n(93512);const i=function(e){return void 0===e&&(e=""),`${a.CLASS_NAME}-slide${e?`__${e}`:""}`};t.default=e=>{let{slide:t=0,title:n="",children:a}=e;return r.createElement("div",{className:i()},r.createElement("div",{className:i("header")},r.createElement("div",{className:"title"},n),r.createElement("img",{className:"duke-logo",src:s.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),r.createElement("div",{className:i("content")},a),r.createElement("div",{className:i("footer")},r.createElement("div",{className:"page-number"},t)))}},19829:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return l}});var r=n(67294),a=n(54068),s=n(94051),i=n(93512);const l=e=>{let{className:t="",...n}=e;return r.createElement(a.Nc,Object.assign({classNamePrefix:s.CLASS_NAME,logoContent:r.createElement("img",{src:i.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})},n))};t.default=l},94051:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return l}});var r=n(67294),a=n(64593),s=n(89728),i=n(19829);const l="kubernetes-java-developers-2022",c="Kubernetes for Java developers workshop";t.default=(0,s.ZP)((()=>r.createElement("div",{className:l},r.createElement(a.q,null,r.createElement("title",null,c)),r.createElement(i.default,{className:`${l}-index`,title:c,subtitle:"Marc Nuri"}))),"/","/presentations/2022-kubernetes-for-java-developers/slide-010")},62366:function(e,t,n){n.r(t);var r=n(67294),a=n(45123),s=n(89728);t.default=(0,s.ZP)((()=>r.createElement(a.default,{slide:3,title:"Goals"},r.createElement("ul",null,r.createElement("li",null,"Have a basic understanding of what Kubernetes is"),r.createElement("li",null,"Be able to deploy a Java application into Kubernetes"),r.createElement("li",null,"Be able to perform basic Kubernetes tasks from Java"),r.createElement("li",null,"Be able to create shareable Kubernetes Java scripts with JBang"),r.createElement("li",null,"Understand the controller pattern in Kubernetes"),r.createElement("li",null,"Hava a basic understanding of Kubernetes operators and their advantages")))),"/presentations/2022-kubernetes-for-java-developers/slide-020","/presentations/2022-kubernetes-for-java-developers/slide-040")},93512:function(e,t,n){t.Z=n.p+"static/duke-kubernetes-surf-sc-32825f7d98640953641762ce0ff4c520.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-kubernetes-for-java-developers-slide-030-jsx-2b13e73cae9967544bcc.js.map