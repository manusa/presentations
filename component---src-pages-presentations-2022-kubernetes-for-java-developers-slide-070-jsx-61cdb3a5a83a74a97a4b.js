"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[8036,5820,7465],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return o},y$:function(){return c}});var r=n(97326),a=n(94578),l=n(67294),s=n(84854);const i=e=>t=>e<t?"hidden":"visible",c=e=>t=>e!==t?"hidden":"visible",o=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(c){function o(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,r.Z)(t)),t}(0,a.Z)(o,c);var u=o.prototype;return u.render=function(){return l.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},o}(l.Component)}},45123:function(e,t,n){n.r(t);var r=n(67294),a=n(94051),l=n(93512);const s=function(e){return void 0===e&&(e=""),a.CLASS_NAME+"-slide"+(e?"__"+e:"")};t.default=e=>{let{slide:t=0,title:n="",children:a}=e;return r.createElement("div",{className:s()},r.createElement("div",{className:s("header")},r.createElement("div",{className:"title"},n),r.createElement("img",{className:"duke-logo",src:l.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),r.createElement("div",{className:s("content")},a),r.createElement("div",{className:s("footer")},r.createElement("div",{className:"page-number"},t)))}},19829:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return i}});var r=n(67294),a=n(94005),l=n(94051),s=n(93512);const i=e=>{let{className:t="",...n}=e;return r.createElement(a.Nc,Object.assign({classNamePrefix:l.CLASS_NAME,logoContent:r.createElement("img",{src:s.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})},n))};t.default=i},94051:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return i}});var r=n(67294),a=n(64593),l=n(89728),s=n(19829);const i="kubernetes-java-developers-2022",c="Kubernetes for Java developers workshop";t.default=(0,l.ZP)((()=>r.createElement("div",{className:i},r.createElement(a.q,null,r.createElement("title",null,c)),r.createElement(s.default,{className:i+"-index",title:c,subtitle:"Marc Nuri"}))),"/","/presentations/2022-kubernetes-for-java-developers/slide-010")},54341:function(e,t,n){n.r(t);var r=n(67294),a=n(45123),l=n(89728),s=n(94005),i=n(93512);t.default=(0,l.ZP)((()=>r.createElement(a.default,{slide:7,title:"Deploying a Java application into Kubernetes"},r.createElement("ul",null,r.createElement("li",null,"Get a cluster",r.createElement("ul",null,r.createElement("li",null,r.createElement(s.MN,{style:{height:"2rem"}})," ",r.createElement(s.rI,{href:"https://minikube.sigs.k8s.io/docs/start//"},"Minikube")),r.createElement("li",null,r.createElement(s.F7,{style:{height:"2rem"},hideText:!0})," ",r.createElement(s.rI,{href:"https://developers.redhat.com/developer-sandbox/get-started/"},r.createElement("span",{style:{color:"#eb2126"}},"OpenShift")," Developer Sandbox")),r.createElement("li",null,r.createElement(s.MN,{style:{height:"2rem"}})," ",r.createElement(s.rI,{href:"https://www.okteto.com/"},"Okteto")))),r.createElement("li",null,"Bootstrap your application",r.createElement("ul",null,r.createElement("li",null,r.createElement(s.rI,{href:"https://start.spring.io/"},"Spring (start.spring.io)")),r.createElement("li",null,r.createElement(s.rI,{href:"https://code.quarkus.io/"},"Quarkus (code.quarkus.io)")))),r.createElement("li",null,"Add Eclipse JKube ",r.createElement("br",null),r.createElement("img",{style:{marginTop:"1rem",marginLeft:"1rem",height:"6rem"},src:i.Z}))))),"/presentations/2022-kubernetes-for-java-developers/slide-060","/presentations/2022-kubernetes-for-java-developers/slide-080")},93512:function(e,t,n){t.Z=n.p+"static/duke-kubernetes-surf-sc-32825f7d98640953641762ce0ff4c520.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-kubernetes-for-java-developers-slide-070-jsx-61cdb3a5a83a74a97a4b.js.map