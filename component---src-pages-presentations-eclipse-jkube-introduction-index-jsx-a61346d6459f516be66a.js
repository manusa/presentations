"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[3443,584],{63680:function(e,t,n){n.d(t,{ZP:function(){return u},Z5:function(){return s},y$:function(){return a},g6:function(){return o}});var i=n(51721),r=n(67294),c=n(14160);const s=e=>t=>e<t?"hidden":"visible",a=e=>t=>e!==t?"hidden":"visible",o=e=>t=>e>t?"hidden":"visible";var u=function(e,t,n,s){return void 0===s&&(s=1),function(a){function o(e){var t;return(t=a.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,i.Z)(o,a);var u=o.prototype;return u.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,c.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,c.c4)(n);break;case"Esc":case"Escape":(0,c.c4)("/")}},o}(r.Component)}},16725:function(e,t,n){n.r(t);var i=n(67294),r=n(72178);const c=function(e){return void 0===e&&(e=""),"eclipse-jkube-introduction-title"+(e?"__"+e:"")};t.default=e=>{let{className:t,title:n,subtitle:s="",children:a}=e;return i.createElement("div",{className:c()+" "+t},i.createElement("div",{className:""+c("content")},i.createElement("div",{className:"logo"},i.createElement("img",{src:r.Z})),i.createElement("div",{className:"title-band"},i.createElement("h1",{className:"title"},n),i.createElement("h2",{className:"subtitle"},s)),a))}},99881:function(e,t,n){n.r(t);var i=n(67294),r=n(64593),c=n(63680),s=n(16725);const a="Deploy your Java applications to the Cloud using Eclipse JKube";t.default=(0,c.ZP)((()=>i.createElement("div",{className:"eclipse-jkube-introduction"},i.createElement(r.q,null,i.createElement("title",null,a)),i.createElement(s.default,{className:"eclipse-jkube-introduction-index",title:a,subtitle:"Marc Nuri"}))),"/","/presentations/eclipse-jkube-introduction/slide1")},72178:function(e,t,n){t.Z=n.p+"static/eclipsecon-a8b1718bdce63d2c65ae12fea8e89afa.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-eclipse-jkube-introduction-index-jsx-a61346d6459f516be66a.js.map