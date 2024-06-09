"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[1601],{89728:function(e,t,n){n.d(t,{Z5:function(){return c},g6:function(){return l},y$:function(){return s}});var a=n(51721),i=n(67294),r=n(14160);const c=e=>t=>e<t?"hidden":"visible",s=e=>t=>e!==t?"hidden":"visible",l=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,c){return void 0===c&&(c=1),function(s){function l(e){var t;return(t=s.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,a.Z)(l,s);var o=l.prototype;return o.render=function(){return i.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,r.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,r.c4)(n);break;case"Esc":case"Escape":(0,r.c4)("/")}},l}(i.Component)}},5998:function(e,t,n){n.r(t);var a=n(67294),i=n(89728),r=n(21443);t.default=(0,i.ZP)((e=>{let{currentStep:t}=e;const n={4:[2,6,7],5:[4,8],6:[9,10,11,12],8:[4],9:[7,8,9],10:[10],11:[11,12],12:[14,15,16]}[t]||[];return a.createElement(r.mo._i,{slide:16,title:"Quarkus: Embracing failure"},a.createElement("div",{style:{height:"100%",display:"flex",alignItems:"center",justifyContent:"center",overflow:"hidden"}},a.createElement("img",{style:{display:t<=2?"block":"none",position:"absolute",maxWidth:"100%",transform:`scale(2.5) translateX(${2===t?50:280}px)`,transition:"transform 1s ease-in-out"},src:r.mo.Eg,alt:"A diagram of the YAKD architecture for streaming"}),a.createElement("div",{style:{display:t>2&&t<=6?"block":"none"}},a.createElement(r.EK,{language:"java",useInlineStyles:!1,lineProps:e=>n.includes(e)?{class:"devbcn-2024__code--highlighted"}:{}},'\n            // com.marcnuri.yakd.watch.SelfHealingWatchableEmitter simplified\n            public class SelfHealingWatchableEmitter implements Consumer<MultiEmitter<? super WatchEvent<?>>> {\n            \n              private final List<Watchable<?>> watchables;\n              \n              @Override\n              public void accept(MultiEmitter<? super WatchEvent<?>> emitter) {\n                watchables.forEach(watchable -> executorService.execute(() -> subscribe(watchable, emitter)));\n                emitter.onTermination(() -> {\n                  LOG.debug("WatchEvent emitter stopped downstream, cleaning all resources");\n                  activeWatches.values().forEach(Closeable::close);\n                });\n              }\n              // ...\n            }\n          ')),a.createElement("div",{style:{display:t>6?"block":"none"}},a.createElement(r.EK,{language:"java",useInlineStyles:!1,lineProps:e=>n.includes(e)?{class:"devbcn-2024__code--highlighted"}:{}},'\n            // com.marcnuri.yakd.watch.SelfHealingWatchableEmitter simplified\n            private void subscribe(Watchable<?> watchable, MultiEmitter<? super WatchEvent<?>> emitter) {\n              // pseudo-code\n              if (!emitter.isCancelled()) {\n                watchable.watch(new Fabric8Watcher() {\n                  // com.marcnuri.yakd.watch.WatchableSubscriber$WatchEventEmitter simplified\n                  void onClose() {\n                    LOG.debug("Watchable {} stopped, self healing with delay of {} seconds",\n                      watchable.getType(), watchable.getSelfHealingDelay().getSeconds());\n                    emitter.emit(new WatchEvent<>(Watcher.Action.ERROR, new RequestRestartError(watchable, throwable)));\n                    executorService.schedule(() ->\n                      subscribe(watchable, emitter), watchable.getSelfHealingDelay().getSeconds(), TimeUnit.SECONDS);\n                  }\n                  void eventReceived(Action action, T resource) {\n                    emitter.emit(new WatchEvent<>(action, resource));\n                  }\n                });\n            }\n          '))))}),`/presentations/${r.mo.Ts}/slide-150-quarkus-sse`,`/presentations/${r.mo.Ts}/slide-170-watching-kubernetes-resources`,12)}}]);
//# sourceMappingURL=component---src-pages-presentations-2024-devbcn-full-stack-reactive-application-slide-160-quarkus-self-healing-jsx-a8baaef3ed22f073614c.js.map