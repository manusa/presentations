"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[8779,706],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return s},y$:function(){return a}});var l=n(51721),r=n(67294),c=n(14160);const i=e=>t=>e<t?"hidden":"visible",a=e=>t=>e!==t?"hidden":"visible",s=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(a){function s(e){var t;return(t=a.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,l.Z)(s,a);var o=s.prototype;return o.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,c.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,c.c4)(n);break;case"Esc":case"Escape":(0,c.c4)("/")}},s}(r.Component)}},37725:function(e,t,n){n.r(t);var l=n(67294),r=n(21443),c=n(70446);const i=function(e){return void 0===e&&(e=""),"eclipsecon-2021-slide"+(e?`__${e}`:"")};t.default=e=>{let{slide:t=0,title:n="",children:a}=e;return l.createElement("div",{className:i()},l.createElement("div",{className:i("header")},l.createElement("div",{className:"title"},n),l.createElement(r.oH,{className:"jkube-logo"})),l.createElement("div",{className:i("content")},a),l.createElement("div",{className:i("footer")},l.createElement("img",{src:c.Z,alt:"An image of the EclipseCon logo"}),l.createElement("div",{className:"page-number"},t)))}},98507:function(e,t,n){n.r(t);var l=n(67294),r=n(37725),c=n(89728);t.default=(0,c.ZP)((()=>l.createElement(r.default,{slide:2,title:"Agenda"},l.createElement("ul",null,l.createElement("li",null,"Introduction - Deploying applications to Kubernetes - Challenges"),l.createElement("li",null,"What is Eclipse JKube?"),l.createElement("ul",null,l.createElement("li",null,"Components"),l.createElement("li",null,"Configuration modes")),l.createElement("li",null,l.createElement("span",{style:{color:"#326ce5"}},"Kubernetes"),l.createElement("span",{style:{opacity:.5}},"|"),l.createElement("span",{style:{color:"#eb2126"}},"OpenShift"),"  Gradle Plugin"),l.createElement("li",null,"Demo"),l.createElement("li",null,"Why should I choose Eclipse JKube?"),l.createElement("li",null,"Roadmap")))),"/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-010","/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-030")},70446:function(e,t,n){t.Z=n.p+"static/eclipsecon-white-7d6a164bf0362af837ea4fb021e08b02.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2021-eclipsecon-kubernetes-gradle-plugins-slide-020-jsx-68ca93a29a32224801f1.js.map