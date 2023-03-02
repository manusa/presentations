"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[4632,990,9220],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return u},y$:function(){return s}});var a=n(97326),r=n(94578),c=n(67294),l=n(84854);const i=e=>t=>e<t?"hidden":"visible",s=e=>t=>e!==t?"hidden":"visible",u=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(s){function u(e){var t;return(t=s.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,a.Z)(t)),t}(0,r.Z)(u,s);var m=u.prototype;return m.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},m.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},m.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},m.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,l.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,l.c4)(n);break;case"Esc":case"Escape":(0,l.c4)("/")}},u}(c.Component)}},29810:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return u}});var a=n(67294),r=n(14692),c=n(32022);const l=function(e){return void 0===e&&(e=""),c.CLASS_NAME+"-looney"+(e?"__"+e:"")},i=e=>{let{number:t}=e;return a.createElement("div",{className:l("ring")+" "+l("ring-"+t)})},s=e=>{let{text:t,className:n,radius:r=100}=e;const c=(0,a.useRef)();return(0,a.useLayoutEffect)((()=>{$(c.current).arctext({radius:r}),window.addEventListener("resize",(()=>{$(c.current).arctext("set",{radius:r})}))}),[]),a.createElement("div",{ref:c,className:n},t)},u=e=>{let{Icon:t=r.cA,className:n="",title:c="",subtitle:u="",producer:m=""}=e;return a.createElement("div",{className:l()+" "+n},a.createElement("div",{className:""+l("content")}),a.createElement(i,{number:5}),a.createElement(i,{number:4}),a.createElement(i,{number:3}),a.createElement(i,{number:2}),a.createElement(i,{number:1}),a.createElement("div",{className:""+l("icon")},a.createElement(t,null)),a.createElement(s,{className:l("title-fill"),text:c,radius:900}),a.createElement(s,{className:l("title"),text:c,radius:900}),a.createElement(s,{className:l("subtitle"),text:u,radius:1500}),a.createElement("div",{className:l("producer")},m))};t.default=()=>{}},56186:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return s}});var a=n(67294),r=n(14692),c=n(32022),l=n(27974);const i=function(e){return void 0===e&&(e=""),c.CLASS_NAME+"-slide"+(e?"__"+e:"")},s=e=>{let{slide:t=0,title:n="",children:c}=e;return a.createElement("div",{className:i()},a.createElement("div",{className:i("header")},a.createElement("div",{className:"title"},n),a.createElement(r.oH,{className:"jkube-logo"})),a.createElement("div",{className:i("content")},c),a.createElement("div",{className:i("footer")},a.createElement("img",{src:l.Z,alt:"An image of the EclipseCon logo"}),a.createElement("div",{className:"page-number"},t)))};t.default=()=>{}},32022:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return s},SLUG:function(){return i}});var a=n(67294),r=n(64593),c=n(89728),l=n(29810);const i="2022-eclipsecon-whats-up-doc",s="eclipsecon-2022";t.default=(0,c.ZP)((()=>a.createElement("div",{className:s},a.createElement(r.q,null,a.createElement("title",null,"Eclipse JKube - What's up, Doc?")),a.createElement(l.LooneyTunes,{className:s+"-index",title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))),"/","/presentations/"+i+"/slide-010")},49410:function(e,t,n){n.r(t);var a=n(67294),r=n(89728),c=n(14692),l=n(32022),i=n(56186);t.default=(0,r.ZP)((()=>a.createElement(i.SlideTemplate,{slide:1,title:"About me"},a.createElement("div",{className:"about-me"},a.createElement(c.qE,{className:"avatar"}),a.createElement("div",null,a.createElement("h2",null,"Marc Nuri"),a.createElement("p",null,"Principal Software Engineer - Red Hat"),a.createElement("h4",null,"Working on:"),a.createElement("ul",null,a.createElement("li",null,"Fabric8 Kubernetes Client"),a.createElement("li",null,"Eclipse JKube")),a.createElement("div",null,a.createElement("a",{href:"https://twitter.com/MarcNuri"},a.createElement("i",{className:"fab fa-twitter"})," @MarcNuri")),a.createElement("div",null,a.createElement("a",{href:"https://linkedin.com/in/MarcNuri"},a.createElement("i",{className:"fab fa-linkedin"})," MarcNuri")),a.createElement("div",null,a.createElement("a",{href:"https://github.com/manusa"},a.createElement("i",{className:"fab fa-github"})," ",a.createElement("i",{className:"fab fa-gitter"})," manusa")))))),"/presentations/"+l.SLUG,"/presentations/"+l.SLUG+"/slide-020")},27974:function(e,t,n){t.Z=n.p+"static/eclipsecon2022-white-9ccf29409404a678d769fed6017304bc.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-doc-slide-010-jsx-5122b5fd38708409d9ba.js.map