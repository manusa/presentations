"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[5310,990,9220],{89728:function(e,t,n){n.d(t,{Z5:function(){return s},g6:function(){return l},y$:function(){return i}});var r=n(51721),c=n(67294),a=n(14160);const s=e=>t=>e<t?"hidden":"visible",i=e=>t=>e!==t?"hidden":"visible",l=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,s){return void 0===s&&(s=1),function(i){function l(e){var t;return(t=i.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(l,i);var u=l.prototype;return u.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(n);break;case"Esc":case"Escape":(0,a.c4)("/")}},l}(c.Component)}},29810:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return u}});var r=n(67294),c=n(26704),a=n(32022);const s=function(e){return void 0===e&&(e=""),`${a.CLASS_NAME}-looney${e?`__${e}`:""}`},i=e=>{let{number:t}=e;return r.createElement("div",{className:`${s("ring")} ${s("ring-"+t)}`})},l=e=>{let{text:t,className:n,radius:c=100}=e;const a=(0,r.useRef)();return(0,r.useLayoutEffect)((()=>{$(a.current).arctext({radius:c}),window.addEventListener("resize",(()=>{$(a.current).arctext("set",{radius:c})}))}),[]),r.createElement("div",{ref:a,className:n},t)},u=e=>{let{Icon:t=c.cA,className:n="",title:a="",subtitle:u="",producer:o=""}=e;return r.createElement("div",{className:`${s()} ${n}`},r.createElement("div",{className:`${s("content")}`}),r.createElement(i,{number:5}),r.createElement(i,{number:4}),r.createElement(i,{number:3}),r.createElement(i,{number:2}),r.createElement(i,{number:1}),r.createElement("div",{className:`${s("icon")}`},r.createElement(t,null)),r.createElement(l,{className:s("title-fill"),text:a,radius:900}),r.createElement(l,{className:s("title"),text:a,radius:900}),r.createElement(l,{className:s("subtitle"),text:u,radius:1500}),r.createElement("div",{className:s("producer")},o))};t.default=()=>{}},56186:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return i}});var r=n(67294),c=n(26704),a=n(32022),s=n(27974);const i=e=>{let{className:t="",...n}=e;return r.createElement(c.Ri,Object.assign({className:a.CLASS_NAME,footerIcon:r.createElement("img",{src:s.Z,alt:"An image of the EclipseCon logo"})},n))};t.default=()=>{}},32022:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return l},SLUG:function(){return i}});var r=n(67294),c=n(64593),a=n(89728),s=n(29810);const i="2022-eclipsecon-whats-up-doc",l="eclipsecon-2022";t.default=(0,a.ZP)((()=>r.createElement("div",{className:l},r.createElement(c.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(s.LooneyTunes,{className:`${l}-index`,title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))),"/",`/presentations/${i}/slide-010`)},62951:function(e,t,n){n.r(t);var r=n(67294),c=n(89728),a=n(56186),s=n(32022),i=n(26704);t.default=(0,c.ZP)((e=>{let{currentStep:t}=e;const n=(0,c.y$)(t);return r.createElement(a.SlideTemplate,{slide:6,title:"Eclipse JKube - Remote Development (2)"},r.createElement("div",{className:"remote-development"},r.createElement(i.z4,{className:n(1)}),r.createElement(i.yx,{className:n(2)})))}),`/presentations/${s.SLUG}/slide-050`,`/presentations/${s.SLUG}/slide-070`,2)},27974:function(e,t,n){t.Z=n.p+"static/eclipsecon2022-white-9ccf29409404a678d769fed6017304bc.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-doc-slide-060-jsx-6943e59edda4f996a85f.js.map