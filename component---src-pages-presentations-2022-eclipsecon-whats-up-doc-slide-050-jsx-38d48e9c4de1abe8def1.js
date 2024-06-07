"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[3838,990,9220],{89728:function(e,t,n){n.d(t,{Z5:function(){return s},g6:function(){return i},y$:function(){return a}});var r=n(51721),c=n(67294),l=n(14160);const s=e=>t=>e<t?"hidden":"visible",a=e=>t=>e!==t?"hidden":"visible",i=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,s){return void 0===s&&(s=1),function(a){function i(e){var t;return(t=a.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(i,a);var o=i.prototype;return o.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,l.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,l.c4)(n);break;case"Esc":case"Escape":(0,l.c4)("/")}},i}(c.Component)}},29810:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return o}});var r=n(67294),c=n(7065),l=n(32022);const s=function(e){return void 0===e&&(e=""),`${l.CLASS_NAME}-looney${e?`__${e}`:""}`},a=e=>{let{number:t}=e;return r.createElement("div",{className:`${s("ring")} ${s("ring-"+t)}`})},i=e=>{let{text:t,className:n,radius:c=100}=e;const l=(0,r.useRef)();return(0,r.useLayoutEffect)((()=>{$(l.current).arctext({radius:c}),window.addEventListener("resize",(()=>{$(l.current).arctext("set",{radius:c})}))}),[]),r.createElement("div",{ref:l,className:n},t)},o=e=>{let{Icon:t=c.cA,className:n="",title:l="",subtitle:o="",producer:u=""}=e;return r.createElement("div",{className:`${s()} ${n}`},r.createElement("div",{className:`${s("content")}`}),r.createElement(a,{number:5}),r.createElement(a,{number:4}),r.createElement(a,{number:3}),r.createElement(a,{number:2}),r.createElement(a,{number:1}),r.createElement("div",{className:`${s("icon")}`},r.createElement(t,null)),r.createElement(i,{className:s("title-fill"),text:l,radius:900}),r.createElement(i,{className:s("title"),text:l,radius:900}),r.createElement(i,{className:s("subtitle"),text:o,radius:1500}),r.createElement("div",{className:s("producer")},u))};t.default=()=>{}},56186:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return a}});var r=n(67294),c=n(7065),l=n(32022),s=n(27974);const a=e=>{let{className:t="",...n}=e;return r.createElement(c.Ri,Object.assign({className:l.CLASS_NAME,footerIcon:r.createElement("img",{src:s.Z,alt:"An image of the EclipseCon logo"})},n))};t.default=()=>{}},32022:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return i},SLUG:function(){return a}});var r=n(67294),c=n(64593),l=n(89728),s=n(29810);const a="2022-eclipsecon-whats-up-doc",i="eclipsecon-2022";t.default=(0,l.ZP)((()=>r.createElement("div",{className:i},r.createElement(c.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(s.LooneyTunes,{className:`${i}-index`,title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))),"/",`/presentations/${a}/slide-010`)},21053:function(e,t,n){n.r(t);var r=n(67294),c=n(89728),l=n(56186),s=n(32022);t.default=(0,c.ZP)((e=>{let{}=e;return r.createElement(l.SlideTemplate,{slide:5,title:"Eclipse JKube - Remote Development"},r.createElement("ul",null,r.createElement("li",null,"🧑‍💻 Local development in Kubernetes",r.createElement("ul",null,r.createElement("li",null,"Run and debug code in your ",r.createElement("strong",null,"local")," machine"),r.createElement("li",null,"While connected/exposed to the rest of the cluster services"),r.createElement("li",null,"Connect your local toolset to the cluster services"))),r.createElement("li",null,"➰ Boosts inner-loop developer experience"),r.createElement("li",null,"🔧 ",r.createElement("strong",null,"No")," tools required"),r.createElement("li",null,"🔑 ",r.createElement("strong",null,"No")," need for special permissions cluster/local")))}),`/presentations/${s.SLUG}/slide-040`,`/presentations/${s.SLUG}/slide-060`,1)},27974:function(e,t,n){t.Z=n.p+"static/eclipsecon2022-white-9ccf29409404a678d769fed6017304bc.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-doc-slide-050-jsx-38d48e9c4de1abe8def1.js.map