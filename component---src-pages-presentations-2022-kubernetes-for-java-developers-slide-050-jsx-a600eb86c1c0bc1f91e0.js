"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[5730,5820,7465],{89728:function(e,t,n){n.d(t,{Z5:function(){return c},g6:function(){return i},y$:function(){return s}});var r=n(51721),a=n(67294),l=n(14160);const c=e=>t=>e<t?"hidden":"visible",s=e=>t=>e!==t?"hidden":"visible",i=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,c){return void 0===c&&(c=1),function(s){function i(e){var t;return(t=s.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(i,s);var o=i.prototype;return o.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,l.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,l.c4)(n);break;case"Esc":case"Escape":(0,l.c4)("/")}},i}(a.Component)}},45123:function(e,t,n){n.r(t);var r=n(67294),a=n(94051),l=n(93512);const c=function(e){return void 0===e&&(e=""),`${a.CLASS_NAME}-slide${e?`__${e}`:""}`};t.default=e=>{let{slide:t=0,title:n="",children:a}=e;return r.createElement("div",{className:c()},r.createElement("div",{className:c("header")},r.createElement("div",{className:"title"},n),r.createElement("img",{className:"duke-logo",src:l.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),r.createElement("div",{className:c("content")},a),r.createElement("div",{className:c("footer")},r.createElement("div",{className:"page-number"},t)))}},19829:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return s}});var r=n(67294),a=n(11017),l=n(94051),c=n(93512);const s=e=>{let{className:t="",...n}=e;return r.createElement(a.Nc,Object.assign({classNamePrefix:l.CLASS_NAME,logoContent:r.createElement("img",{src:c.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})},n))};t.default=s},94051:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return s}});var r=n(67294),a=n(64593),l=n(89728),c=n(19829);const s="kubernetes-java-developers-2022",i="Kubernetes for Java developers workshop";t.default=(0,l.ZP)((()=>r.createElement("div",{className:s},r.createElement(a.q,null,r.createElement("title",null,i)),r.createElement(c.default,{className:`${s}-index`,title:i,subtitle:"Marc Nuri"}))),"/","/presentations/2022-kubernetes-for-java-developers/slide-010")},23213:function(e,t,n){n.r(t),n.d(t,{default:function(){return m}});var r=n(67294),a=n(45123),l=n(89728),c=n(11017),s=n.p+"static/deploy-256-957654dcd59586dcbdc1ce92004b4d72.png",i=n.p+"static/ing-256-778ebe4177f4e3f7e0d9e889f733f7e6.png",o=n.p+"static/pod-256-e4c4eef030e466bf4cd42e490e2df550.png",u=n.p+"static/svc-256-9e859b067374e6b009d862dad031a633.png";var m=(0,l.ZP)((e=>{let{currentStep:t}=e;const n=(0,l.y$)(t),m=(0,l.g6)(t);return r.createElement(a.default,{slide:5,title:"What is Kubernetes?"},r.createElement("div",{className:"what-is-kubernetes"},r.createElement("div",{className:`${m(2)} quote`},r.createElement("blockquote",null,r.createElement("p",null,"Kubernetes is a portable, extensible, ",r.createElement("strong",null,"open-source")," platform for managing containerized workloads and services, that facilitates both declarative configuration and automation"),r.createElement("cite",null,"Kubernetes.io"))),r.createElement("div",{className:"component-diagram"},r.createElement("img",{className:n(2),src:c.M4,alt:"A diagram of the Kubernetes components"})),r.createElement("div",{className:n(3)},r.createElement("table",null,r.createElement("tbody",null,r.createElement("tr",null,r.createElement("td",null,r.createElement(c.T,{className:"k8s-icon"})),r.createElement("td",null,"Container")),r.createElement("tr",null,r.createElement("td",null,r.createElement("img",{className:"k8s-icon",src:o})),r.createElement("td",null,"Pod")),r.createElement("tr",null,r.createElement("td",null,r.createElement("img",{className:"k8s-icon",src:s})),r.createElement("td",null,"Deployment")),r.createElement("tr",null,r.createElement("td",null,r.createElement("img",{className:"k8s-icon",src:u})),r.createElement("td",null,"Service")),r.createElement("tr",null,r.createElement("td",null,r.createElement("img",{className:"k8s-icon",src:i})),r.createElement("td",null,"Ingress")))))))}),"/presentations/2022-kubernetes-for-java-developers/slide-040","/presentations/2022-kubernetes-for-java-developers/slide-060",3)},93512:function(e,t,n){t.Z=n.p+"static/duke-kubernetes-surf-sc-32825f7d98640953641762ce0ff4c520.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-kubernetes-for-java-developers-slide-050-jsx-a600eb86c1c0bc1f91e0.js.map