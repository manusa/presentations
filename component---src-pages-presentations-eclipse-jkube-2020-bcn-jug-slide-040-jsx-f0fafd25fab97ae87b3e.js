"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[4513,277],{89728:function(e,t,n){n.d(t,{Z5:function(){return c},g6:function(){return s},y$:function(){return i}});var l=n(51721),r=n(67294),a=n(14160);const c=e=>t=>e<t?"hidden":"visible",i=e=>t=>e!==t?"hidden":"visible",s=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,c){return void 0===c&&(c=1),function(i){function s(e){var t;return(t=i.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,l.Z)(s,i);var u=s.prototype;return u.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(n);break;case"Esc":case"Escape":(0,a.c4)("/")}},s}(r.Component)}},58641:function(e,t,n){n.r(t);var l=n(67294),r=n(21443),a=n(11688);const c=function(e){return void 0===e&&(e=""),"eclipse-jkube-2020-bcn-jug-slide"+(e?`__${e}`:"")};t.default=e=>{let{slide:t=0,title:n="",children:i}=e;return l.createElement("div",{className:c()},l.createElement("div",{className:c("header")},l.createElement("div",{className:"title"},n),l.createElement(r.oH,{className:"jkube-logo"})),l.createElement("div",{className:c("content")},i),l.createElement("div",{className:c("footer")},l.createElement("img",{src:a.Z}),l.createElement("div",{className:"page-number"},t)))}},39578:function(e,t,n){n.r(t);var l=n(67294),r=n(89728),a=n(58641);t.default=(0,r.ZP)((e=>{let{currentStep:t}=e;const n=(0,r.Z5)(t);return l.createElement(a.default,{slide:4,title:"What is Eclipse JKube?"},l.createElement("ul",{className:"what-is-jkube"},l.createElement("li",null,"Tools and plugins",l.createElement("ul",null,l.createElement("li",null,"Generate container images"),l.createElement("li",null,"Generate and deploy configuration manifests (Kubernetes / OpenShift)"))),l.createElement("li",{className:n(2)},"Standalone Java API (Kit) & Maven Plugins",l.createElement("ul",null,l.createElement("li",null,"Kubernetes Maven Plugin (k8s)"),l.createElement("li",null,"OpenShift Maven Plugin (oc)"))),l.createElement("li",{className:n(3)},"Build Strategies",l.createElement("ul",null,l.createElement("li",null,l.createElement("strong",null,"Docker:")," uses local Docker Daemon (k8s) or remote (oc)"),l.createElement("li",null,l.createElement("strong",null,"S2I:")," OC only plugin configuration"),l.createElement("li",null,l.createElement("strong",null,"JIB:")," delegates to build to JIB (Dockerless)")))))}),"/presentations/eclipse-jkube-2020-bcn-jug/slide-030","/presentations/eclipse-jkube-2020-bcn-jug/slide-050",3)},11688:function(e,t,n){t.Z=n.p+"static/bcn-jug-logo-324e23477630121f83a4631a0a49932b.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-eclipse-jkube-2020-bcn-jug-slide-040-jsx-f0fafd25fab97ae87b3e.js.map