"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[3838,990,9220],{89728:function(e,t,n){n.d(t,{Z5:function(){return s},g6:function(){return o},y$:function(){return i}});var r=n(97326),l=n(94578),c=n(67294),a=n(84854);const s=e=>t=>e<t?"hidden":"visible",i=e=>t=>e!==t?"hidden":"visible",o=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,s){return void 0===s&&(s=1),function(i){function o(e){var t;return(t=i.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,r.Z)(t)),t}(0,l.Z)(o,i);var u=o.prototype;return u.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(n);break;case"Esc":case"Escape":(0,a.c4)("/")}},o}(c.Component)}},29810:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return o}});var r=n(67294),l=n(14692),c=n(32022);const a=function(e){return void 0===e&&(e=""),c.CLASS_NAME+"-looney"+(e?"__"+e:"")},s=e=>{let{number:t}=e;return r.createElement("div",{className:a("ring")+" "+a("ring-"+t)})},i=e=>{let{text:t,className:n,radius:l=100}=e;const c=(0,r.useRef)();return(0,r.useLayoutEffect)((()=>{$(c.current).arctext({radius:l}),window.addEventListener("resize",(()=>{$(c.current).arctext("set",{radius:l})}))}),[]),r.createElement("div",{ref:c,className:n},t)},o=e=>{let{Icon:t=l.cA,className:n="",title:c="",subtitle:o="",producer:u=""}=e;return r.createElement("div",{className:a()+" "+n},r.createElement("div",{className:""+a("content")}),r.createElement(s,{number:5}),r.createElement(s,{number:4}),r.createElement(s,{number:3}),r.createElement(s,{number:2}),r.createElement(s,{number:1}),r.createElement("div",{className:""+a("icon")},r.createElement(t,null)),r.createElement(i,{className:a("title-fill"),text:c,radius:900}),r.createElement(i,{className:a("title"),text:c,radius:900}),r.createElement(i,{className:a("subtitle"),text:o,radius:1500}),r.createElement("div",{className:a("producer")},u))};t.default=()=>{}},56186:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return i}});var r=n(67294),l=n(14692),c=n(32022),a=n(27974);const s=function(e){return void 0===e&&(e=""),c.CLASS_NAME+"-slide"+(e?"__"+e:"")},i=e=>{let{slide:t=0,title:n="",children:c}=e;return r.createElement("div",{className:s()},r.createElement("div",{className:s("header")},r.createElement("div",{className:"title"},n),r.createElement(l.oH,{className:"jkube-logo"})),r.createElement("div",{className:s("content")},c),r.createElement("div",{className:s("footer")},r.createElement("img",{src:a.Z,alt:"An image of the EclipseCon logo"}),r.createElement("div",{className:"page-number"},t)))};t.default=()=>{}},32022:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return i},SLUG:function(){return s}});var r=n(67294),l=n(64593),c=n(89728),a=n(29810);const s="2022-eclipsecon-whats-up-doc",i="eclipsecon-2022";t.default=(0,c.ZP)((()=>r.createElement("div",{className:i},r.createElement(l.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(a.LooneyTunes,{className:i+"-index",title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))),"/","/presentations/"+s+"/slide-010")},21053:function(e,t,n){n.r(t);var r=n(67294),l=n(89728),c=n(56186),a=n(32022);t.default=(0,l.ZP)((e=>{let{}=e;return r.createElement(c.SlideTemplate,{slide:5,title:"Eclipse JKube - Remote Development"},r.createElement("ul",null,r.createElement("li",null,"🧑‍💻 Local development in Kubernetes",r.createElement("ul",null,r.createElement("li",null,"Run and debug code in your ",r.createElement("strong",null,"local")," machine"),r.createElement("li",null,"While connected/exposed to the rest of the cluster services"),r.createElement("li",null,"Connect your local toolset to the cluster services"))),r.createElement("li",null,"➰ Boosts inner-loop developer experience"),r.createElement("li",null,"🔧 ",r.createElement("strong",null,"No")," tools required"),r.createElement("li",null,"🔑 ",r.createElement("strong",null,"No")," need for special permissions cluster/local")))}),"/presentations/"+a.SLUG+"/slide-040","/presentations/"+a.SLUG+"/slide-060",1)},27974:function(e,t,n){t.Z=n.p+"static/eclipsecon2022-white-9ccf29409404a678d769fed6017304bc.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-doc-slide-050-jsx-341fab8529b54bee1250.js.map