"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[5355],{89728:function(e,t,n){n.d(t,{Z5:function(){return o},g6:function(){return a},y$:function(){return c}});var i=n(51721),r=n(67294),s=n(14160);const o=e=>t=>e<t?"hidden":"visible",c=e=>t=>e!==t?"hidden":"visible",a=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,o){return void 0===o&&(o=1),function(c){function a(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,i.Z)(a,c);var l=a.prototype;return l.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<o?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},a}(r.Component)}},47506:function(e,t,n){n.r(t);var i=n(67294),r=n(89728),s=n(14214);t.default=(0,r.ZP)((e=>{var t;let{currentStep:n}=e;const r={4:[3],5:[3],6:[3],7:[4],8:[5,6,7,8,9,10,11,12]}[n]||[],o=null!==(t={5:"apps().deployments()",6:"services()"}[n])&&void 0!==t?t:"pods()";return i.createElement(s.mo._i,{slide:17,title:"Watching Kubernetes Resources with Fabric8 Kubernetes Client"},i.createElement("div",{style:{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}},i.createElement("img",{style:{display:n<=2?"block":"none",position:"absolute",top:0,bottom:0,transform:`scale(3) translateX(${2===n?-400:0}px)`,transition:"transform 1s ease-in-out"},src:s.mo.Eg,alt:"A diagram of the YAKD architecture for streaming"}),i.createElement("div",{style:{display:n>2?"block":"none"}},i.createElement(s.EK,{language:"java",useInlineStyles:!1,lineProps:e=>r.includes(e)?{class:"devbcn-2024__code--highlighted"}:{}},`\n            // WatchableSubscriber.subscribe (simplified)\n            final var jitter = (long) (Math.random() * 9 + 1);\n            kubernetesClient.${o}.inAnyNamespace().watch(\n              new ListOptionsBuilder().withTimeoutSeconds(DEFAULT_WATCHER_TIMEOUT_SECONDS + jitter).build(),\n              new Watcher() {\n                public void onClose() {\n                  // ...self-healing logic\n                }\n                public void eventReceived(Action action, T resource) {\n                  multiEmitter.emit(new WatchEvent<>(action, resource));\n                }\n              });\n          `))))}),`/presentations/${s.mo.Ts}/slide-160-quarkus-self-healing`,`/presentations/${s.mo.Ts}/slide-180`,8)}}]);
//# sourceMappingURL=component---src-pages-presentations-2024-devbcn-full-stack-reactive-application-slide-170-watching-kubernetes-resources-jsx-bb792de02947f48e20c0.js.map