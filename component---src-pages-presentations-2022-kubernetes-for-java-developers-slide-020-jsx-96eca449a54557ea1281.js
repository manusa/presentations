"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[4796,5820,7465],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return u},y$:function(){return c}});var r=n(97326),a=n(94578),l=n(67294),s=n(84854);const i=e=>t=>e<t?"hidden":"visible",c=e=>t=>e!==t?"hidden":"visible",u=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(c){function u(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,r.Z)(t)),t}(0,a.Z)(u,c);var o=u.prototype;return o.render=function(){return l.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},u}(l.Component)}},45123:function(e,t,n){n.r(t);var r=n(67294),a=n(94051),l=n(93512);const s=function(e){return void 0===e&&(e=""),a.CLASS_NAME+"-slide"+(e?"__"+e:"")};t.default=e=>{let{slide:t=0,title:n="",children:a}=e;return r.createElement("div",{className:s()},r.createElement("div",{className:s("header")},r.createElement("div",{className:"title"},n),r.createElement("img",{className:"duke-logo",src:l.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),r.createElement("div",{className:s("content")},a),r.createElement("div",{className:s("footer")},r.createElement("div",{className:"page-number"},t)))}},19829:function(e,t,n){n.r(t);var r=n(67294),a=n(94051),l=n(93512);const s=function(e){return void 0===e&&(e=""),a.CLASS_NAME+"-title"+(e?"__"+e:"")};t.default=e=>{let{className:t,title:n,subtitle:a="",children:i}=e;return r.createElement("div",{className:s()+" "+t},r.createElement("div",{className:""+s("content")},r.createElement("div",{className:"logo"},r.createElement("img",{src:l.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),r.createElement("div",{className:"title-band"},r.createElement("h1",{className:"title"},n),r.createElement("h2",{className:"subtitle"},a)),i))}},94051:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return i}});var r=n(67294),a=n(64593),l=n(89728),s=n(19829);const i="kubernetes-java-developers-2022",c="Kubernetes for Java developers workshop";t.default=(0,l.ZP)((()=>r.createElement("div",{className:i},r.createElement(a.q,null,r.createElement("title",null,c)),r.createElement(s.default,{className:i+"-index",title:c,subtitle:"Marc Nuri"}))),"/","/presentations/2022-kubernetes-for-java-developers/slide-010")},50417:function(e,t,n){n.r(t);var r=n(67294),a=n(45123),l=n(89728);t.default=(0,l.ZP)((()=>r.createElement(a.default,{slide:2,title:"Agenda"},r.createElement("ul",null,r.createElement("li",null,"Introduction - Deploying applications into Kubernetes - Challenges"),r.createElement("li",null,"What is Kubernetes?"),r.createElement("li",null,"Deploying a Java application into Kubernetes",r.createElement("ul",null,r.createElement("li",null,"Eclipse JKube"))),r.createElement("li",null,"Controlling Kubernetes from Java",r.createElement("ul",null,r.createElement("li",null,"Fabric8 Kubernetes Client"),r.createElement("li",null,"JBang"))),r.createElement("li",null,"Kubernetes controllers and operators in Java")))),"/presentations/2022-kubernetes-for-java-developers/slide-010","/presentations/2022-kubernetes-for-java-developers/slide-030")},93512:function(e,t,n){t.Z=n.p+"static/duke-kubernetes-surf-sc-32825f7d98640953641762ce0ff4c520.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-kubernetes-for-java-developers-slide-020-jsx-96eca449a54557ea1281.js.map