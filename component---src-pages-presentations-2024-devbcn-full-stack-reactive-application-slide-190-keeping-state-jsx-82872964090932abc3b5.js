"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[1579],{89728:function(e,t,n){n.d(t,{Z5:function(){return a},g6:function(){return c},y$:function(){return o}});var r=n(51721),s=n(67294),i=n(14160);const a=e=>t=>e<t?"hidden":"visible",o=e=>t=>e!==t?"hidden":"visible",c=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,a){return void 0===a&&(a=1),function(o){function c(e){var t;return(t=o.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(c,o);var l=c.prototype;return l.render=function(){return s.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<a?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},c}(s.Component)}},96833:function(e,t,n){n.r(t);var r=n(67294),s=n(89728),i=n(7065);t.default=(0,s.ZP)((e=>{let{currentStep:t}=e;return r.createElement(i.mo._i,{slide:19,title:"Frontend: Keeping the state"},r.createElement("div",{style:{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}},r.createElement("img",{style:{display:t<=2?"block":"none",maxWidth:"100%",transform:`scale(${2===t?2.5:1}) translateX(${2===t?"470":"0"}px)`,transition:"transform 1s ease-in-out"},src:i.mo.Eg,alt:"A diagram of the YAKD architecture for streaming"}),r.createElement(i.MN,{style:{display:3===t?"block":"none",marginLeft:"31rem",width:"30rem","-webkit-box-reflect":"left 2rem linear-gradient(to left, rgba(0, 0, 0, 0.2), rgba(0, 0, 0, 0.8))"}}),r.createElement("img",{style:{display:4===t?"block":"none",maxWidth:"100%"},src:i.mo.IJ,alt:"A snapshot of the YAKD frontend state"})))}),`/presentations/${i.mo.Ts}/slide-180-yakd-frontend`,`/presentations/${i.mo.Ts}/slide-200-consuming-sse`,4)}}]);
//# sourceMappingURL=component---src-pages-presentations-2024-devbcn-full-stack-reactive-application-slide-190-keeping-state-jsx-82872964090932abc3b5.js.map