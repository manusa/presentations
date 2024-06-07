"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[729],{89728:function(e,t,n){n.d(t,{Z5:function(){return a},g6:function(){return s},y$:function(){return c}});var r=n(51721),i=n(67294),l=n(14160);const a=e=>t=>e<t?"hidden":"visible",c=e=>t=>e!==t?"hidden":"visible",s=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,a){return void 0===a&&(a=1),function(c){function s(e){var t;return(t=c.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(s,c);var o=s.prototype;return o.render=function(){return i.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,l.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<a?this.setState({currentStep:this.state.currentStep+1}):(0,l.c4)(n);break;case"Esc":case"Escape":(0,l.c4)("/")}},s}(i.Component)}},85186:function(e,t,n){n.r(t);var r=n(67294),i=n(89728),l=n(7065);const a=e=>{let{style:t,children:n,...i}=e;return r.createElement("div",Object.assign({style:{margin:0,display:"flex",flexWrap:"wrap",alignItems:"center",justifyContent:"center",alignContent:"center",gap:"1rem",...t}},i),n)},c=e=>{let{children:t}=e;return r.createElement("div",{style:{margin:0,padding:"0.5rem",background:l.mo.Ej,color:"white",borderRadius:"1rem",fontSize:"2rem"}},t)};t.default=(0,i.ZP)((e=>{let{currentStep:t}=e;const n=(0,i.Z5)(t);return r.createElement(l.mo._i,{slide:3,title:"What is a Reactive Application?"},r.createElement(l.mo.tc,null),r.createElement("div",{style:{position:"absolute",top:0,bottom:0,right:0,width:"30rem",display:"flex",flexDirection:"column",justifyContent:"space-between"}},r.createElement(a,{className:`${n(2)}`,style:{height:"calc(33% - 1rem)"}},r.createElement(c,null,"Usability"),r.createElement(c,null,"Rapid response times"),r.createElement(c,null,"Problems detected quickly")),r.createElement(a,{className:`${n(3)}`,style:{height:"33%"}},r.createElement(c,null,"Resiliency"),r.createElement(c,null,"High availability"),r.createElement(c,null,"Self-healing"),r.createElement(c,null,"Isolation"),r.createElement(c,null,"Varying Workloads"),r.createElement(c,null,"Replication")),r.createElement(a,{className:`${n(4)}`,style:{height:"calc(33% - 1rem)"}},r.createElement(c,null,"Asynchronous"),r.createElement(c,null,"Boundaries"),r.createElement(c,null,"Loose coupling"),r.createElement(c,null,"Non-blocking"),r.createElement(c,null,"Backpressure"))),r.createElement("div",{style:{position:"fixed",left:"1rem",bottom:"1rem",fontSize:"1rem",fontStyle:"italic"}},"The Reactive Manifesto (https://www.reactivemanifesto.org/)"))}),`/presentations/${l.mo.Ts}/slide-020-agenda`,`/presentations/${l.mo.Ts}/slide-040-kubernetes-what-is`,4)}}]);
//# sourceMappingURL=component---src-pages-presentations-2024-devbcn-full-stack-reactive-application-slide-030-reactive-applications-jsx-e970b28d824f28c86cb2.js.map