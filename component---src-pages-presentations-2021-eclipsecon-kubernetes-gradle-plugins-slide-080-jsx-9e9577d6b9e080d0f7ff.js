"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[9918,6266],{63680:function(e,t,n){n.d(t,{ZP:function(){return l},Z5:function(){return c},y$:function(){return a},g6:function(){return o}});var i=n(51721),r=n(67294),s=n(14160);const c=e=>t=>e<t?"hidden":"visible",a=e=>t=>e!==t?"hidden":"visible",o=e=>t=>e>t?"hidden":"visible";var l=function(e,t,n,c){return void 0===c&&(c=1),function(a){function o(e){var t;return(t=a.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,i.Z)(o,a);var l=o.prototype;return l.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},o}(r.Component)}},96442:function(e,t,n){n.r(t);var i=n(67294),r=n(70446);const s=function(e){return void 0===e&&(e=""),"eclipsecon-2021-title"+(e?"__"+e:"")};t.default=e=>{let{className:t,title:n,subtitle:c="",children:a}=e;return i.createElement("div",{className:s()+" "+t},i.createElement("div",{className:""+s("content")},i.createElement("div",{className:"logo"},i.createElement("img",{src:r.Z,alt:"An image of the EclipseCon logo"})),i.createElement("div",{className:"title-band"},i.createElement("h1",{className:"title"},n),i.createElement("h2",{className:"subtitle"},c)),a))}},23474:function(e,t,n){n.r(t);var i=n(67294),r=n(63680),s=n(96442);t.default=(0,r.ZP)((()=>i.createElement(s.default,{title:"Deploying Gradle + Kotlin Spring Boot Petclinic into Kubernetes",subtitle:"Demo"})),"/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-070","/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-090")},70446:function(e,t,n){t.Z=n.p+"static/eclipsecon-white-7d6a164bf0362af837ea4fb021e08b02.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2021-eclipsecon-kubernetes-gradle-plugins-slide-080-jsx-9e9577d6b9e080d0f7ff.js.map