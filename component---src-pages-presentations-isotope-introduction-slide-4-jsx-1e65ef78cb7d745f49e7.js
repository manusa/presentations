(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{"11OE":function(A,e,g){"use strict";g.d(e,"b",(function(){return w})),g.d(e,"c",(function(){return C}));var B=g("9Hrx"),t=g("q1tI"),n=g.n(t),c=g("Wbzz"),w=function(A){return function(e){return A<e?"hidden":"visible"}},C=function(A){return function(e){return A!==e?"hidden":"visible"}};e.a=function(A,e,g,t){return void 0===t&&(t=1),function(w){function C(A){var e;return(e=w.call(this,A)||this).state={currentStep:1},e.handleOnKeyDown=e.onKeyDown.bind(function(A){if(void 0===A)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return A}(e)),e}Object(B.a)(C,w);var E=C.prototype;return E.render=function(){return n.a.createElement(A,Object.assign({},this.props,{currentStep:this.state.currentStep}))},E.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},E.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},E.onKeyDown=function(A){switch(A.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):Object(c.b)(e);break;case"Right":case"ArrowRight":this.state.currentStep<t?this.setState({currentStep:this.state.currentStep+1}):Object(c.b)(g);break;case"Esc":case"Escape":Object(c.b)("/")}},C}(n.a.Component)}},"3Fe2":function(A,e,g){},"7di3":function(A,e){A.exports="data:image/png;base64,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"},eKdJ:function(A,e,g){"use strict";g.r(e);var B=g("q1tI"),t=g.n(B),n=g("11OE"),c=g("7di3"),w=g.n(c),C=g("otBz"),E=g.n(C),i=g("zWAR"),r=g.n(i);g("3Fe2");e.default=Object(n.a)((function(){return t.a.createElement("div",{className:"slide slide-storage-model"},t.a.createElement("div",{className:"title"},"Isotope storage model"),t.a.createElement("div",{className:"content"},t.a.createElement("div",{className:"group browser"},t.a.createElement("div",{className:"group-title"},"Browser"),t.a.createElement("div",{className:"box indexed-db"},t.a.createElement("div",{className:"encrypted"}),t.a.createElement("img",{src:w.a}),"IndexedDB"),t.a.createElement("div",{className:"box redux"},t.a.createElement("img",{src:E.a}),"Redux")),t.a.createElement("div",{className:"group backend"},t.a.createElement("div",{className:"group-title"},"Back-end / Server-side"),t.a.createElement("div",{className:"box imap-server"},t.a.createElement("img",{src:r.a}),"IMAP Server"))))}),"/presentations/isotope-introduction/slide3","/presentations/isotope-introduction/slide5")},otBz:function(A,e,g){A.exports=g.p+"static/redux-f18023dce4a1ce45b2f977f9b7598404.png"},zWAR:function(A,e){A.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=component---src-pages-presentations-isotope-introduction-slide-4-jsx-1e65ef78cb7d745f49e7.js.map