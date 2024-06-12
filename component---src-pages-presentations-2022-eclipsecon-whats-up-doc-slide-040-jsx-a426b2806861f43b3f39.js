"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[4699,990,9220],{89728:function(e,t,n){n.d(t,{Z5:function(){return l},g6:function(){return i},y$:function(){return s}});var r=n(51721),a=n(67294),c=n(14160);const l=e=>t=>e<t?"hidden":"visible",s=e=>t=>e!==t?"hidden":"visible",i=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,l){return void 0===l&&(l=1),function(s){function i(e){var t;return(t=s.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(i,s);var u=i.prototype;return u.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,c.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<l?this.setState({currentStep:this.state.currentStep+1}):(0,c.c4)(n);break;case"Esc":case"Escape":(0,c.c4)("/")}},i}(a.Component)}},29810:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return u}});var r=n(67294),a=n(26704),c=n(32022);const l=function(e){return void 0===e&&(e=""),`${c.CLASS_NAME}-looney${e?`__${e}`:""}`},s=e=>{let{number:t}=e;return r.createElement("div",{className:`${l("ring")} ${l("ring-"+t)}`})},i=e=>{let{text:t,className:n,radius:a=100}=e;const c=(0,r.useRef)();return(0,r.useLayoutEffect)((()=>{$(c.current).arctext({radius:a}),window.addEventListener("resize",(()=>{$(c.current).arctext("set",{radius:a})}))}),[]),r.createElement("div",{ref:c,className:n},t)},u=e=>{let{Icon:t=a.cA,className:n="",title:c="",subtitle:u="",producer:o=""}=e;return r.createElement("div",{className:`${l()} ${n}`},r.createElement("div",{className:`${l("content")}`}),r.createElement(s,{number:5}),r.createElement(s,{number:4}),r.createElement(s,{number:3}),r.createElement(s,{number:2}),r.createElement(s,{number:1}),r.createElement("div",{className:`${l("icon")}`},r.createElement(t,null)),r.createElement(i,{className:l("title-fill"),text:c,radius:900}),r.createElement(i,{className:l("title"),text:c,radius:900}),r.createElement(i,{className:l("subtitle"),text:u,radius:1500}),r.createElement("div",{className:l("producer")},o))};t.default=()=>{}},56186:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return s}});var r=n(67294),a=n(26704),c=n(32022),l=n(27974);const s=e=>{let{className:t="",...n}=e;return r.createElement(a.Ri,Object.assign({className:c.CLASS_NAME,footerIcon:r.createElement("img",{src:l.Z,alt:"An image of the EclipseCon logo"})},n))};t.default=()=>{}},32022:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return i},SLUG:function(){return s}});var r=n(67294),a=n(64593),c=n(89728),l=n(29810);const s="2022-eclipsecon-whats-up-doc",i="eclipsecon-2022";t.default=(0,c.ZP)((()=>r.createElement("div",{className:i},r.createElement(a.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(l.LooneyTunes,{className:`${i}-index`,title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))),"/",`/presentations/${s}/slide-010`)},38442:function(e,t,n){n.r(t);var r=n(67294),a=n(89728),c=n(56186),l=n(32022);t.default=(0,a.ZP)((e=>{let{}=e;return r.createElement(c.SlideTemplate,{slide:4,title:"What's new?"},r.createElement("ul",null,r.createElement("li",null,"Gradle Plugins GA"),r.createElement("li",null,"UX and overall stability improvements"),r.createElement("li",null,"Fragments for multiple environments"),r.createElement("li",null,"Support for Apple M1"),r.createElement("li",null,"Support for JakartaEE"),r.createElement("li",null,"Startup probes"),r.createElement("li",null,r.createElement("strong",null,"Remote development"))))}),`/presentations/${l.SLUG}/slide-030`,`/presentations/${l.SLUG}/slide-050`,1)},27974:function(e,t,n){t.Z=n.p+"static/eclipsecon2022-white-9ccf29409404a678d769fed6017304bc.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-doc-slide-040-jsx-a426b2806861f43b3f39.js.map