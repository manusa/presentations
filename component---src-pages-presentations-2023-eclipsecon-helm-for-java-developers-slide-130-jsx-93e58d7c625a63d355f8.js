"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[2959],{89728:function(e,t,n){n.d(t,{Z5:function(){return a},g6:function(){return i},y$:function(){return c}});var o=n(51721),r=n(67294),l=n(14160);const a=e=>t=>e<t?"hidden":"visible",c=e=>t=>e!==t?"hidden":"visible",i=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,a){return void 0===a&&(a=1),function(c){function i(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,o.Z)(i,c);var u=i.prototype;return u.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,l.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<a?this.setState({currentStep:this.state.currentStep+1}):(0,l.c4)(n);break;case"Esc":case"Escape":(0,l.c4)("/")}},i}(r.Component)}},99086:function(e,t,n){n.r(t);var o=n(67294),r=n(89728),l=n(7065);const a=e=>{let{goal:t,innerLoop:n="",outerLoop:r=""}=e;return o.createElement("tr",null,o.createElement("td",{className:"left"},t),o.createElement("td",null,n),o.createElement("td",null,r))};t.default=(0,r.ZP)((()=>o.createElement(l.h6._i,{slide:13,title:"What is Eclipse JKube? (III)"},o.createElement("h2",null,"Features"),o.createElement("table",{style:{width:"80%"}},o.createElement("thead",null,o.createElement("tr",null,o.createElement("th",null),o.createElement("th",null,"Inner Loop"),o.createElement("th",null,"Outer Loop"))),o.createElement("tbody",null,o.createElement(a,{goal:"build",innerLoop:"✅",outerLoop:"✅"}),o.createElement(a,{goal:"push",innerLoop:"✔️",outerLoop:"✅"}),o.createElement(a,{goal:"resource",innerLoop:"✅",outerLoop:"✅️"}),o.createElement(a,{goal:"apply",innerLoop:"✅",outerLoop:"✅️"}),o.createElement(a,{goal:"helm",innerLoop:"❌",outerLoop:"✅"}),o.createElement(a,{goal:"helm-push",innerLoop:"❌️",outerLoop:"✅"}),o.createElement(a,{goal:"undeploy",innerLoop:"✅",outerLoop:"✔️"}),o.createElement(a,{goal:"log",innerLoop:"✅",outerLoop:"✔️"}),o.createElement(a,{goal:"watch",innerLoop:"✅",outerLoop:"❌️"}),o.createElement(a,{goal:"remote-dev",innerLoop:"✅",outerLoop:"❌"}))))),`/presentations/${l.h6.Ts}/slide-120`,`/presentations/${l.h6.Ts}/slide-140`)}}]);
//# sourceMappingURL=component---src-pages-presentations-2023-eclipsecon-helm-for-java-developers-slide-130-jsx-93e58d7c625a63d355f8.js.map