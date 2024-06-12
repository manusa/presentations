"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[5355],{89728:function(e,t,n){n.d(t,{Z5:function(){return r},g6:function(){return a},y$:function(){return l}});var i=n(51721),o=n(67294),s=n(14160);const r=e=>t=>e<t?"hidden":"visible",l=e=>t=>e!==t?"hidden":"visible",a=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,r){return void 0===r&&(r=1),function(l){function a(e){var t;return(t=l.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,i.Z)(a,l);var c=a.prototype;return c.render=function(){return o.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},c.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},c.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},c.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<r?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},a}(o.Component)}},47506:function(e,t,n){n.r(t);var i=n(67294),o=n(89728),s=n(26704);t.default=(0,o.ZP)((e=>{var t,n,o,r,l,a,c,u,d,p,h,m;let{currentStep:v}=e;const b={4:{hl:[3],fabric8Pod:"lime"},5:{hl:[3],stepResource:"apps().deployments()",fabric8Deployment:"lime"},6:{hl:[3],stepResource:"services()",fabric8:"lime"},7:{hl:[4],fabric8Pod:s.mo.ud},8:{hl:[5,6,7,8,9,10,11,12],sse:"lime",fabric8:"lime"}},f=null!==(t=null===(n=b[v])||void 0===n?void 0:n.hl)&&void 0!==t?t:[],y=null!==(o=null===(r=b[v])||void 0===r?void 0:r.fabric8)&&void 0!==o?o:"#FFFFFF",E=null!==(l=null===(a=b[v])||void 0===a?void 0:a.fabric8Pod)&&void 0!==l?l:y,g=null!==(c=null===(u=b[v])||void 0===u?void 0:u.fabric8Deployment)&&void 0!==c?c:y,w=null!==(d=null===(p=b[v])||void 0===p?void 0:p.sse)&&void 0!==d?d:"#FFFFFF",k=null!==(h=null===(m=b[v])||void 0===m?void 0:m.stepResource)&&void 0!==h?h:"pods()";return i.createElement(s.mo._i,{slide:17,title:"Watching Kubernetes Resources with Fabric8 Kubernetes Client"},i.createElement(s.mo.xq,{style:{display:v>2?"flex":"none",position:"absolute",fill:s.mo.ud,right:"2rem",bottom:0,height:"15rem"}}),i.createElement("style",null,`\n          .devbcn-2024 .fabric8-path {\n            stroke: ${y};\n          }\n          .devbcn-2024 .fabric8-pod-path {\n            stroke: ${E};\n          }\n          .devbcn-2024 .fabric8-deployment-path {\n            stroke: ${g};\n          }\n          .devbcn-2024 .sse-path {\n            stroke: ${w};\n          }\n        `),i.createElement(s.mo.YH,{style:{display:v>2?"flex":"none",position:"absolute",bottom:0,left:"50%",transform:"translateX(-50%)",height:"15rem"}}),i.createElement("div",{style:{height:"100%",display:"flex",alignItems:"center",justifyContent:"center"}},i.createElement(s.mo.jz,{style:{display:v<=2?"flex":"none",position:"absolute",top:0,bottom:0,transform:`scale(2.5) translateX(${2===v?-320:50}px)`,transition:"transform 1s ease-in-out"}}),i.createElement("div",{style:{display:v>2?"block":"none"}},i.createElement(s.EK,{language:"java",useInlineStyles:!1,lineProps:e=>f.includes(e)?{class:"devbcn-2024__code--highlighted"}:{}},`\n            // WatchableSubscriber.subscribe (simplified)\n            final var jitter = (long) (Math.random() * 9 + 1);\n            kubernetesClient.${k}.inAnyNamespace().watch(\n              new ListOptionsBuilder().withTimeoutSeconds(DEFAULT_WATCHER_TIMEOUT_SECONDS + jitter).build(),\n              new Watcher() {\n                public void onClose() {\n                  // ...self-healing logic\n                }\n                public void eventReceived(Action action, T resource) {\n                  multiEmitter.emit(new WatchEvent<>(action, resource));\n                }\n              });\n          `))))}),`/presentations/${s.mo.Ts}/slide-160-quarkus-self-healing`,`/presentations/${s.mo.Ts}/slide-180-yakd-frontend`,8)}}]);
//# sourceMappingURL=component---src-pages-presentations-2024-devbcn-full-stack-reactive-application-slide-170-watching-kubernetes-resources-jsx-93c981e994351194d8c0.js.map