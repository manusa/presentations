"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[7315,8219,7045,1654],{89728:function(e,t,n){n.d(t,{Z5:function(){return o},g6:function(){return c},y$:function(){return a}});var l=n(51721),r=n(67294),i=n(14160);const o=e=>t=>e<t?"hidden":"visible",a=e=>t=>e!==t?"hidden":"visible",c=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,n,o){return void 0===o&&(o=1),function(a){function c(e){var t;return(t=a.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(t),t}(0,l.Z)(c,a);var s=c.prototype;return s.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},s.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},s.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},s.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,i.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<o?this.setState({currentStep:this.state.currentStep+1}):(0,i.c4)(n);break;case"Esc":case"Escape":(0,i.c4)("/")}},c}(r.Component)}},27991:function(e,t,n){n.r(t),n.d(t,{InnerOuterLoop:function(){return r}});var l=n(67294);const r=e=>{let{innerLoopColor:t="#06c",outerLoopColor:n="#f63440",pushCommitColor:r="#f05133",...i}=e;return l.createElement("svg",Object.assign({xmlns:"http://www.w3.org/2000/svg",xmlnsXlink:"http://www.w3.org/1999/xlink",width:729,height:678,viewBox:"-0.5 -0.5 729 678"},i),l.createElement("path",{d:"M476.61 429.28c-40.7 57.46-112.73 83.72-180.86 65.93-68.14-17.79-118.14-75.91-125.56-145.93-7.42-70.03 29.3-137.33 92.19-169 62.9-31.67 138.83-21.09 190.67 26.57l-35.51 38.63c-35.77-32.89-88.16-40.19-131.56-18.34-43.4 21.85-68.73 68.29-63.61 116.61 5.12 48.32 39.62 88.42 86.63 100.69 47.01 12.28 96.71-5.84 124.8-45.49Z",fill:`${t}`,pointerEvents:"all"}),l.createElement("path",{d:"m694.86 209.09-42.565 113.618-93.67-77.114Z",fill:`${n}`,pointerEvents:"all"}),l.createElement("path",{d:"M533.74 274.17a162.242 162.242 0 0 1 101.51 85.03c20.2 41.5 21.77 89.63 4.31 132.35l-48.04-19.63a110.314 110.314 0 0 0-71.96-147.82Z",fill:`${r}`,pointerEvents:"all"}),l.createElement("path",{d:"M582.76 572.85c-105.5 109.95-271.45 135.87-405.44 63.31-134-72.56-202.99-225.7-168.57-374.13C43.18 113.59 172.54 6.45 324.79.28c152.25-6.17 289.86 90.14 336.19 235.3l-51.6 16.47C570.47 130.11 454.87 49.21 326.98 54.39 199.09 59.58 90.43 149.57 61.51 274.26 32.59 398.95 90.55 527.59 203.1 588.53c112.56 60.95 251.96 39.19 340.58-53.17Z",fill:`${n}`,pointerEvents:"all"}),l.createElement("path",{d:"M520.4 323.98c-21.7-6.3-41.84-17.05-59.15-31.59l33.39-39.74c11.76 9.88 25.46 17.2 40.22 21.48ZM687.375 465.924l-93.67 77.114L551.14 429.42Z",fill:`${r}`,pointerEvents:"all"}),l.createElement("path",{d:"m452.381 178 14.086 84.527-84.52-14.093Z",fill:`${t}`,pointerEvents:"all"}),l.createElement("path",{fill:"none",pointerEvents:"all",d:"M82 20h513v30H82z"}),l.createElement("switch",{transform:"translate(-.5 -.5)"},l.createElement("foreignObject",{pointerEvents:"none",width:"100%",height:"100%",requiredFeatures:"http://www.w3.org/TR/SVG11/feature#Extensibility",style:{overflow:"visible",textAlign:"left"}},l.createElement("div",{xmlns:"http://www.w3.org/1999/xhtml",style:{display:"flex",alignItems:"unsafe center",justifyContent:"unsafe center",width:511,height:1,paddingTop:35,marginLeft:83}},l.createElement("div",{"data-drawio-colors":"color: #FFFFFF;",style:{boxSizing:"border-box",fontSize:0,textAlign:"center"}},l.createElement("div",{style:{display:"inline-block",fontSize:49,fontFamily:"Helvetica",color:"#fff",lineHeight:1.2,pointerEvents:"all",whiteSpace:"normal",overflowWrap:"normal"}},"Outer Loop")))),l.createElement("text",{x:339,y:50,fill:"#FFF",fontFamily:"Helvetica",fontSize:49,textAnchor:"middle"},"Outer Loop")),l.createElement("path",{fill:"none",pointerEvents:"all",d:"M70 460h513v30H70z"}),l.createElement("switch",{transform:"translate(-.5 -.5)"},l.createElement("foreignObject",{pointerEvents:"none",width:"100%",height:"100%",requiredFeatures:"http://www.w3.org/TR/SVG11/feature#Extensibility",style:{overflow:"visible",textAlign:"left"}},l.createElement("div",{xmlns:"http://www.w3.org/1999/xhtml",style:{display:"flex",alignItems:"unsafe center",justifyContent:"unsafe center",width:511,height:1,paddingTop:475,marginLeft:71}},l.createElement("div",{"data-drawio-colors":"color: #FFF0F6;",style:{boxSizing:"border-box",fontSize:0,textAlign:"center"}},l.createElement("div",{style:{display:"inline-block",fontSize:49,fontFamily:"Helvetica",color:"#fff0f6",lineHeight:1.2,pointerEvents:"all",whiteSpace:"normal",overflowWrap:"normal"}},"Inner Loop")))),l.createElement("text",{x:327,y:490,fill:"#FFF0F6",fontFamily:"Helvetica",fontSize:49,textAnchor:"middle"},"Inner Loop")),l.createElement("image",{x:458.5,y:323.9,width:110,height:110,xlinkHref:"data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGNsYXNzPSJ3b3JrLWZsb3dfX2ljb24iIHZpZXdCb3g9IjAgMCA5NyA5NyI+PHBhdGggZD0iTTkyLjcxIDQ0LjQwOEw1Mi41OTEgNC4yOTFhNS45MTggNS45MTggMCAwMC04LjM2OSAwbC04LjMzIDguMzMyTDQ2LjQ1OSAyMy4xOWE3LjAyMiA3LjAyMiAwIDAxNy4yMjkgMS42ODUgNy4wMyA3LjAzIDAgMDExLjY3IDcuMjc1bDEwLjE4NiAxMC4xODVhNy4wMjggNy4wMjggMCAwMTcuMjc1IDEuNjcxIDcuMDQzIDcuMDQzIDAgMDEtOS45NjEgOS45NTggNy4wNDMgNy4wNDMgMCAwMS0xLjUzMS03LjY1OGwtOS41LTkuNDk5djI0Ljk5N2E3LjA0MiA3LjA0MiAwIDExLTguMDk2IDExLjI5MSA3LjA0MiA3LjA0MiAwIDAxMi4zMDctMTEuNDk2di0yNS4yM2E3LjA0MSA3LjA0MSAwIDAxLTMuODIzLTkuMjM1TDMxLjc5OCAxNi43MTUgNC4yODggNDQuMjIyYTUuOTIgNS45MiAwIDAwMCA4LjM3MWw0MC4xMjEgNDAuMTE4YTUuOTE4IDUuOTE4IDAgMDA4LjM2OSAwTDkyLjcxIDUyLjc3OWE1LjkyIDUuOTIgMCAwMDAtOC4zNzF6IiBmaWxsPSIjRjA1MTMzIi8+PC9zdmc+",preserveAspectRatio:"none"}))};t.default=()=>{}},70017:function(e,t,n){n.r(t),n.d(t,{SlideTemplate:function(){return o}});var l=n(67294),r=n(7065),i=n(17057);const o=e=>{let{className:t="",...n}=e;return l.createElement(r.Ri,Object.assign({className:i.CLASS_NAME,footerIcon:l.createElement(r.qn,{gray:"#FAFAFA",fruitColor:"#082941",style:{width:"8rem"}})},n))};t.default=()=>{}},20301:function(e,t,n){n.r(t),n.d(t,{TitleTemplate:function(){return o}});var l=n(67294),r=n(17057),i=n(7065);const o=e=>{let{...t}=e;return l.createElement(i.Nc,Object.assign({classNamePrefix:r.CLASS_NAME,logoContent:l.createElement(i.qn,{gray:"#FAFAFA",fruitColor:"#082941",style:{height:"60%"}})},t))};t.default=()=>{}},17057:function(e,t,n){n.r(t),n.d(t,{CLASS_NAME:function(){return c},SLUG:function(){return a}});var l=n(67294),r=n(64593),i=n(89728),o=n(20301);const a="2023-madridjug-jkube-remote-dev",c="madrid-jug-2023",s="Desarrollo local de aplicaciones Java en Kubernetes";t.default=(0,i.ZP)((()=>l.createElement("div",{className:c},l.createElement(r.q,null,l.createElement("title",null,s)),l.createElement(o.TitleTemplate,{title:s,subtitle:"Marc Nuri"}))),"/",`/presentations/${a}/slide-010`)},21372:function(e,t,n){n.r(t);var l=n(67294),r=n(89728),i=n(70017),o=n(27991),a=n(17057);t.default=(0,r.ZP)((()=>l.createElement(i.SlideTemplate,{slide:3,title:"Inner Loop vs. Outer Loop"},l.createElement("div",{className:"inner-outer-loop"},l.createElement("div",{className:"inner-outer-loop__content"},l.createElement("ul",null,l.createElement("li",null,"Inner Loop",l.createElement("ul",null,l.createElement("li",null,"Developer's cycle before application is shared"),l.createElement("li",null,"Feedback loop ",l.createElement("strong",null,"must")," be fast"))),l.createElement("li",null,"Outer Loop",l.createElement("ul",null,l.createElement("li",null,"After commit-push"),l.createElement("li",null,"CI/CD - ",l.createElement("strong",null,"must")," be automated"))),l.createElement("li",null,"Cloud/K8s very challenging"))),l.createElement("div",{className:"inner-outer-loop__diagram"},l.createElement(o.InnerOuterLoop,{innerLoopColor:"#2285f7",outerLoopColor:"#2285f7",pushCommitColor:"#f63440"}))))),`/presentations/${a.SLUG}/slide-020`,`/presentations/${a.SLUG}/slide-040`)}}]);
//# sourceMappingURL=component---src-pages-presentations-2023-madridjug-jkube-remote-dev-slide-030-jsx-42597f318fda3a639c4d.js.map