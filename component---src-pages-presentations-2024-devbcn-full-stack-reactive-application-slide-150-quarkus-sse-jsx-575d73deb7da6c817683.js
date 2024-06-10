"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[3288],{89728:function(e,t,n){n.d(t,{Z5:function(){return a},g6:function(){return o},y$:function(){return c}});var r=n(51721),s=n(67294),i=n(14160);const a=e=>t=>e<t?"hidden":"visible",c=e=>t=>e!==t?"hidden":"visible",o=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,a){return void 0===a&&(a=1),function(c){function o(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(o,c);var u=o.prototype;return u.render=function(){return s.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<a?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},o}(s.Component)}},25651:function(e,t,n){n.r(t);var r=n(67294),s=n(89728),i=n(11769);t.default=(0,s.ZP)((e=>{let{currentStep:t}=e;const n=(0,s.Z5)(t),a={4:[2,3],5:[4],6:[5,6],7:[7,8,10],8:[9],9:[11,12],10:[13,14]}[t]||[];return r.createElement(i.mo._i,{slide:15,title:"Quarkus: Streaming Server Sent Events"},r.createElement("div",{style:{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}},r.createElement("img",{style:{display:t<=2?"block":"none",position:"absolute",maxWidth:"100%",transform:`scale(${2===t?2.5:1.8}) translateX(${2===t?280:0}px)`,transition:"transform 1s ease-in-out"},src:i.mo.Eg,alt:"A diagram of the YAKD architecture for streaming"}),r.createElement(i.EK,{className:`${n(3)}`,language:"java",useInlineStyles:!1,lineProps:e=>a.includes(e)?{class:"devbcn-2024__code--highlighted"}:{}},'\n          // com.marcnuri.yakd.watch.WatchResource|WatchService simplified\n          @GET\n          @RestStreamElementType(MediaType.APPLICATION_JSON)\n          public Multi<WatchEvent<?>> get(@Context HttpServerResponse response) {\n            return Multi.createFrom()\n              .emitter(new SelfHealingWatchableEmitter(executorService, watchables))\n              .onSubscription()\n                .invoke(subscription -> {\n                  response.closeHandler(v -> subscription.cancel());\n                })\n              .onFailure()\n                .invoke(throwable ->  LOG.warn("Watch subscription closed: {}", throwable.getMessage()))\n              .onCompletion()\n                .invoke(() ->  LOG.debug("Watch subscription closed gracefully"));\n          }\n        ')))}),`/presentations/${i.mo.Ts}/slide-140-why-quarkus`,`/presentations/${i.mo.Ts}/slide-160-quarkus-self-healing`,10)}}]);
//# sourceMappingURL=component---src-pages-presentations-2024-devbcn-full-stack-reactive-application-slide-150-quarkus-sse-jsx-575d73deb7da6c817683.js.map