"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[1857,277],{89728:function(e,t,n){n.d(t,{Z5:function(){return s},g6:function(){return u},y$:function(){return o}});var a=n(97326),r=n(94578),c=n(67294),i=n(84854);const s=e=>t=>e<t?"hidden":"visible",o=e=>t=>e!==t?"hidden":"visible",u=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,s){return void 0===s&&(s=1),function(o){function u(e){var t;return(t=o.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,a.Z)(t)),t}(0,r.Z)(u,o);var l=u.prototype;return l.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},u}(c.Component)}},58641:function(e,t,n){n.r(t);var a=n(67294),r=n(14692),c=n(11688);const i=function(e){return void 0===e&&(e=""),"eclipse-jkube-2020-bcn-jug-slide"+(e?"__"+e:"")};t.default=e=>{let{slide:t=0,title:n="",children:s}=e;return a.createElement("div",{className:i()},a.createElement("div",{className:i("header")},a.createElement("div",{className:"title"},n),a.createElement(r.oH,{className:"jkube-logo"})),a.createElement("div",{className:i("content")},s),a.createElement("div",{className:i("footer")},a.createElement("img",{src:c.Z}),a.createElement("div",{className:"page-number"},t)))}},75509:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var a=n(67294),r=n(89728),c=n(58641),i=n.p+"static/demo-overview-empty-5bc3ccb1d8145a44ab91fab11c316f43.png",s=n.p+"static/demo-overview-faa3cae60ab090cc5043ac344668affc.png";var o=(0,r.ZP)((e=>{let{currentStep:t}=e;return a.createElement(c.default,{slide:8,title:"Demo Time!"},a.createElement("div",{className:"diagram"},a.createElement("a",{className:"diagram__link",href:"https://github.com/marcnuri-demo/jkube-kafka",target:"_blank"},1===t&&a.createElement("img",{className:"diagram__image",src:i}),2===t&&a.createElement("img",{className:"diagram__image",src:s}))))}),"/presentations/eclipse-jkube-2020-bcn-jug/slide-070","/presentations/eclipse-jkube-2020-bcn-jug/slide-090",2)},11688:function(e,t,n){t.Z=n.p+"static/bcn-jug-logo-324e23477630121f83a4631a0a49932b.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-eclipse-jkube-2020-bcn-jug-slide-080-jsx-be5eff7eccb658819055.js.map