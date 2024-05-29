"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[8353,990,9220],{89728:function(e,t,n){n.d(t,{Z5:function(){return c},g6:function(){return s},y$:function(){return o}});var r=n(51721),l=n(67294),a=n(14160);const c=e=>t=>e<t?"hidden":"visible",o=e=>t=>e!==t?"hidden":"visible",s=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,c){return void 0===c&&(c=1),function(o){function s(e){var t;return(t=o.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(s,o);var i=s.prototype;return i.render=function(){return l.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},i.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},i.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},i.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(n);break;case"Esc":case"Escape":(0,a.c4)("/")}},s}(l.Component)}},29810:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return i}});var r=n(67294),l=n(54068),a=n(32022);const c=function(e){return void 0===e&&(e=""),`${a.CLASS_NAME}-looney${e?`__${e}`:""}`},o=e=>{let{number:t}=e;return r.createElement("div",{className:`${c("ring")} ${c("ring-"+t)}`})},s=e=>{let{text:t,className:n,radius:l=100}=e;const a=(0,r.useRef)();return(0,r.useLayoutEffect)((()=>{$(a.current).arctext({radius:l}),window.addEventListener("resize",(()=>{$(a.current).arctext("set",{radius:l})}))}),[]),r.createElement("div",{ref:a,className:n},t)},i=e=>{let{Icon:t=l.cA,className:n="",title:a="",subtitle:i="",producer:u=""}=e;return r.createElement("div",{className:`${c()} ${n}`},r.createElement("div",{className:`${c("content")}`}),r.createElement(o,{number:5}),r.createElement(o,{number:4}),r.createElement(o,{number:3}),r.createElement(o,{number:2}),r.createElement(o,{number:1}),r.createElement("div",{className:`${c("icon")}`},r.createElement(t,null)),r.createElement(s,{className:c("title-fill"),text:a,radius:900}),r.createElement(s,{className:c("title"),text:a,radius:900}),r.createElement(s,{className:c("subtitle"),text:i,radius:1500}),r.createElement("div",{className:c("producer")},u))};t.default=()=>{}},56186:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return o}});var r=n(67294),l=n(54068),a=n(32022),c=n(27974);const o=e=>{let{className:t="",...n}=e;return r.createElement(l.Ri,Object.assign({className:a.CLASS_NAME,footerIcon:r.createElement("img",{src:c.Z,alt:"An image of the EclipseCon logo"})},n))};t.default=()=>{}},32022:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return s},SLUG:function(){return o}});var r=n(67294),l=n(64593),a=n(89728),c=n(29810);const o="2022-eclipsecon-whats-up-doc",s="eclipsecon-2022";t.default=(0,a.ZP)((()=>r.createElement("div",{className:s},r.createElement(l.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(c.LooneyTunes,{className:`${s}-index`,title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))),"/",`/presentations/${o}/slide-010`)},12838:function(e,t,n){n.r(t),n.d(t,{default:function(){return u}});var r=n(67294),l=n(89728),a=n(56186),c=n(32022),o=n(54068),s=n.p+"static/duke-kubernetes-surf-sc-32825f7d98640953641762ce0ff4c520.png";const i=e=>{let{goal:t,innerLoop:n="",outerLoop:l=""}=e;return r.createElement("tr",null,r.createElement("td",{className:"left"},t),r.createElement("td",null,n),r.createElement("td",null,l))};var u=(0,l.ZP)((e=>{let{currentStep:t}=e;const n=(0,l.Z5)(t),c=(0,l.y$)(t),u=(0,l.g6)(t);return r.createElement(a.SlideTemplate,{slide:3,title:"What is Eclipse JKube?"},r.createElement("div",{className:"what-is-jkube"},r.createElement("ul",{className:u(2)},r.createElement("li",null,"Deploy Java applications into Kubernetes with ease",r.createElement("img",{style:{marginTop:"1rem",marginLeft:"1rem",height:"2rem"},src:s})),r.createElement("li",null,"Tools and plugins",r.createElement("ul",null,r.createElement("li",null,"Generate container images"),r.createElement("li",null,"Generate and deploy configuration manifests",r.createElement("ul",null,r.createElement("li",null,r.createElement(o.MN,{style:{height:"2rem"}})," Kubernetes"),r.createElement("li",null,r.createElement(o.F7,{style:{height:"2rem"},hideText:!0})," OpenShift"))))),r.createElement("li",{className:n(2)},"Components",r.createElement("table",{style:{width:"80%"}},r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",{colSpan:2},"Java API (JKube Kit)"))),r.createElement("tbody",null,r.createElement("tr",null,r.createElement("td",null,"Kubernetes Maven Plugin"),r.createElement("td",null,"Kubernetes Gradle Plugin")),r.createElement("tr",null,r.createElement("td",null,"OpenShift Maven Plugin"),r.createElement("td",null,"OpenShift Gradle Plugin")))))),r.createElement("div",{className:`${c(3)} workflow-container`},r.createElement(o.oH,{className:"jkube-logo",transform:"rotate(270)"}),r.createElement(o.c4,{className:"jkube-developer-workflow"})),r.createElement("div",{className:n(4)},r.createElement("h2",null,"Features"),r.createElement("table",{style:{width:"80%"}},r.createElement("thead",null,r.createElement("tr",null,r.createElement("th",null),r.createElement("th",null,"Inner Loop"),r.createElement("th",null,"Outer Loop"))),r.createElement("tbody",null,r.createElement(i,{goal:"build",innerLoop:"✅",outerLoop:"✅"}),r.createElement(i,{goal:"push",innerLoop:"✔️",outerLoop:"✅"}),r.createElement(i,{goal:"resource",innerLoop:"✅",outerLoop:"✅️"}),r.createElement(i,{goal:"apply",innerLoop:"✅",outerLoop:"✅️"}),r.createElement(i,{goal:"helm",innerLoop:"❌",outerLoop:"✅"}),r.createElement(i,{goal:"helm-push",innerLoop:"❌️",outerLoop:"✅"}),r.createElement(i,{goal:"undeploy",innerLoop:"✅",outerLoop:"✔️"}),r.createElement(i,{goal:"log",innerLoop:"✅",outerLoop:"✔️"}),r.createElement(i,{goal:"watch",innerLoop:"✅",outerLoop:"❌️"}),r.createElement(i,{goal:r.createElement("strong",null,"remote-dev"),innerLoop:"✅",outerLoop:"❌"}))))))}),`/presentations/${c.SLUG}/slide-020`,`/presentations/${c.SLUG}/slide-040`,4)},27974:function(e,t,n){t.Z=n.p+"static/eclipsecon2022-white-9ccf29409404a678d769fed6017304bc.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-doc-slide-030-jsx-ff8da73943a4a35c8159.js.map