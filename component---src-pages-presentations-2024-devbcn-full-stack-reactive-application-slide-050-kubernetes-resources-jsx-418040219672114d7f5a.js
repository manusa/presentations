"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[8280],{89728:function(e,t,n){n.d(t,{Z5:function(){return a},g6:function(){return i},y$:function(){return c}});var r=n(51721),l=n(67294),s=n(14160);const a=e=>t=>e<t?"hidden":"visible",c=e=>t=>e!==t?"hidden":"visible",i=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,a){return void 0===a&&(a=1),function(c){function i(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(i,c);var u=i.prototype;return u.render=function(){return l.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<a?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},i}(l.Component)}},55950:function(e,t,n){n.r(t);var r=n(67294),l=n(89728),s=n(11017);const a=e=>{let{className:t,children:n}=e;return r.createElement("div",{className:t,style:{flex:"1 1 0",display:"flex",flexDirection:"column",alignItems:"center"}},n)};t.default=(0,l.ZP)((e=>{let{currentStep:t}=e;const n=(0,l.Z5)(t);return r.createElement(s.mo._i,{slide:5,title:"Kubernetes Resources"},r.createElement("div",null,r.createElement("ul",null,r.createElement("li",null,"Kubernetes Resources: objects to manage the state of the cluster and application"))),r.createElement("div",{style:{display:"flex",marginTop:"10rem"}},r.createElement(a,{className:n(2)},r.createElement(s.Xw,{style:{height:"10rem"}}),r.createElement("h3",null,"Pod"),r.createElement("ul",null,r.createElement("li",null,"Minimum deployment unit"),r.createElement("li",null,"One or more containers"),r.createElement("li",null,"Shared network namespace & IP"))),r.createElement(a,{className:n(3)},r.createElement(s.Vu,{style:{height:"10rem"}}),r.createElement("h3",null,"Deployment"),r.createElement("ul",null,r.createElement("li",null,"Manages a ",r.createElement("i",null,"replica")," set of Pods"),r.createElement("li",null,"Rollout, Update, Rollback"),r.createElement("li",null,"High Availability")))))}),`/presentations/${s.mo.Ts}/slide-040-kubernetes-what-is`,`/presentations/${s.mo.Ts}/slide-060-kubernetes-event-producer`,3)}}]);
//# sourceMappingURL=component---src-pages-presentations-2024-devbcn-full-stack-reactive-application-slide-050-kubernetes-resources-jsx-418040219672114d7f5a.js.map