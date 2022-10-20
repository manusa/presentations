"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[296],{63680:function(e,t,A){A.d(t,{ZP:function(){return f},Z5:function(){return c},y$:function(){return a},g6:function(){return s}});var n=A(51721),r=A(67294),i=A(71082),c=function(e){return function(t){return e<t?"hidden":"visible"}},a=function(e){return function(t){return e!==t?"hidden":"visible"}},s=function(e){return function(t){return e>t?"hidden":"visible"}};var f=function(e,t,A,c){return void 0===c&&(c=1),function(a){function s(e){var t;return(t=a.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,n.Z)(s,a);var f=s.prototype;return f.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},f.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},f.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},f.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(A);break;case"Esc":case"Escape":(0,i.c4)("/")}},s}(r.Component)}},31824:function(e,t,A){A.r(t),A.d(t,{default:function(){return a}});var n=A(67294),r=A(63680),i=A.p+"static/traefik-8b908df5997718a18e669933db99cc34.png",c=A.p+"static/react-hexagon-4c8b985d0cfd931a0c664acc45a6c9b8.png",a=(0,r.ZP)((function(e){var t=e.currentStep,A=(0,r.Z5)(t);return n.createElement("div",{className:"slide slide2"},n.createElement("div",{className:"title"},"Architecture (High level)"),n.createElement("div",{className:A(4)+" row"},n.createElement("div",{className:"row-title"},"Mail Server"),n.createElement("div",{className:"multi-box"},n.createElement("div",{className:"box blue2"},"IMAP Server"),n.createElement("div",{className:"box yellow"},"SMTP Server"))),n.createElement("div",{className:"spacer"}),n.createElement("div",{className:A(3)+" row"},n.createElement("div",{className:"row-title"},"Back-end"),n.createElement("div",{className:"box red"},n.createElement("img",{src:"data:image/png;base64,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"}),"Java Mail")),n.createElement("div",{className:A(3)+" row"},n.createElement("div",{className:"row-title"}),n.createElement("div",{className:"box green"},n.createElement("img",{src:"data:image/png;base64,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"}),"Spring")),n.createElement("div",{className:"spacer"}),n.createElement("div",{className:A(2)+" row"},n.createElement("div",{className:"row-title"},"API Gateway"),n.createElement("div",{className:"box blue"},n.createElement("img",{src:i}),"Reverse Proxy [Traefik]")),n.createElement("div",{className:"spacer"}),n.createElement("div",{className:A(5)+" row"},n.createElement("div",{className:"row-title"},"Front-end"),n.createElement("div",{className:"box purple"},n.createElement("img",{src:c}),"ReactJS")))}),"/presentations/isotope-introduction/slide1","/presentations/isotope-introduction/slide3",5)}}]);
//# sourceMappingURL=component---src-pages-presentations-isotope-introduction-slide-2-jsx-36676012678e548736bb.js.map