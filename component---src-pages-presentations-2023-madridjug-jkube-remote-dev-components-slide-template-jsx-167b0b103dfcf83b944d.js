"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[7045,1654],{89728:function(e,t,n){n.d(t,{Z5:function(){return s},g6:function(){return u},y$:function(){return o}});var r=n(97326),i=n(94578),c=n(67294),a=n(84854);const s=e=>t=>e<t?"hidden":"visible",o=e=>t=>e!==t?"hidden":"visible",u=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,s){return void 0===s&&(s=1),function(o){function u(e){var t;return(t=o.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,r.Z)(t)),t}(0,i.Z)(u,o);var l=u.prototype;return l.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(n);break;case"Esc":case"Escape":(0,a.c4)("/")}},u}(c.Component)}},70017:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return a}});var r=n(67294),i=n(94005),c=n(17057);const a=e=>{let{className:t="",...n}=e;return r.createElement(i.Ri,Object.assign({classNamePrefix:c.CLASS_NAME,footerIcon:r.createElement(i.qn,{gray:"#FAFAFA",fruitColor:"#082941",style:{width:"8rem"}})},n))};t.default=()=>{}},20301:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return a}});var r=n(67294),i=n(17057),c=n(94005);const a=e=>{let{className:t="",...n}=e;return r.createElement(c.Nc,Object.assign({classNamePrefix:i.CLASS_NAME,logoContent:r.createElement(c.qn,{gray:"#FAFAFA",fruitColor:"#082941",style:{height:"60%"}})},n))};t.default=()=>{}},17057:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return o},SLUG:function(){return s}});var r=n(67294),i=n(64593),c=n(89728),a=n(20301);const s="2023-madridjug-jkube-remote-dev",o="madrid-jug-2023",u="Desarrollo local de aplicaciones Java en Kubernetes";t.default=(0,c.ZP)((()=>r.createElement("div",{className:o},r.createElement(i.q,null,r.createElement("title",null,u)),r.createElement(a.TitleTemplate,{title:u,subtitle:"Marc Nuri"}))),"/","/presentations/"+s+"/slide-010")}}]);
//# sourceMappingURL=component---src-pages-presentations-2023-madridjug-jkube-remote-dev-components-slide-template-jsx-167b0b103dfcf83b944d.js.map