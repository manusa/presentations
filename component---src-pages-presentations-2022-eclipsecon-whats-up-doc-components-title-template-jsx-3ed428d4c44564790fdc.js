"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[6604,990],{89728:function(e,t,n){n.d(t,{Z5:function(){return s},g6:function(){return u},y$:function(){return i}});var r=n(51721),c=n(67294),a=n(14160);const s=e=>t=>e<t?"hidden":"visible",i=e=>t=>e!==t?"hidden":"visible",u=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,s){return void 0===s&&(s=1),function(i){function u(e){var t;return(t=i.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(u,i);var l=u.prototype;return l.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(n);break;case"Esc":case"Escape":(0,a.c4)("/")}},u}(c.Component)}},29810:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return l}});var r=n(67294),c=n(1374),a=n(32022);const s=function(e){return void 0===e&&(e=""),`${a.CLASS_NAME}-looney${e?`__${e}`:""}`},i=e=>{let{number:t}=e;return r.createElement("div",{className:`${s("ring")} ${s("ring-"+t)}`})},u=e=>{let{text:t,className:n,radius:c=100}=e;const a=(0,r.useRef)();return(0,r.useLayoutEffect)((()=>{$(a.current).arctext({radius:c}),window.addEventListener("resize",(()=>{$(a.current).arctext("set",{radius:c})}))}),[]),r.createElement("div",{ref:a,className:n},t)},l=e=>{let{Icon:t=c.cA,className:n="",title:a="",subtitle:l="",producer:o=""}=e;return r.createElement("div",{className:`${s()} ${n}`},r.createElement("div",{className:`${s("content")}`}),r.createElement(i,{number:5}),r.createElement(i,{number:4}),r.createElement(i,{number:3}),r.createElement(i,{number:2}),r.createElement(i,{number:1}),r.createElement("div",{className:`${s("icon")}`},r.createElement(t,null)),r.createElement(u,{className:s("title-fill"),text:a,radius:900}),r.createElement(u,{className:s("title"),text:a,radius:900}),r.createElement(u,{className:s("subtitle"),text:l,radius:1500}),r.createElement("div",{className:s("producer")},o))};t.default=()=>{}},93084:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return i}});var r=n(67294),c=n(1374),a=n(32022),s=n(27974);const i=e=>{let{...t}=e;return r.createElement(c.Nc,Object.assign({classNamePrefix:a.CLASS_NAME,logoContent:r.createElement("img",{src:s.Z,alt:"An image of the EclipseCon logo"})},t))};t.default=()=>{}},32022:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return u},SLUG:function(){return i}});var r=n(67294),c=n(64593),a=n(89728),s=n(29810);const i="2022-eclipsecon-whats-up-doc",u="eclipsecon-2022";t.default=(0,a.ZP)((()=>r.createElement("div",{className:u},r.createElement(c.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(s.LooneyTunes,{className:`${u}-index`,title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))),"/",`/presentations/${i}/slide-010`)},27974:function(e,t,n){t.Z=n.p+"static/eclipsecon2022-white-9ccf29409404a678d769fed6017304bc.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-doc-components-title-template-jsx-3ed428d4c44564790fdc.js.map