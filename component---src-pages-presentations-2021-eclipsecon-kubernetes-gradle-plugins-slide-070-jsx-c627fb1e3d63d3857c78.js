"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[7253,706],{89728:function(e,t,n){n.d(t,{Z5:function(){return a},g6:function(){return l},y$:function(){return c}});var s=n(51721),r=n(67294),i=n(14160);const a=e=>t=>e<t?"hidden":"visible",c=e=>t=>e!==t?"hidden":"visible",l=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,a){return void 0===a&&(a=1),function(c){function l(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,s.Z)(l,c);var o=l.prototype;return o.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<a?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},l}(r.Component)}},37725:function(e,t,n){n.r(t);var s=n(67294),r=n(7065),i=n(70446);const a=function(e){return void 0===e&&(e=""),"eclipsecon-2021-slide"+(e?`__${e}`:"")};t.default=e=>{let{slide:t=0,title:n="",children:c}=e;return s.createElement("div",{className:a()},s.createElement("div",{className:a("header")},s.createElement("div",{className:"title"},n),s.createElement(r.oH,{className:"jkube-logo"})),s.createElement("div",{className:a("content")},c),s.createElement("div",{className:a("footer")},s.createElement("img",{src:i.Z,alt:"An image of the EclipseCon logo"}),s.createElement("div",{className:"page-number"},t)))}},70162:function(e,t,n){n.r(t);var s=n(67294),r=n(89728),i=n(37725),a=n(7065);t.default=(0,r.ZP)((()=>s.createElement(i.default,{slide:7,title:"Kubernetes Gradle Plugin (Preview)"},s.createElement("div",{className:"what-is-jkube"},s.createElement(a.EK,{language:"groovy"},"\n        plugins {\n          id 'org.eclipse.jkube.kubernetes' version '1.5.0'\n        }\n      "),s.createElement(a.EK,{language:"kotlin"},'\n        plugins {\n          id("org.eclipse.jkube.openshift") version "1.5.0"\n        }\n      '),s.createElement(a.EK,{language:"shell"},"\n        $ gradle clean build k8sBuild k8sPush k8sResource k8sApply\n        $ gradle k8sDebug\n        $ gradle k8sUndeploy\n      ")))),"/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-060","/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-080")},70446:function(e,t,n){t.Z=n.p+"static/eclipsecon-white-7d6a164bf0362af837ea4fb021e08b02.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2021-eclipsecon-kubernetes-gradle-plugins-slide-070-jsx-c627fb1e3d63d3857c78.js.map