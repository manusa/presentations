"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[3443,584],{89728:function(e,t,n){n.d(t,{Z5:function(){return a},g6:function(){return u},y$:function(){return o}});var c=n(97326),i=n(94578),r=n(67294),s=n(84854);const a=e=>t=>e<t?"hidden":"visible",o=e=>t=>e!==t?"hidden":"visible",u=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,a){return void 0===a&&(a=1),function(o){function u(e){var t;return(t=o.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,c.Z)(t)),t}(0,i.Z)(u,o);var l=u.prototype;return l.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<a?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},u}(r.Component)}},16725:function(e,t,n){n.r(t);var c=n(67294),i=n(72178);const r=function(e){return void 0===e&&(e=""),"eclipse-jkube-introduction-title"+(e?"__"+e:"")};t.default=e=>{let{className:t,title:n,subtitle:s="",children:a}=e;return c.createElement("div",{className:r()+" "+t},c.createElement("div",{className:""+r("content")},c.createElement("div",{className:"logo"},c.createElement("img",{src:i.Z})),c.createElement("div",{className:"title-band"},c.createElement("h1",{className:"title"},n),c.createElement("h2",{className:"subtitle"},s)),a))}},99881:function(e,t,n){n.r(t);var c=n(67294),i=n(64593),r=n(89728),s=n(16725);const a="Deploy your Java applications to the Cloud using Eclipse JKube";t.default=(0,r.ZP)((()=>c.createElement("div",{className:"eclipse-jkube-introduction"},c.createElement(i.q,null,c.createElement("title",null,a)),c.createElement(s.default,{className:"eclipse-jkube-introduction-index",title:a,subtitle:"Marc Nuri"}))),"/","/presentations/eclipse-jkube-introduction/slide1")},72178:function(e,t,n){t.Z=n.p+"static/eclipsecon-a8b1718bdce63d2c65ae12fea8e89afa.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-eclipse-jkube-introduction-index-jsx-97d2a893ea95eb8df32e.js.map