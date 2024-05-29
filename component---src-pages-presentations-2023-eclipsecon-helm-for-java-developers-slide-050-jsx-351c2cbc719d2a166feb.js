"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[5486],{89728:function(e,n,t){t.d(n,{Z5:function(){return i},g6:function(){return o},y$:function(){return c}});var r=t(51721),a=t(67294),s=t(14160);const i=e=>n=>e<n?"hidden":"visible",c=e=>n=>e!==n?"hidden":"visible",o=e=>n=>e>n?"hidden":"visible";n.ZP=function(e,n,t,i){return void 0===i&&(i=1),function(c){function o(e){var n;return(n=c.call(this,e)||this).state={currentStep:1},n.handleOnKeyDown=n.onKeyDown.bind(n),n}(0,r.Z)(o,c);var u=o.prototype;return u.render=function(){return a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},u.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},u.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},u.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,s.c4)(n);break;case"Right":case"ArrowRight":this.state.currentStep<i?this.setState({currentStep:this.state.currentStep+1}):(0,s.c4)(t);break;case"Esc":case"Escape":(0,s.c4)("/")}},o}(a.Component)}},10294:function(e,n,t){t.r(n);var r=t(67294),a=t(89728),s=t(54068);n.default=(0,a.ZP)((()=>r.createElement(s.h6._i,{slide:5,title:"Deploying Java applications to Kubernetes - Challenges"},r.createElement("h2",null,"Dockerfile"),r.createElement(s.EK,{language:"dockerfile"},'\n        FROM openjdk:8-jdk-alpine\n        EXPOSE 8080\n        ARG JAR_FILE=target/*.jar\n        USER 1000:1000\n        COPY ${JAR_FILE} /deployments/app.jar\n        ENV JAVA_OPTIONS="-XX:MaxRAMPercentage=80"\n        ENTRYPOINT ["java","-jar","/deployments/app.jar"]\n      '),r.createElement(s.EK,{language:"shell"},"\n        $ mvn package\n        $ docker build -t user/app:tag ./\n        $ docker login\n        $ docker push user/app:tag\n      "))),`/presentations/${s.h6.Ts}/slide-040`,`/presentations/${s.h6.Ts}/slide-060`)}}]);
//# sourceMappingURL=component---src-pages-presentations-2023-eclipsecon-helm-for-java-developers-slide-050-jsx-351c2cbc719d2a166feb.js.map