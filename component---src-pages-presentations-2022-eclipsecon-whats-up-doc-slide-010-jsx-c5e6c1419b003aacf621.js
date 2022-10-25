"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[4632,990,9220],{63680:function(e,t,n){n.d(t,{ZP:function(){return s},Z5:function(){return i},y$:function(){return l},g6:function(){return u}});var r=n(51721),a=n(67294),c=n(71082),i=function(e){return function(t){return e<t?"hidden":"visible"}},l=function(e){return function(t){return e!==t?"hidden":"visible"}},u=function(e){return function(t){return e>t?"hidden":"visible"}};var s=function(e,t,n,i){return void 0===i&&(i=1),function(l){function u(e){var t;return(t=l.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,r.Z)(u,l);var s=u.prototype;return s.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},s.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},s.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},s.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,c.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,c.c4)(n);break;case"Esc":case"Escape":(0,c.c4)("/")}},u}(a.Component)}},29810:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return s}});var r=n(67294),a=n(21),c=n(32022),i=function(e){return void 0===e&&(e=""),c.CLASS_NAME+"-looney"+(e?"__"+e:"")},l=function(e){var t=e.number;return r.createElement("div",{className:i("ring")+" "+i("ring-"+t)})},u=function(e){var t=e.text,n=e.className,a=e.radius,c=void 0===a?100:a,i=(0,r.useRef)();return(0,r.useLayoutEffect)((function(){$(i.current).arctext({radius:c}),window.addEventListener("resize",(function(){$(i.current).arctext("set",{radius:c})}))}),[]),r.createElement("div",{ref:i,className:n},t)},s=function(e){var t=e.Icon,n=void 0===t?a.cA:t,c=e.className,s=void 0===c?"":c,o=e.title,m=void 0===o?"":o,d=e.subtitle,f=void 0===d?"":d,E=e.producer,v=void 0===E?"":E;return r.createElement("div",{className:i()+" "+s},r.createElement("div",{className:""+i("content")}),r.createElement(l,{number:5}),r.createElement(l,{number:4}),r.createElement(l,{number:3}),r.createElement(l,{number:2}),r.createElement(l,{number:1}),r.createElement("div",{className:""+i("icon")},r.createElement(n,null)),r.createElement(u,{className:i("title-fill"),text:m,radius:900}),r.createElement(u,{className:i("title"),text:m,radius:900}),r.createElement(u,{className:i("subtitle"),text:f,radius:1500}),r.createElement("div",{className:i("producer")},v))};t.default=function(){}},56186:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return u}});var r=n(67294),a=n(21),c=n(32022),i=n(27974),l=function(e){return void 0===e&&(e=""),c.CLASS_NAME+"-slide"+(e?"__"+e:"")},u=function(e){var t=e.slide,n=void 0===t?0:t,c=e.title,u=void 0===c?"":c,s=e.children;return r.createElement("div",{className:l()},r.createElement("div",{className:l("header")},r.createElement("div",{className:"title"},u),r.createElement(a.oH,{className:"jkube-logo"})),r.createElement("div",{className:l("content")},s),r.createElement("div",{className:l("footer")},r.createElement("img",{src:i.Z,alt:"An image of the EclipseCon logo"}),r.createElement("div",{className:"page-number"},n)))};t.default=function(){}},32022:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return u},SLUG:function(){return l}});var r=n(67294),a=n(35414),c=n(63680),i=n(29810),l="2022-eclipsecon-whats-up-doc",u="eclipsecon-2022";t.default=(0,c.ZP)((function(){return r.createElement("div",{className:u},r.createElement(a.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(i.LooneyTunes,{className:u+"-index",title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))}),"/","/presentations/"+l+"/slide-010")},49410:function(e,t,n){n.r(t);var r=n(67294),a=n(63680),c=n(21),i=n(32022),l=n(56186);t.default=(0,a.ZP)((function(){return r.createElement(l.SlideTemplate,{slide:1,title:"About me"},r.createElement("div",{className:"about-me"},r.createElement(c.qE,{className:"avatar"}),r.createElement("div",null,r.createElement("h2",null,"Marc Nuri"),r.createElement("p",null,"Principal Software Engineer - Red Hat"),r.createElement("h4",null,"Working on:"),r.createElement("ul",null,r.createElement("li",null,"Fabric8 Kubernetes Client"),r.createElement("li",null,"Eclipse JKube")),r.createElement("div",null,r.createElement("a",{href:"https://twitter.com/MarcNuri"},r.createElement("i",{className:"fab fa-twitter"})," @MarcNuri")),r.createElement("div",null,r.createElement("a",{href:"https://linkedin.com/in/MarcNuri"},r.createElement("i",{className:"fab fa-linkedin"})," MarcNuri")),r.createElement("div",null,r.createElement("a",{href:"https://github.com/manusa"},r.createElement("i",{className:"fab fa-github"})," ",r.createElement("i",{className:"fab fa-gitter"})," manusa")))))}),"/presentations/"+i.SLUG,"/presentations/"+i.SLUG+"/slide-020")},27974:function(e,t,n){t.Z=n.p+"static/eclipsecon2022-white-9ccf29409404a678d769fed6017304bc.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-doc-slide-010-jsx-c5e6c1419b003aacf621.js.map