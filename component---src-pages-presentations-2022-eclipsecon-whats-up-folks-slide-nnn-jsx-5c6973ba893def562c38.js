"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[1351,5006],{63680:function(e,t,n){n.d(t,{ZP:function(){return o},Z5:function(){return s},y$:function(){return u},g6:function(){return a}});var r=n(51721),c=n(67294),i=n(71082),s=function(e){return function(t){return e<t?"hidden":"visible"}},u=function(e){return function(t){return e!==t?"hidden":"visible"}},a=function(e){return function(t){return e>t?"hidden":"visible"}};var o=function(e,t,n,s){return void 0===s&&(s=1),function(u){function a(e){var t;return(t=u.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return e}(t)),t}(0,r.Z)(a,u);var o=a.prototype;return o.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<s?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},a}(c.Component)}},46768:function(e,t,n){n.r(t),n.d(t,{LooneyTunes:function(){return o}});var r=n(67294),c=n(21),i=n(94383),s=function(e){return void 0===e&&(e=""),i.CLASS_NAME+"-looney"+(e?"__"+e:"")},u=function(e){var t=e.number;return r.createElement("div",{className:s("ring")+" "+s("ring-"+t)})},a=function(e){var t=e.text,n=e.className,c=e.radius,i=void 0===c?100:c,s=(0,r.useRef)();return(0,r.useLayoutEffect)((function(){$(s.current).arctext({radius:i}),window.addEventListener("resize",(function(){$(s.current).arctext("set",{radius:i})}))}),[]),r.createElement("div",{ref:s,className:n},t)},o=function(e){var t=e.Icon,n=void 0===t?c.cA:t,i=e.className,o=void 0===i?"":i,l=e.title,d=void 0===l?"":l,f=e.subtitle,m=void 0===f?"":f,p=e.producer,E=void 0===p?"":p;return r.createElement("div",{className:s()+" "+o},r.createElement("div",{className:""+s("content")}),r.createElement(u,{number:5}),r.createElement(u,{number:4}),r.createElement(u,{number:3}),r.createElement(u,{number:2}),r.createElement(u,{number:1}),r.createElement("div",{className:""+s("icon")},r.createElement(n,null)),r.createElement(a,{className:s("title-fill"),text:d,radius:900}),r.createElement(a,{className:s("title"),text:d,radius:900}),r.createElement(a,{className:s("subtitle"),text:m,radius:1500}),r.createElement("div",{className:s("producer")},E))};t.default=function(){}},94383:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return a},SLUG:function(){return u}});var r=n(67294),c=n(35414),i=n(63680),s=n(46768),u="2022-eclipsecon-whats-up-folks",a="eclipsecon-2022";t.default=(0,i.ZP)((function(){return r.createElement("div",{className:a},r.createElement(c.q,null,r.createElement("title",null,"Eclipse JKube - What's up, Doc?")),r.createElement(s.LooneyTunes,{className:a+"-index",title:"ecliPse JKUbE",subtitle:'"What\'s up Doc?"',producer:"a Marc Nuri cartoon"}))}),"/","/presentations/"+u+"/slide-010")},14608:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return u},SLUG:function(){return s}});var r=n(67294),c=(n(35414),n(63680)),i=n(46768),s="2022-eclipsecon-whats-up-folks",u="eclipsecon-2022";t.default=(0,c.ZP)((function(){return r.createElement("div",{className:u},r.createElement(i.LooneyTunes,{className:u+"-index",title:"ecliPse JKUbE",subtitle:'"That\'s all Folks!"'}))}),"/presentations/"+s+"/slide-010","/presentations/"+s)}}]);
//# sourceMappingURL=component---src-pages-presentations-2022-eclipsecon-whats-up-folks-slide-nnn-jsx-5c6973ba893def562c38.js.map