"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[4632,990,9220],{63680:function(e,t,n){n.d(t,{ZP:function(){return u},Z5:function(){return i},y$:function(){return l},g6:function(){return s}});var r=n(51721),a=n(67294),c=n(14160);const i=e=>t=>e<t?"hidden":"visible",l=e=>t=>e!==t?"hidden":"visible",s=e=>t=>e>t?"hidden":"visible";var u=function(e,t,n,i){return void 0===i&&(i=1),function(l){function s(e){var t;return(t=l.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,r.Z)(s,l);var u=s.prototype;return u.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,c.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,c.c4)(n);break;case"Esc":case"Escape":(0,c.c4)("/")}},s}(a.Component)}},29810:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return u}});var r=n(67294),a=n(60071),c=n(32022);const i=function(e){return void 0===e&&(e=""),c.CLASS_NAME+"-looney"+(e?"__"+e:"")},l=e=>{let{number:t}=e;return r.createElement("div",{className:i("ring")+" "+i("ring-"+t)})},s=e=>{let{text:t,className:n,radius:a=100}=e;const c=(0,r.useRef)();return(0,r.useLayoutEffect)((()=>{$(c.current).arctext({radius:a}),window.addEventListener("resize",(()=>{$(c.current).arctext("set",{radius:a})}))}),[]),r.createElement("div",{ref:c,className:n},t)},u=e=>{let{Icon:t=a.cA,className:n="",title:c="",subtitle:u="",producer:o=""}=e;return r.createElement("div",{className:i()+" "+n},r.createElement("div",{className:""+i("content")}),r.createElement(l,{number:5}),r.createElement(l,{number:4}),r.createElement(l,{number:3}),r.createElement(l,{number:2}),r.createElement(l,{number:1}),r.createElement("div",{className:""+i("icon")},r.createElement(t,null)),r.createElement(s,{className:i("title-fill"),text:c,radius:900}),r.createElement(s,{className:i("title"),text:c,radius:900}),r.createElement(s,{className:i("subtitle"),text:u,radius:1500}),r.createElement("div",{className:i("producer")},o))};t.default=()=>{}},56186:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return l}});var r=n(67294),a=n(60071),c=n(32022),i=n(27974);const l=e=>{let{className:t="",...n}=e;return r.createElement(a.Ri,Object.assign({className:c.CLASS_NAME,footerIcon:r.createElement("img",{src:i.Z,alt:"An image of the EclipseCon logo"})},n))};t.default=()=>{}},32022:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return s},SLUG:function(){return l}});var r=n(67294),a=n(64593),c=n(63680),i=n(29810);const l="2022-eclipsecon-whats-up-doc",s="eclipsecon-2022";t.default=(0,c.ZP)((()=>r.createElement("div",{className:s},r.createElement(a.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(i.LooneyTunes,{className:s+"-index",title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))),"/","/presentations/"+l+"/slide-010")},49410:function(e,t,n){n.r(t);var r=n(67294),a=n(63680),c=n(60071),i=n(32022),l=n(56186);t.default=(0,a.ZP)((()=>r.createElement(l.SlideTemplate,{slide:1,title:"About me"},r.createElement("div",{className:"about-me"},r.createElement(c.qE,{className:"avatar"}),r.createElement("div",null,r.createElement("h2",null,"Marc Nuri"),r.createElement("p",null,"Principal Software Engineer - Red Hat"),r.createElement("h4",null,"Working on:"),r.createElement("ul",null,r.createElement("li",null,"Fabric8 Kubernetes Client"),r.createElement("li",null,"Eclipse JKube")),r.createElement("div",null,r.createElement("a",{href:"https://twitter.com/MarcNuri"},r.createElement("i",{className:"fab fa-twitter"})," @MarcNuri")),r.createElement("div",null,r.createElement("a",{href:"https://linkedin.com/in/MarcNuri"},r.createElement("i",{className:"fab fa-linkedin"})," MarcNuri")),r.createElement("div",null,r.createElement("a",{href:"https://github.com/manusa"},r.createElement("i",{className:"fab fa-github"})," ",r.createElement("i",{className:"fab fa-gitter"})," manusa")))))),"/presentations/"+i.SLUG,"/presentations/"+i.SLUG+"/slide-020")},27974:function(e,t,n){t.Z=n.p+"static/eclipsecon2022-white-9ccf29409404a678d769fed6017304bc.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-doc-slide-010-jsx-baa9d1e4a36250de612b.js.map