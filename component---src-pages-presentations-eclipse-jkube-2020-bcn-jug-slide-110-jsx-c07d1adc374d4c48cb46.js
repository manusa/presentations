"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[1352,9860],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return o},y$:function(){return a}});var r=n(51721),c=n(67294),s=n(14160);const i=e=>t=>e<t?"hidden":"visible",a=e=>t=>e!==t?"hidden":"visible",o=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(a){function o(e){var t;return(t=a.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(o,a);var u=o.prototype;return u.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},o}(c.Component)}},76831:function(e,t,n){n.r(t);var r=n(67294),c=n(11688);const s=function(e){return void 0===e&&(e=""),"eclipse-jkube-2020-bcn-jug-title"+(e?`__${e}`:"")};t.default=e=>{let{className:t,title:n,subtitle:i="",children:a}=e;return r.createElement("div",{className:`${s()} ${t}`},r.createElement("div",{className:`${s("content")}`},r.createElement("div",{className:"logo"},r.createElement("img",{src:c.Z})),r.createElement("div",{className:"title-band"},r.createElement("h1",{className:"title"},n),r.createElement("h2",{className:"subtitle"},i)),a))}},12881:function(e,t,n){n.r(t);var r=n(67294),c=n(89728),s=n(76831);t.default=(0,c.ZP)((()=>r.createElement(s.default,{title:"Spring Boot 1.x - We won't forget you!",subtitle:"Demo"})),"/presentations/eclipse-jkube-2020-bcn-jug/slide-100","/presentations/eclipse-jkube-2020-bcn-jug/slide-120")},11688:function(e,t,n){t.Z=n.p+"static/bcn-jug-logo-324e23477630121f83a4631a0a49932b.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-eclipse-jkube-2020-bcn-jug-slide-110-jsx-c07d1adc374d4c48cb46.js.map