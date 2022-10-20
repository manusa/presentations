"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[4513,277],{63680:function(e,t,n){n.d(t,{ZP:function(){return s},Z5:function(){return a},y$:function(){return c},g6:function(){return u}});var r=n(51721),l=n(67294),i=n(71082),a=function(e){return function(t){return e<t?"hidden":"visible"}},c=function(e){return function(t){return e!==t?"hidden":"visible"}},u=function(e){return function(t){return e>t?"hidden":"visible"}};var s=function(e,t,n,a){return void 0===a&&(a=1),function(c){function u(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,r.Z)(u,c);var s=u.prototype;return s.render=function(){return l.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},s.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},s.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},s.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<a?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},u}(l.Component)}},58641:function(e,t,n){n.r(t);var r=n(67294),l=n(71682),i=n(11688),a=function(e){return void 0===e&&(e=""),"eclipse-jkube-2020-bcn-jug-slide"+(e?"__"+e:"")};t.default=function(e){var t=e.slide,n=void 0===t?0:t,c=e.title,u=void 0===c?"":c,s=e.children;return r.createElement("div",{className:a()},r.createElement("div",{className:a("header")},r.createElement("div",{className:"title"},u),r.createElement(l.oH,{className:"jkube-logo"})),r.createElement("div",{className:a("content")},s),r.createElement("div",{className:a("footer")},r.createElement("img",{src:i.Z}),r.createElement("div",{className:"page-number"},n)))}},39578:function(e,t,n){n.r(t);var r=n(67294),l=n(63680),i=n(58641);t.default=(0,l.ZP)((function(e){var t=e.currentStep,n=(0,l.Z5)(t);return r.createElement(i.default,{slide:4,title:"What is Eclipse JKube?"},r.createElement("ul",{className:"what-is-jkube"},r.createElement("li",null,"Tools and plugins",r.createElement("ul",null,r.createElement("li",null,"Generate container images"),r.createElement("li",null,"Generate and deploy configuration manifests (Kubernetes / OpenShift)"))),r.createElement("li",{className:n(2)},"Standalone Java API (Kit) & Maven Plugins",r.createElement("ul",null,r.createElement("li",null,"Kubernetes Maven Plugin (k8s)"),r.createElement("li",null,"OpenShift Maven Plugin (oc)"))),r.createElement("li",{className:n(3)},"Build Strategies",r.createElement("ul",null,r.createElement("li",null,r.createElement("strong",null,"Docker:")," uses local Docker Daemon (k8s) or remote (oc)"),r.createElement("li",null,r.createElement("strong",null,"S2I:")," OC only plugin configuration"),r.createElement("li",null,r.createElement("strong",null,"JIB:")," delegates to build to JIB (Dockerless)")))))}),"/presentations/eclipse-jkube-2020-bcn-jug/slide-030","/presentations/eclipse-jkube-2020-bcn-jug/slide-050",3)},11688:function(e,t,n){t.Z=n.p+"static/bcn-jug-logo-324e23477630121f83a4631a0a49932b.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-eclipse-jkube-2020-bcn-jug-slide-040-jsx-40a77244f8ace99e30e0.js.map