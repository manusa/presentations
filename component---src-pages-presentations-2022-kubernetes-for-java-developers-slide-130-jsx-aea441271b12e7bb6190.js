"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[8340,5820,7465],{89728:function(e,t,n){n.d(t,{Z5:function(){return c},g6:function(){return u},y$:function(){return l}});var r=n(97326),a=n(94578),s=n(67294),i=n(84854);const c=e=>t=>e<t?"hidden":"visible",l=e=>t=>e!==t?"hidden":"visible",u=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,c){return void 0===c&&(c=1),function(l){function u(e){var t;return(t=l.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,r.Z)(t)),t}(0,a.Z)(u,l);var o=u.prototype;return o.render=function(){return s.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},u}(s.Component)}},45123:function(e,t,n){n.r(t);var r=n(67294),a=n(94051),s=n(93512);const i=function(e){return void 0===e&&(e=""),a.CLASS_NAME+"-slide"+(e?"__"+e:"")};t.default=e=>{let{slide:t=0,title:n="",children:a}=e;return r.createElement("div",{className:i()},r.createElement("div",{className:i("header")},r.createElement("div",{className:"title"},n),r.createElement("img",{className:"duke-logo",src:s.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),r.createElement("div",{className:i("content")},a),r.createElement("div",{className:i("footer")},r.createElement("div",{className:"page-number"},t)))}},19829:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return c}});var r=n(67294),a=n(94005),s=n(94051),i=n(93512);const c=e=>{let{className:t="",...n}=e;return r.createElement(a.Nc,Object.assign({classNamePrefix:s.CLASS_NAME,logoContent:r.createElement("img",{src:i.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})},n))};t.default=c},94051:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return c}});var r=n(67294),a=n(64593),s=n(89728),i=n(19829);const c="kubernetes-java-developers-2022",l="Kubernetes for Java developers workshop";t.default=(0,s.ZP)((()=>r.createElement("div",{className:c},r.createElement(a.q,null,r.createElement("title",null,l)),r.createElement(i.default,{className:c+"-index",title:l,subtitle:"Marc Nuri"}))),"/","/presentations/2022-kubernetes-for-java-developers/slide-010")},52378:function(e,t,n){n.r(t);var r=n(67294),a=n(45123),s=n(89728);t.default=(0,s.ZP)((()=>r.createElement(a.default,{slide:13,title:"Kubernetes Operators in Java"},r.createElement("ul",null,r.createElement("li",null,"Operators vs. Helm",r.createElement("ul",null,r.createElement("li",null,"Day 2 operations"))),r.createElement("li",null,"Java Operator SDK")))),"/presentations/2022-kubernetes-for-java-developers/slide-120","/presentations/2022-kubernetes-for-java-developers/slide-999")},93512:function(e,t,n){t.Z=n.p+"static/duke-kubernetes-surf-sc-32825f7d98640953641762ce0ff4c520.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-kubernetes-for-java-developers-slide-130-jsx-aea441271b12e7bb6190.js.map