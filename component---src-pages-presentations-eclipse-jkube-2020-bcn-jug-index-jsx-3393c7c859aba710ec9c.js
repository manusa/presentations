"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[3141,9860],{89728:function(e,t,n){n.d(t,{Z5:function(){return s},g6:function(){return u},y$:function(){return a}});var c=n(51721),i=n(67294),r=n(14160);const s=e=>t=>e<t?"hidden":"visible",a=e=>t=>e!==t?"hidden":"visible",u=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,s){return void 0===s&&(s=1),function(a){function u(e){var t;return(t=a.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,c.Z)(u,a);var l=u.prototype;return l.render=function(){return i.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,r.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,r.c4)(n);break;case"Esc":case"Escape":(0,r.c4)("/")}},u}(i.Component)}},76831:function(e,t,n){n.r(t);var c=n(67294),i=n(11688);const r=function(e){return void 0===e&&(e=""),"eclipse-jkube-2020-bcn-jug-title"+(e?`__${e}`:"")};t.default=e=>{let{className:t,title:n,subtitle:s="",children:a}=e;return c.createElement("div",{className:`${r()} ${t}`},c.createElement("div",{className:`${r("content")}`},c.createElement("div",{className:"logo"},c.createElement("img",{src:i.Z})),c.createElement("div",{className:"title-band"},c.createElement("h1",{className:"title"},n),c.createElement("h2",{className:"subtitle"},s)),a))}},71703:function(e,t,n){n.r(t);var c=n(67294),i=n(64593),r=n(89728),s=n(76831);const a="Microservice Containerization made easy using Eclipse JKube";t.default=(0,r.ZP)((()=>c.createElement("div",{className:"eclipse-jkube-2020-bcn-jug"},c.createElement(i.q,null,c.createElement("title",null,a)),c.createElement(s.default,{className:"eclipse-jkube-2020-bcn-jug-index",title:a,subtitle:"Marc Nuri"}))),"/","/presentations/eclipse-jkube-2020-bcn-jug/slide-010")},11688:function(e,t,n){t.Z=n.p+"static/bcn-jug-logo-324e23477630121f83a4631a0a49932b.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-eclipse-jkube-2020-bcn-jug-index-jsx-3393c7c859aba710ec9c.js.map