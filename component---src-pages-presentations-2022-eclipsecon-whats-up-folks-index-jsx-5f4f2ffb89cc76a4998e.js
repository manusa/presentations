"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[5006],{63680:function(e,t,n){n.d(t,{ZP:function(){return o},Z5:function(){return u},y$:function(){return a},g6:function(){return s}});var r=n(51721),c=n(67294),i=n(71082),u=function(e){return function(t){return e<t?"hidden":"visible"}},a=function(e){return function(t){return e!==t?"hidden":"visible"}},s=function(e){return function(t){return e>t?"hidden":"visible"}};var o=function(e,t,n,u){return void 0===u&&(u=1),function(a){function s(e){var t;return(t=a.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,r.Z)(s,a);var o=s.prototype;return o.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<u?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},s}(c.Component)}},46768:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return o}});var r=n(67294),c=n(63662),i=n(94383),u=function(e){return void 0===e&&(e=""),i.CLASS_NAME+"-looney"+(e?"__"+e:"")},a=function(e){var t=e.number;return r.createElement("div",{className:u("ring")+" "+u("ring-"+t)})},s=function(e){var t=e.text,n=e.className,c=e.radius,i=void 0===c?100:c,u=(0,r.useRef)();return(0,r.useLayoutEffect)((function(){$(u.current).arctext({radius:i}),window.addEventListener("resize",(function(){$(u.current).arctext("set",{radius:i})}))}),[]),r.createElement("div",{ref:u,className:n},t)},o=function(e){var t=e.Icon,n=void 0===t?c.cA:t,i=e.className,o=void 0===i?"":i,l=e.title,d=void 0===l?"":l,m=e.subtitle,f=void 0===m?"":m,p=e.producer,v=void 0===p?"":p;return r.createElement("div",{className:u()+" "+o},r.createElement("div",{className:""+u("content")}),r.createElement(a,{number:5}),r.createElement(a,{number:4}),r.createElement(a,{number:3}),r.createElement(a,{number:2}),r.createElement(a,{number:1}),r.createElement("div",{className:""+u("icon")},r.createElement(n,null)),r.createElement(s,{className:u("title-fill"),text:d,radius:900}),r.createElement(s,{className:u("title"),text:d,radius:900}),r.createElement(s,{className:u("subtitle"),text:f,radius:1500}),r.createElement("div",{className:u("producer")},v))};t.default=function(){}},94383:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return s},SLUG:function(){return a}});var r=n(67294),c=n(35414),i=n(63680),u=n(46768),a="2022-eclipsecon-whats-up-folks",s="eclipsecon-2022";t.default=(0,i.ZP)((function(){return r.createElement("div",{className:s},r.createElement(c.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(u.LooneyTunes,{className:s+"-index",title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))}),"/","/presentations/"+a+"/slide-010")}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-folks-index-jsx-5f4f2ffb89cc76a4998e.js.map