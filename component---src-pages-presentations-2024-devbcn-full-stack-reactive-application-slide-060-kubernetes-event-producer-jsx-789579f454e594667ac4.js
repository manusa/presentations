"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[6534],{89728:function(e,t,n){n.d(t,{Z5:function(){return a},g6:function(){return c},y$:function(){return i}});var r=n(51721),s=n(67294),o=n(14160);const a=e=>t=>e<t?"hidden":"visible",i=e=>t=>e!==t?"hidden":"visible",c=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,a){return void 0===a&&(a=1),function(i){function c(e){var t;return(t=i.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(c,i);var l=c.prototype;return l.render=function(){return s.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,o.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<a?this.setState({currentStep:this.state.currentStep+1}):(0,o.c4)(n);break;case"Esc":case"Escape":(0,o.c4)("/")}},c}(s.Component)}},50080:function(e,t,n){n.r(t);var r=n(67294),s=n(89728),o=n(21443);t.default=(0,s.ZP)((e=>{let{currentStep:t}=e;return r.createElement(o.mo._i,{slide:6,title:"Kubernetes as an Event Producer - Controller Pattern"},r.createElement(o.oe,{style:{height:"98%",position:"absolute",left:"50%",transform:"translateX(-50%)"}}),r.createElement("img",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",width:"18rem",opacity:2===t?1:0,transition:"opacity 0.5s ease-in-out"},src:o.mo.mO,alt:"A thermostat"}),r.createElement("div",{style:{position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)",display:"flex",justifyContent:"center",alignItems:"center",gap:"2rem",opacity:3===t?1:0,transition:"opacity 0.5s ease-in-out"}},r.createElement(o.EK,{language:"yaml",customStyle:{border:"1px solid",borderColor:o.mo.ud,boxShadow:"1rem 1rem 2rem 0px #33333390"}},"\n            kind: Deployment\n            metadata:\n              name: app\n            spec:\n              replicas: 1\n            # ...\n            # ...\n            status:\n              availableReplicas: 1\n              readyReplicas: 0\n            # ...\n            # ....................\n        "),r.createElement(o.EK,{language:"yaml",customStyle:{border:"1px solid",borderColor:o.mo.ud,boxShadow:"1rem 1rem 2rem 0px #33333390"}},"\n            kind: Pod\n            metadata:\n              name: app-1337\n            spec:\n              containers:\n               - name: app\n            # ...\n            status:\n              containerStatuses:\n               - name: app\n                 ready: false\n            # ....................\n        ")),r.createElement("div",{style:{position:"fixed",left:"1rem",bottom:"1rem",fontSize:"1rem",fontStyle:"italic",lineHeight:"1.5rem"}},"https://kubernetes.io/docs/concepts/architecture/controller/",r.createElement("br",null),"https://blog.marcnuri.com/kubernetes-operator-vs-controller"))}),`/presentations/${o.mo.Ts}/slide-050-kubernetes-resources`,`/presentations/${o.mo.Ts}/slide-070-kubernetes-streams`,3)}}]);
//# sourceMappingURL=component---src-pages-presentations-2024-devbcn-full-stack-reactive-application-slide-060-kubernetes-event-producer-jsx-789579f454e594667ac4.js.map