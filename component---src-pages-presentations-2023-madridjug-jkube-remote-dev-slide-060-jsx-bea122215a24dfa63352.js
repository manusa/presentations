"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[5967,7045,1654],{63680:function(e,t,n){n.d(t,{ZP:function(){return l},Z5:function(){return s},y$:function(){return c},g6:function(){return o}});var r=n(51721),i=n(67294),a=n(14160);const s=e=>t=>e<t?"hidden":"visible",c=e=>t=>e!==t?"hidden":"visible",o=e=>t=>e>t?"hidden":"visible";var l=function(e,t,n,s){return void 0===s&&(s=1),function(c){function o(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,r.Z)(o,c);var l=o.prototype;return l.render=function(){return i.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(n);break;case"Esc":case"Escape":(0,a.c4)("/")}},o}(i.Component)}},70017:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return s}});var r=n(67294),i=n(60071),a=n(17057);const s=e=>{let{className:t="",...n}=e;return r.createElement(i.Ri,Object.assign({className:a.CLASS_NAME,footerIcon:r.createElement(i.qn,{gray:"#FAFAFA",fruitColor:"#082941",style:{width:"8rem"}})},n))};t.default=()=>{}},20301:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return s}});var r=n(67294),i=n(17057),a=n(60071);const s=e=>{let{...t}=e;return r.createElement(a.Nc,Object.assign({classNamePrefix:i.CLASS_NAME,logoContent:r.createElement(a.qn,{gray:"#FAFAFA",fruitColor:"#082941",style:{height:"60%"}})},t))};t.default=()=>{}},17057:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return o},SLUG:function(){return c}});var r=n(67294),i=n(64593),a=n(63680),s=n(20301);const c="2023-madridjug-jkube-remote-dev",o="madrid-jug-2023",l="Desarrollo local de aplicaciones Java en Kubernetes";t.default=(0,a.ZP)((()=>r.createElement("div",{className:o},r.createElement(i.q,null,r.createElement("title",null,l)),r.createElement(s.TitleTemplate,{title:l,subtitle:"Marc Nuri"}))),"/","/presentations/"+c+"/slide-010")},2252:function(e,t,n){n.r(t);var r=n(67294),i=n(63680),a=n(70017),s=n(17057),c=n(60071);t.default=(0,i.ZP)((e=>{let{currentStep:t}=e;const n=(0,i.y$)(t);return r.createElement(a.SlideTemplate,{slide:6,title:"Eclipse JKube - Remote Development (2)"},r.createElement("div",{className:"remote-development"},r.createElement(c.z4,{className:n(1)}),r.createElement(c.yx,{className:n(2)})))}),"/presentations/"+s.SLUG+"/slide-050","/presentations/"+s.SLUG+"/slide-070",2)}}]);
//# sourceMappingURL=component---src-pages-presentations-2023-madridjug-jkube-remote-dev-slide-060-jsx-bea122215a24dfa63352.js.map