"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[5967,7045,1654],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return o},y$:function(){return s}});var r=n(51721),a=n(67294),c=n(14160);const i=e=>t=>e<t?"hidden":"visible",s=e=>t=>e!==t?"hidden":"visible",o=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(s){function o(e){var t;return(t=s.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(o,s);var l=o.prototype;return l.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,c.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,c.c4)(n);break;case"Esc":case"Escape":(0,c.c4)("/")}},o}(a.Component)}},70017:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return i}});var r=n(67294),a=n(1374),c=n(17057);const i=e=>{let{className:t="",...n}=e;return r.createElement(a.Ri,Object.assign({className:c.CLASS_NAME,footerIcon:r.createElement(a.qn,{gray:"#FAFAFA",fruitColor:"#082941",style:{width:"8rem"}})},n))};t.default=()=>{}},20301:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return i}});var r=n(67294),a=n(17057),c=n(1374);const i=e=>{let{...t}=e;return r.createElement(c.Nc,Object.assign({classNamePrefix:a.CLASS_NAME,logoContent:r.createElement(c.qn,{gray:"#FAFAFA",fruitColor:"#082941",style:{height:"60%"}})},t))};t.default=()=>{}},17057:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return o},SLUG:function(){return s}});var r=n(67294),a=n(64593),c=n(89728),i=n(20301);const s="2023-madridjug-jkube-remote-dev",o="madrid-jug-2023",l="Desarrollo local de aplicaciones Java en Kubernetes";t.default=(0,c.ZP)((()=>r.createElement("div",{className:o},r.createElement(a.q,null,r.createElement("title",null,l)),r.createElement(i.TitleTemplate,{title:l,subtitle:"Marc Nuri"}))),"/",`/presentations/${s}/slide-010`)},2252:function(e,t,n){n.r(t);var r=n(67294),a=n(89728),c=n(70017),i=n(17057),s=n(1374);t.default=(0,a.ZP)((e=>{let{currentStep:t}=e;const n=(0,a.y$)(t);return r.createElement(c.SlideTemplate,{slide:6,title:"Eclipse JKube - Remote Development (2)"},r.createElement("div",{className:"remote-development"},r.createElement(s.z4,{className:n(1)}),r.createElement(s.yx,{className:n(2)})))}),`/presentations/${i.SLUG}/slide-050`,`/presentations/${i.SLUG}/slide-070`,2)}}]);
//# sourceMappingURL=component---src-pages-presentations-2023-madridjug-jkube-remote-dev-slide-060-jsx-cc53c0300efce618cba2.js.map