"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[4283,277],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return s},y$:function(){return l}});var r=n(51721),a=n(67294),c=n(14160);const i=e=>t=>e<t?"hidden":"visible",l=e=>t=>e!==t?"hidden":"visible",s=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(l){function s(e){var t;return(t=l.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(s,l);var u=s.prototype;return u.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,c.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,c.c4)(n);break;case"Esc":case"Escape":(0,c.c4)("/")}},s}(a.Component)}},58641:function(e,t,n){n.r(t);var r=n(67294),a=n(7107),c=n(11688);const i=function(e){return void 0===e&&(e=""),"eclipse-jkube-2020-bcn-jug-slide"+(e?`__${e}`:"")};t.default=e=>{let{slide:t=0,title:n="",children:l}=e;return r.createElement("div",{className:i()},r.createElement("div",{className:i("header")},r.createElement("div",{className:"title"},n),r.createElement(a.oH,{className:"jkube-logo"})),r.createElement("div",{className:i("content")},l),r.createElement("div",{className:i("footer")},r.createElement("img",{src:c.Z}),r.createElement("div",{className:"page-number"},t)))}},70169:function(e,t,n){n.r(t);var r=n(67294),a=n(58641),c=n(89728);t.default=(0,c.ZP)((()=>r.createElement(a.default,{slide:2,title:"Agenda"},r.createElement("ul",null,r.createElement("li",null,"Cloud Native / Kubernetes / Microservices et al."),r.createElement("li",null,"What is Eclipse JKube?"),r.createElement("li",null,"Demos with Apache Kafka as Backend",r.createElement("ul",null,r.createElement("li",null,"Spring Boot 2.x - Deploying Kafdrop"),r.createElement("li",null,"Quarkus the easy way..."),r.createElement("li",null,"Spring Boot 1.x - We won't forget you!"))),r.createElement("li",null,"Future developments")))),"/presentations/eclipse-jkube-2020-bcn-jug/slide-010","/presentations/eclipse-jkube-2020-bcn-jug/slide-030")},11688:function(e,t,n){t.Z=n.p+"static/bcn-jug-logo-324e23477630121f83a4631a0a49932b.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-eclipse-jkube-2020-bcn-jug-slide-020-jsx-b4df2cf79e7d208db702.js.map