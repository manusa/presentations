"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[3481],{89728:function(e,t,n){n.d(t,{Z5:function(){return s},g6:function(){return c},y$:function(){return l}});var i=n(51721),r=n(67294),a=n(14160);const s=e=>t=>e<t?"hidden":"visible",l=e=>t=>e!==t?"hidden":"visible",c=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,s){return void 0===s&&(s=1),function(l){function c(e){var t;return(t=l.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,i.Z)(c,l);var o=c.prototype;return o.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(n);break;case"Esc":case"Escape":(0,a.c4)("/")}},c}(r.Component)}},84824:function(e,t,n){n.r(t);var i=n(67294),r=n(89728),a=n(14214);t.default=(0,r.ZP)((()=>i.createElement(a.mo._i,{slide:2,title:"Agenda"},i.createElement("div",{style:{height:"100%",display:"flex",gap:"0rem",alignItems:"center"}},i.createElement(a.mo.wp,{style:{width:"30rem",fill:"white",transform:"rotate(270deg)"},alt:"An image of the DevBcn logo"}),i.createElement("ul",{style:{flex:1}},i.createElement("li",null,"What is a Reactive Application?"),i.createElement("li",null,"Kubernetes as an Event Producer"),i.createElement("li",null,"Case study: The YAKD project"),i.createElement("li",null,"Building a resilient Backend with Quarkus"),i.createElement("li",null,"Frontend: Consuming Events Reactively"),i.createElement("li",null,"Advantages of Reactive Applications"),i.createElement("li",null,"Tradeoffs and Challenges"),i.createElement("li",null,"Q&A"))))),`/presentations/${a.mo.Ts}/slide-010-about`,`/presentations/${a.mo.Ts}/slide-030-reactive-applications`)}}]);
//# sourceMappingURL=component---src-pages-presentations-2024-devbcn-full-stack-reactive-application-slide-020-agenda-jsx-42e1c26a7a992647e99a.js.map