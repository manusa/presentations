"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[4796,5820,7465],{3680:function(e,t,n){n.d(t,{ZP:function(){return u},Z5:function(){return l},y$:function(){return s},g6:function(){return c}});var r=n(1721),a=n(7294),i=n(1597),l=function(e){return function(t){return e<t?"hidden":"visible"}},s=function(e){return function(t){return e!==t?"hidden":"visible"}},c=function(e){return function(t){return e>t?"hidden":"visible"}};var u=function(e,t,n,l){return void 0===l&&(l=1),function(s){function c(e){var t;return(t=s.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,r.Z)(c,s);var u=c.prototype;return u.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<l?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},c}(a.Component)}},5123:function(e,t,n){n.r(t);var r=n(7294),a=n(4051),i=n(3512),l=function(e){return void 0===e&&(e=""),a.CLASS_NAME+"-slide"+(e?"__"+e:"")};t.default=function(e){var t=e.slide,n=void 0===t?0:t,a=e.title,s=void 0===a?"":a,c=e.children;return r.createElement("div",{className:l()},r.createElement("div",{className:l("header")},r.createElement("div",{className:"title"},s),r.createElement("img",{className:"duke-logo",src:i.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),r.createElement("div",{className:l("content")},c),r.createElement("div",{className:l("footer")},r.createElement("div",{className:"page-number"},n)))}},9829:function(e,t,n){n.r(t);var r=n(7294),a=n(4051),i=n(3512),l=function(e){return void 0===e&&(e=""),a.CLASS_NAME+"-title"+(e?"__"+e:"")};t.default=function(e){var t=e.className,n=e.title,a=e.subtitle,s=void 0===a?"":a,c=e.children;return r.createElement("div",{className:l()+" "+t},r.createElement("div",{className:""+l("content")},r.createElement("div",{className:"logo"},r.createElement("img",{src:i.Z,alt:"An image of the Duke riding a Kubernetes surfboard"})),r.createElement("div",{className:"title-band"},r.createElement("h1",{className:"title"},n),r.createElement("h2",{className:"subtitle"},s)),c))}},4051:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return s}});var r=n(7294),a=n(5414),i=n(3680),l=n(9829),s="kubernetes-java-developers-2022",c="Kubernetes for Java developers workshop";t.default=(0,i.ZP)((function(){return r.createElement("div",{className:s},r.createElement(a.q,null,r.createElement("title",null,c)),r.createElement(l.default,{className:s+"-index",title:c,subtitle:"Marc Nuri"}))}),"/","/presentations/2022-kubernetes-for-java-developers/slide-010")},417:function(e,t,n){n.r(t);var r=n(7294),a=n(5123),i=n(3680);t.default=(0,i.ZP)((function(){return r.createElement(a.default,{slide:2,title:"Agenda"},r.createElement("ul",null,r.createElement("li",null,"Introduction - Deploying applications into Kubernetes - Challenges"),r.createElement("li",null,"What is Kubernetes?"),r.createElement("li",null,"Deploying a Java application into Kubernetes",r.createElement("ul",null,r.createElement("li",null,"Eclipse JKube"))),r.createElement("li",null,"Controlling Kubernetes from Java",r.createElement("ul",null,r.createElement("li",null,"Fabric8 Kubernetes Client"),r.createElement("li",null,"JBang"))),r.createElement("li",null,"Kubernetes controllers and operators in Java")))}),"/presentations/2022-kubernetes-for-java-developers/slide-010","/presentations/2022-kubernetes-for-java-developers/slide-030")},3512:function(e,t,n){t.Z=n.p+"static/duke-kubernetes-surf-sc-32825f7d98640953641762ce0ff4c520.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-kubernetes-for-java-developers-slide-020-jsx-fb8b4bf1a3ab5f5fb278.js.map