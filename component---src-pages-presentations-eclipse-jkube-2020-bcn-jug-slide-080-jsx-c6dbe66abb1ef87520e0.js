"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[1857,277],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return o},y$:function(){return s}});var a=n(51721),r=n(67294),c=n(14160);const i=e=>t=>e<t?"hidden":"visible",s=e=>t=>e!==t?"hidden":"visible",o=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(s){function o(e){var t;return(t=s.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,a.Z)(o,s);var u=o.prototype;return u.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,c.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,c.c4)(n);break;case"Esc":case"Escape":(0,c.c4)("/")}},o}(r.Component)}},58641:function(e,t,n){n.r(t);var a=n(67294),r=n(1374),c=n(11688);const i=function(e){return void 0===e&&(e=""),"eclipse-jkube-2020-bcn-jug-slide"+(e?`__${e}`:"")};t.default=e=>{let{slide:t=0,title:n="",children:s}=e;return a.createElement("div",{className:i()},a.createElement("div",{className:i("header")},a.createElement("div",{className:"title"},n),a.createElement(r.oH,{className:"jkube-logo"})),a.createElement("div",{className:i("content")},s),a.createElement("div",{className:i("footer")},a.createElement("img",{src:c.Z}),a.createElement("div",{className:"page-number"},t)))}},75509:function(e,t,n){n.r(t),n.d(t,{default:function(){return o}});var a=n(67294),r=n(89728),c=n(58641),i=n.p+"static/demo-overview-empty-5bc3ccb1d8145a44ab91fab11c316f43.png",s=n.p+"static/demo-overview-faa3cae60ab090cc5043ac344668affc.png";var o=(0,r.ZP)((e=>{let{currentStep:t}=e;return a.createElement(c.default,{slide:8,title:"Demo Time!"},a.createElement("div",{className:"diagram"},a.createElement("a",{className:"diagram__link",href:"https://github.com/marcnuri-demo/jkube-kafka",target:"_blank"},1===t&&a.createElement("img",{className:"diagram__image",src:i}),2===t&&a.createElement("img",{className:"diagram__image",src:s}))))}),"/presentations/eclipse-jkube-2020-bcn-jug/slide-070","/presentations/eclipse-jkube-2020-bcn-jug/slide-090",2)},11688:function(e,t,n){t.Z=n.p+"static/bcn-jug-logo-324e23477630121f83a4631a0a49932b.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-eclipse-jkube-2020-bcn-jug-slide-080-jsx-c6dbe66abb1ef87520e0.js.map