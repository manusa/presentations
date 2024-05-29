"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[8383,990,6604],{89728:function(e,t,n){n.d(t,{Z5:function(){return s},g6:function(){return l},y$:function(){return i}});var r=n(51721),a=n(67294),c=n(14160);const s=e=>t=>e<t?"hidden":"visible",i=e=>t=>e!==t?"hidden":"visible",l=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,s){return void 0===s&&(s=1),function(i){function l(e){var t;return(t=i.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(l,i);var u=l.prototype;return u.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,c.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,c.c4)(n);break;case"Esc":case"Escape":(0,c.c4)("/")}},l}(a.Component)}},29810:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return u}});var r=n(67294),a=n(54068),c=n(32022);const s=function(e){return void 0===e&&(e=""),`${c.CLASS_NAME}-looney${e?`__${e}`:""}`},i=e=>{let{number:t}=e;return r.createElement("div",{className:`${s("ring")} ${s("ring-"+t)}`})},l=e=>{let{text:t,className:n,radius:a=100}=e;const c=(0,r.useRef)();return(0,r.useLayoutEffect)((()=>{$(c.current).arctext({radius:a}),window.addEventListener("resize",(()=>{$(c.current).arctext("set",{radius:a})}))}),[]),r.createElement("div",{ref:c,className:n},t)},u=e=>{let{Icon:t=a.cA,className:n="",title:c="",subtitle:u="",producer:o=""}=e;return r.createElement("div",{className:`${s()} ${n}`},r.createElement("div",{className:`${s("content")}`}),r.createElement(i,{number:5}),r.createElement(i,{number:4}),r.createElement(i,{number:3}),r.createElement(i,{number:2}),r.createElement(i,{number:1}),r.createElement("div",{className:`${s("icon")}`},r.createElement(t,null)),r.createElement(l,{className:s("title-fill"),text:c,radius:900}),r.createElement(l,{className:s("title"),text:c,radius:900}),r.createElement(l,{className:s("subtitle"),text:u,radius:1500}),r.createElement("div",{className:s("producer")},o))};t.default=()=>{}},93084:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return i}});var r=n(67294),a=n(54068),c=n(32022),s=n(27974);const i=e=>{let{...t}=e;return r.createElement(a.Nc,Object.assign({classNamePrefix:c.CLASS_NAME,logoContent:r.createElement("img",{src:s.Z,alt:"An image of the EclipseCon logo"})},t))};t.default=()=>{}},32022:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return l},SLUG:function(){return i}});var r=n(67294),a=n(64593),c=n(89728),s=n(29810);const i="2022-eclipsecon-whats-up-doc",l="eclipsecon-2022";t.default=(0,c.ZP)((()=>r.createElement("div",{className:l},r.createElement(a.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(s.LooneyTunes,{className:`${l}-index`,title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))),"/",`/presentations/${i}/slide-010`)},93957:function(e,t,n){n.r(t);var r=n(67294),a=n(89728),c=n(54068),s=n(93084),i=n(32022);t.default=(0,a.ZP)((()=>r.createElement(s.TitleTemplate,{className:`${i.CLASS_NAME}-thank-you`},r.createElement("h2",{className:"thank-you"},"Thank you!"),r.createElement("div",{className:"reach-out"},r.createElement("a",{href:"https://github.com/eclipse/jkube"},r.createElement("i",{className:"fab fa-github"})," github.com/eclipse/jkube"),r.createElement("a",{href:"https://twitter.com/jkubeio"},r.createElement("i",{className:"fab fa-twitter"})," @jkubeio"),r.createElement("a",{href:"https://www.eclipse.org/jkube"},r.createElement("i",{className:"fas fa-home"})," www.eclipse.org/jkube"),r.createElement(c.oH,{className:"jkube-logo"})),r.createElement("div",{className:"presentation-links"},r.createElement("ul",null,r.createElement("li",null,r.createElement("a",{href:`https://presentations.marcnuri.com/presentations/${i.SLUG}/`},"https://presentations.marcnuri.com/presentations/",i.SLUG)))))),`/presentations/${i.SLUG}/slide-080`,`/presentations/${i.SLUG}/slide-100`,1)},27974:function(e,t,n){t.Z=n.p+"static/eclipsecon2022-white-9ccf29409404a678d769fed6017304bc.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-doc-slide-090-jsx-69f79dce45ad6a6f6d28.js.map