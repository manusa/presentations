"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[6777],{89728:function(e,t,n){n.d(t,{Z5:function(){return i},g6:function(){return a},y$:function(){return o}});var r=n(51721),c=n(67294),s=n(14160);const i=e=>t=>e<t?"hidden":"visible",o=e=>t=>e!==t?"hidden":"visible",a=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,i){return void 0===i&&(i=1),function(o){function a(e){var t;return(t=o.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,r.Z)(a,o);var u=a.prototype;return u.render=function(){return c.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(n);break;case"Esc":case"Escape":(0,s.c4)("/")}},a}(c.Component)}},18522:function(e,t,n){n.r(t);var r=n(67294),c=n(89728),s=n(7065);const i=e=>{let{style:t,children:n}=e;return r.createElement(s.EK,{language:"text",customStyle:{flex:1,fontSize:"1.5rem",background:"#232323CC",...t}},n)},o={2:["$ kubectl get pods --watch"],3:["NAME               READY   STATUS              RESTARTS   AGE"],4:["devbcn-2024-5c65   0/1     Pending             0          0s"],5:["devbcn-2024-5c65   0/1     ContainerCreating   0          1s"],6:["devbcn-2024-5c65   0/1     Running             0          4s"],7:["devbcn-2024-5c65   1/1     Running             0          8s"]},a={2:["$ kubectl get deploy --watch"],3:["NAME          READY   UP-TO-DATE   AVAILABLE   AGE","devbcn-2024   0/0     0            0           0s"],4:["devbcn-2024   0/1     0            0           1s"],5:["devbcn-2024   0/1     0            0           2s"],6:["devbcn-2024   0/1     1            0           5s"],7:["devbcn-2024   1/1     1            1           9s"]},u=e=>{let{currentStep:t,obj:n}=e,r="";for(let c=0;c<=t;c++)if(n[c])for(const e of n[c])r+=e+"\n";return r};t.default=(0,c.ZP)((e=>{let{currentStep:t}=e;return r.createElement(s.mo._i,{slide:7,title:"Kubernetes Streams"},r.createElement("div",{style:{display:"flex",flexDirection:"column",alignItems:"stretch"}},r.createElement("img",{style:{alignSelf:"center",width:"78rem"},src:s.mo.Qf,alt:"A diagram of the Kubernetes components"}),r.createElement("div",{style:{display:t>1?"flex":"none",justifyContent:"center",gap:"2rem"}},r.createElement(i,{style:{width:"auto"}},u({currentStep:t,obj:o})),r.createElement(i,{style:{width:"auto"}},u({currentStep:t,obj:a})))))}),`/presentations/${s.mo.Ts}/slide-060-kubernetes-event-producer`,`/presentations/${s.mo.Ts}/slide-080-yakd-case-study`,7)}}]);
//# sourceMappingURL=component---src-pages-presentations-2024-devbcn-full-stack-reactive-application-slide-070-kubernetes-streams-jsx-f48154ac8e3a2998355c.js.map