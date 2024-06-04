"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[5154,7045,1654],{89728:function(e,t,n){n.d(t,{Z5:function(){return l},g6:function(){return i},y$:function(){return c}});var r=n(51721),s=n(67294),a=n(14160);const l=e=>t=>e<t?"hidden":"visible",c=e=>t=>e!==t?"hidden":"visible",i=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,l){return void 0===l&&(l=1),function(c){function i(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(i,c);var u=i.prototype;return u.render=function(){return s.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<l?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(n);break;case"Esc":case"Escape":(0,a.c4)("/")}},i}(s.Component)}},70017:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return l}});var r=n(67294),s=n(11017),a=n(17057);const l=e=>{let{className:t="",...n}=e;return r.createElement(s.Ri,Object.assign({className:a.CLASS_NAME,footerIcon:r.createElement(s.qn,{gray:"#FAFAFA",fruitColor:"#082941",style:{width:"8rem"}})},n))};t.default=()=>{}},20301:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return l}});var r=n(67294),s=n(17057),a=n(11017);const l=e=>{let{...t}=e;return r.createElement(a.Nc,Object.assign({classNamePrefix:s.CLASS_NAME,logoContent:r.createElement(a.qn,{gray:"#FAFAFA",fruitColor:"#082941",style:{height:"60%"}})},t))};t.default=()=>{}},17057:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return i},SLUG:function(){return c}});var r=n(67294),s=n(64593),a=n(89728),l=n(20301);const c="2023-madridjug-jkube-remote-dev",i="madrid-jug-2023",u="Desarrollo local de aplicaciones Java en Kubernetes";t.default=(0,a.ZP)((()=>r.createElement("div",{className:i},r.createElement(s.q,null,r.createElement("title",null,u)),r.createElement(l.TitleTemplate,{title:u,subtitle:"Marc Nuri"}))),"/",`/presentations/${c}/slide-010`)},95194:function(e,t,n){n.r(t);var r=n(67294),s=n(89728),a=n(70017),l=n(17057);t.default=(0,s.ZP)((()=>r.createElement(a.SlideTemplate,{slide:8,title:"Future steps"},r.createElement("div",{className:"future-steps"},r.createElement("div",{className:"future-steps__icon"},r.createElement("i",{className:"fas fa-rocket"})),r.createElement("div",{className:"future-steps__steps"},r.createElement("div",{className:"future-steps__step"},r.createElement("h3",null,"Integration with other tooling"),r.createElement("ul",null,r.createElement("li",null,"IDE plugins"),r.createElement("li",null,"CLI tools"),r.createElement("li",null,"Move to Fabric8 Kubernetes Client?"))),r.createElement("div",{className:"future-steps__step"},r.createElement("h3",null,"Automatic port detection")),r.createElement("div",{className:"future-steps__step"},r.createElement("h3",null,"Encapsulate run")),r.createElement("div",{className:"future-steps__step"},r.createElement("h3",null,"Propagation of secrets and environment")))))),`/presentations/${l.SLUG}/slide-070`,`/presentations/${l.SLUG}/slide-090`)}}]);
//# sourceMappingURL=component---src-pages-presentations-2023-madridjug-jkube-remote-dev-slide-080-jsx-87ceb3780830d40bff5c.js.map