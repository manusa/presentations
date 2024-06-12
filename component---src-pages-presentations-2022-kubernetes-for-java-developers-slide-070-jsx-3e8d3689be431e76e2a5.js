"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[8036,5820,7465],{89728:function(e,t,n){n.d(t,{Z5:function(){return s},g6:function(){return c},y$:function(){return i}});var r=n(51721),a=n(67294),l=n(14160);const s=e=>t=>e<t?"hidden":"visible",i=e=>t=>e!==t?"hidden":"visible",c=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,s){return void 0===s&&(s=1),function(i){function c(e){var t;return(t=i.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(c,i);var o=c.prototype;return o.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,l.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,l.c4)(n);break;case"Esc":case"Escape":(0,l.c4)("/")}},c}(a.Component)}},45123:function(e,t,n){n.r(t);var r=n(67294),a=n(94051),l=n(93512);const s=function(e){return void 0===e&&(e=""),`${a.CLASS_NAME}-slide${e?`__${e}`:""}`};t.default=e=>{let{slide:t=0,title:n="",children:a}=e;return r.createElement("div",{className:s()},r.createElement("div",{className:s("header")},r.createElement("div",{className:"title"},n),r.createElement("img",{className:"duke-logo",src:l.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),r.createElement("div",{className:s("content")},a),r.createElement("div",{className:s("footer")},r.createElement("div",{className:"page-number"},t)))}},19829:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return i}});var r=n(67294),a=n(1374),l=n(94051),s=n(93512);const i=e=>{let{className:t="",...n}=e;return r.createElement(a.Nc,Object.assign({classNamePrefix:l.CLASS_NAME,logoContent:r.createElement("img",{src:s.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})},n))};t.default=i},94051:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return i}});var r=n(67294),a=n(64593),l=n(89728),s=n(19829);const i="kubernetes-java-developers-2022",c="Kubernetes for Java developers workshop";t.default=(0,l.ZP)((()=>r.createElement("div",{className:i},r.createElement(a.q,null,r.createElement("title",null,c)),r.createElement(s.default,{className:`${i}-index`,title:c,subtitle:"Marc Nuri"}))),"/","/presentations/2022-kubernetes-for-java-developers/slide-010")},54341:function(e,t,n){n.r(t);var r=n(67294),a=n(45123),l=n(89728),s=n(1374),i=n(93512);t.default=(0,l.ZP)((()=>r.createElement(a.default,{slide:7,title:"Deploying a Java application into Kubernetes"},r.createElement("ul",null,r.createElement("li",null,"Get a cluster",r.createElement("ul",null,r.createElement("li",null,r.createElement(s.MN,{style:{height:"2rem"}})," ",r.createElement(s.rI,{href:"https://minikube.sigs.k8s.io/docs/start//"},"Minikube")),r.createElement("li",null,r.createElement(s.F7,{style:{height:"2rem"},hideText:!0})," ",r.createElement(s.rI,{href:"https://developers.redhat.com/developer-sandbox/get-started/"},r.createElement("span",{style:{color:"#eb2126"}},"OpenShift")," Developer Sandbox")),r.createElement("li",null,r.createElement(s.MN,{style:{height:"2rem"}})," ",r.createElement(s.rI,{href:"https://www.okteto.com/"},"Okteto")))),r.createElement("li",null,"Bootstrap your application",r.createElement("ul",null,r.createElement("li",null,r.createElement(s.rI,{href:"https://start.spring.io/"},"Spring (start.spring.io)")),r.createElement("li",null,r.createElement(s.rI,{href:"https://code.quarkus.io/"},"Quarkus (code.quarkus.io)")))),r.createElement("li",null,"Add Eclipse JKube ",r.createElement("br",null),r.createElement("img",{style:{marginTop:"1rem",marginLeft:"1rem",height:"6rem"},src:i.Z}))))),"/presentations/2022-kubernetes-for-java-developers/slide-060","/presentations/2022-kubernetes-for-java-developers/slide-080")},93512:function(e,t,n){t.Z=n.p+"static/duke-kubernetes-surf-sc-32825f7d98640953641762ce0ff4c520.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-kubernetes-for-java-developers-slide-070-jsx-3e8d3689be431e76e2a5.js.map