"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[5985,706],{89728:function(e,t,n){n.d(t,{Z5:function(){return c},g6:function(){return s},y$:function(){return i}});var l=n(51721),r=n(67294),a=n(14160);const c=e=>t=>e<t?"hidden":"visible",i=e=>t=>e!==t?"hidden":"visible",s=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,c){return void 0===c&&(c=1),function(i){function s(e){var t;return(t=i.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,l.Z)(s,i);var u=s.prototype;return u.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(n);break;case"Esc":case"Escape":(0,a.c4)("/")}},s}(r.Component)}},37725:function(e,t,n){n.r(t);var l=n(67294),r=n(21443),a=n(70446);const c=function(e){return void 0===e&&(e=""),"eclipsecon-2021-slide"+(e?`__${e}`:"")};t.default=e=>{let{slide:t=0,title:n="",children:i}=e;return l.createElement("div",{className:c()},l.createElement("div",{className:c("header")},l.createElement("div",{className:"title"},n),l.createElement(r.oH,{className:"jkube-logo"})),l.createElement("div",{className:c("content")},i),l.createElement("div",{className:c("footer")},l.createElement("img",{src:a.Z,alt:"An image of the EclipseCon logo"}),l.createElement("div",{className:"page-number"},t)))}},69728:function(e,t,n){n.r(t);var l=n(67294),r=n(89728),a=n(37725);t.default=(0,r.ZP)((e=>{let{currentStep:t}=e;const n=(0,r.Z5)(t);return l.createElement(a.default,{slide:5,title:"What is Eclipse JKube?"},l.createElement("ul",{className:"what-is-jkube"},l.createElement("li",null,"Tools and plugins",l.createElement("ul",null,l.createElement("li",null,"Generate container images"),l.createElement("li",null,"Generate and deploy configuration manifests (Kubernetes / OpenShift)"))),l.createElement("li",{className:n(2)},"Components",l.createElement("table",{style:{width:"80%"}},l.createElement("thead",null,l.createElement("tr",null,l.createElement("th",{colSpan:2},"Java API (JKube Kit)"))),l.createElement("tbody",null,l.createElement("tr",null,l.createElement("td",null,"Kubernetes Maven Plugin"),l.createElement("td",null,"Kubernetes Gradle Plugin")),l.createElement("tr",null,l.createElement("td",null,"OpenShift Maven Plugin"),l.createElement("td",null,"OpenShift Gradle Plugin"))))),l.createElement("li",{className:n(3)},"Build Strategies",l.createElement("ul",null,l.createElement("li",null,l.createElement("strong",null,"Docker:")," uses local Docker Daemon (k8s) or remote (oc)"),l.createElement("li",null,l.createElement("strong",null,"S2I:")," OC only plugin configuration"),l.createElement("li",null,l.createElement("strong",null,"JIB:")," delegates to build to JIB (Dockerless)")))))}),"/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-040","/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-060",3)},70446:function(e,t,n){t.Z=n.p+"static/eclipsecon-white-7d6a164bf0362af837ea4fb021e08b02.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2021-eclipsecon-kubernetes-gradle-plugins-slide-050-jsx-18b942f5e1dd1620a0a4.js.map