"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[9220,990],{63680:function(e,t,n){n.d(t,{ZP:function(){return o},Z5:function(){return a},y$:function(){return s},g6:function(){return u}});var r=n(51721),c=n(67294),i=n(71082),a=function(e){return function(t){return e<t?"hidden":"visible"}},s=function(e){return function(t){return e!==t?"hidden":"visible"}},u=function(e){return function(t){return e>t?"hidden":"visible"}};var o=function(e,t,n,a){return void 0===a&&(a=1),function(s){function u(e){var t;return(t=s.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,r.Z)(u,s);var o=u.prototype;return o.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<a?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},u}(c.Component)}},29810:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return o}});var r=n(67294),c=n(21),i=n(32022),a=function(e){return void 0===e&&(e=""),i.CLASS_NAME+"-looney"+(e?"__"+e:"")},s=function(e){var t=e.number;return r.createElement("div",{className:a("ring")+" "+a("ring-"+t)})},u=function(e){var t=e.text,n=e.className,c=e.radius,i=void 0===c?100:c,a=(0,r.useRef)();return(0,r.useLayoutEffect)((function(){$(a.current).arctext({radius:i}),window.addEventListener("resize",(function(){$(a.current).arctext("set",{radius:i})}))}),[]),r.createElement("div",{ref:a,className:n},t)},o=function(e){var t=e.Icon,n=void 0===t?c.cA:t,i=e.className,o=void 0===i?"":i,l=e.title,d=void 0===l?"":l,m=e.subtitle,f=void 0===m?"":m,v=e.producer,E=void 0===v?"":v;return r.createElement("div",{className:a()+" "+o},r.createElement("div",{className:""+a("content")}),r.createElement(s,{number:5}),r.createElement(s,{number:4}),r.createElement(s,{number:3}),r.createElement(s,{number:2}),r.createElement(s,{number:1}),r.createElement("div",{className:""+a("icon")},r.createElement(n,null)),r.createElement(u,{className:a("title-fill"),text:d,radius:900}),r.createElement(u,{className:a("title"),text:d,radius:900}),r.createElement(u,{className:a("subtitle"),text:f,radius:1500}),r.createElement("div",{className:a("producer")},E))};t.default=function(){}},56186:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return u}});var r=n(67294),c=n(21),i=n(32022),a=n(27974),s=function(e){return void 0===e&&(e=""),i.CLASS_NAME+"-slide"+(e?"__"+e:"")},u=function(e){var t=e.slide,n=void 0===t?0:t,i=e.title,u=void 0===i?"":i,o=e.children;return r.createElement("div",{className:s()},r.createElement("div",{className:s("header")},r.createElement("div",{className:"title"},u),r.createElement(c.oH,{className:"jkube-logo"})),r.createElement("div",{className:s("content")},o),r.createElement("div",{className:s("footer")},r.createElement("img",{src:a.Z,alt:"An image of the EclipseCon logo"}),r.createElement("div",{className:"page-number"},n)))};t.default=function(){}},32022:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return u},SLUG:function(){return s}});var r=n(67294),c=n(35414),i=n(63680),a=n(29810),s="2022-eclipsecon-whats-up-doc",u="eclipsecon-2022";t.default=(0,i.ZP)((function(){return r.createElement("div",{className:u},r.createElement(c.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(a.LooneyTunes,{className:u+"-index",title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))}),"/","/presentations/"+s+"/slide-010")},27974:function(e,t,n){t.Z=n.p+"static/eclipsecon2022-white-9ccf29409404a678d769fed6017304bc.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-doc-components-slide-template-jsx-16e924a1bb6f67c6d407.js.map