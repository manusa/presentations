"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[5985,706],{3680:function(e,t,n){n.d(t,{ZP:function(){return u},Z5:function(){return i},y$:function(){return c},g6:function(){return s}});var r=n(1721),l=n(7294),a=n(1597),i=function(e){return function(t){return e<t?"hidden":"visible"}},c=function(e){return function(t){return e!==t?"hidden":"visible"}},s=function(e){return function(t){return e>t?"hidden":"visible"}};var u=function(e,t,n,i){return void 0===i&&(i=1),function(c){function s(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,r.Z)(s,c);var u=s.prototype;return u.render=function(){return l.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(n);break;case"Esc":case"Escape":(0,a.c4)("/")}},s}(l.Component)}},7725:function(e,t,n){n.r(t);var r=n(7294),l=n(1682),a=n(446),i=function(e){return void 0===e&&(e=""),"eclipsecon-2021-slide"+(e?"__"+e:"")};t.default=function(e){var t=e.slide,n=void 0===t?0:t,c=e.title,s=void 0===c?"":c,u=e.children;return r.createElement("div",{className:i()},r.createElement("div",{className:i("header")},r.createElement("div",{className:"title"},s),r.createElement(l.oH,{className:"jkube-logo"})),r.createElement("div",{className:i("content")},u),r.createElement("div",{className:i("footer")},r.createElement("img",{src:a.Z,alt:"An image of the EclipseCon logo"}),r.createElement("div",{className:"page-number"},n)))}},9728:function(e,t,n){n.r(t);var r=n(7294),l=n(3680),a=n(7725);t.default=(0,l.ZP)((function(e){var t=e.currentStep,n=(0,l.Z5)(t);return r.createElement(a.default,{slide:5,title:"What is Eclipse JKube?"},r.createElement("ul",{className:"what-is-jkube"},r.createElement("li",null,"Tools and plugins",r.createElement("ul",null,r.createElement("li",null,"Generate container images"),r.createElement("li",null,"Generate and deploy configuration manifests (Kubernetes / OpenShift)"))),r.createElement("li",{className:n(2)},"Components",r.createElement("table",{style:{width:"80%"}},r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",{colSpan:2},"Java API (JKube Kit)"))),r.createElement("tbody",null,r.createElement("tr",null,r.createElement("td",null,"Kubernetes Maven Plugin"),r.createElement("td",null,"Kubernetes Gradle Plugin")),r.createElement("tr",null,r.createElement("td",null,"OpenShift Maven Plugin"),r.createElement("td",null,"OpenShift Gradle Plugin"))))),r.createElement("li",{className:n(3)},"Build Strategies",r.createElement("ul",null,r.createElement("li",null,r.createElement("strong",null,"Docker:")," uses local Docker Daemon (k8s) or remote (oc)"),r.createElement("li",null,r.createElement("strong",null,"S2I:")," OC only plugin configuration"),r.createElement("li",null,r.createElement("strong",null,"JIB:")," delegates to build to JIB (Dockerless)")))))}),"/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-040","/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-060",3)},446:function(e,t,n){t.Z=n.p+"static/eclipsecon-white-7d6a164bf0362af837ea4fb021e08b02.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2021-eclipsecon-kubernetes-gradle-plugins-slide-050-jsx-0a1c1f634231495dc95b.js.map