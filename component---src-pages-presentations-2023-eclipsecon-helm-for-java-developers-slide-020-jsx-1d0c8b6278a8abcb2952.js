"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[3406],{89728:function(e,t,n){n.d(t,{Z5:function(){return c},g6:function(){return a},y$:function(){return l}});var r=n(51721),i=n(67294),s=n(14160);const c=e=>t=>e<t?"hidden":"visible",l=e=>t=>e!==t?"hidden":"visible",a=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,c){return void 0===c&&(c=1),function(l){function a(e){var t;return(t=l.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(a,l);var o=a.prototype;return o.render=function(){return i.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},a}(i.Component)}},1730:function(e,t,n){n.r(t);var r=n(67294),i=n(89728),s=n(54068);t.default=(0,i.ZP)((()=>r.createElement(s.h6._i,{slide:2,title:"Agenda"},r.createElement("div",{style:{height:"100%",display:"flex",gap:"3rem",alignItems:"center"}},r.createElement(s.h6.Zw,{style:{height:"40vh"}}),r.createElement("ul",{style:{flex:1}},r.createElement("li",null,"Inner Loop vs. Outer Loop"),r.createElement("li",null,"Deploying applications to Kubernetes - Challenges"),r.createElement("li",null,"What is Eclipse JKube?"),r.createElement("li",null,"Demo time"),r.createElement("li",null,"Q&A"))))),`/presentations/${s.h6.Ts}/slide-010`,`/presentations/${s.h6.Ts}/slide-030`)}}]);
//# sourceMappingURL=component---src-pages-presentations-2023-eclipsecon-helm-for-java-developers-slide-020-jsx-1d0c8b6278a8abcb2952.js.map