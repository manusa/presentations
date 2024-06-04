"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[7827,990,9220],{89728:function(e,t,n){n.d(t,{Z5:function(){return s},g6:function(){return i},y$:function(){return l}});var r=n(51721),c=n(67294),a=n(14160);const s=e=>t=>e<t?"hidden":"visible",l=e=>t=>e!==t?"hidden":"visible",i=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,s){return void 0===s&&(s=1),function(l){function i(e){var t;return(t=l.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(i,l);var u=i.prototype;return u.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(n);break;case"Esc":case"Escape":(0,a.c4)("/")}},i}(c.Component)}},29810:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return u}});var r=n(67294),c=n(11017),a=n(32022);const s=function(e){return void 0===e&&(e=""),`${a.CLASS_NAME}-looney${e?`__${e}`:""}`},l=e=>{let{number:t}=e;return r.createElement("div",{className:`${s("ring")} ${s("ring-"+t)}`})},i=e=>{let{text:t,className:n,radius:c=100}=e;const a=(0,r.useRef)();return(0,r.useLayoutEffect)((()=>{$(a.current).arctext({radius:c}),window.addEventListener("resize",(()=>{$(a.current).arctext("set",{radius:c})}))}),[]),r.createElement("div",{ref:a,className:n},t)},u=e=>{let{Icon:t=c.cA,className:n="",title:a="",subtitle:u="",producer:o=""}=e;return r.createElement("div",{className:`${s()} ${n}`},r.createElement("div",{className:`${s("content")}`}),r.createElement(l,{number:5}),r.createElement(l,{number:4}),r.createElement(l,{number:3}),r.createElement(l,{number:2}),r.createElement(l,{number:1}),r.createElement("div",{className:`${s("icon")}`},r.createElement(t,null)),r.createElement(i,{className:s("title-fill"),text:a,radius:900}),r.createElement(i,{className:s("title"),text:a,radius:900}),r.createElement(i,{className:s("subtitle"),text:u,radius:1500}),r.createElement("div",{className:s("producer")},o))};t.default=()=>{}},56186:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return l}});var r=n(67294),c=n(11017),a=n(32022),s=n(27974);const l=e=>{let{className:t="",...n}=e;return r.createElement(c.Ri,Object.assign({className:a.CLASS_NAME,footerIcon:r.createElement("img",{src:s.Z,alt:"An image of the EclipseCon logo"})},n))};t.default=()=>{}},32022:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return i},SLUG:function(){return l}});var r=n(67294),c=n(64593),a=n(89728),s=n(29810);const l="2022-eclipsecon-whats-up-doc",i="eclipsecon-2022";t.default=(0,a.ZP)((()=>r.createElement("div",{className:i},r.createElement(c.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(s.LooneyTunes,{className:`${i}-index`,title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))),"/",`/presentations/${l}/slide-010`)},8673:function(e,t,n){n.r(t);var r=n(67294),c=n(89728),a=n(56186),s=n(32022);t.default=(0,c.ZP)((()=>r.createElement(a.SlideTemplate,{slide:2,title:"Agenda"},r.createElement("ul",null,r.createElement("li",null,"What is Eclipse JKube?"),r.createElement("li",null,"What's new?"),r.createElement("li",null,"Remote Development"),r.createElement("li",null,"Demo"),r.createElement("li",null,"Q&A")))),`/presentations/${s.SLUG}/slide-010`,`/presentations/${s.SLUG}/slide-030`)},27974:function(e,t,n){t.Z=n.p+"static/eclipsecon2022-white-9ccf29409404a678d769fed6017304bc.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-doc-slide-020-jsx-85f256657b02b09b976c.js.map