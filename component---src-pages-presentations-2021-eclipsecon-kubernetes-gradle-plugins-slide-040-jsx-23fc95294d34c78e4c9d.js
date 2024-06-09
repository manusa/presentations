"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[2856,706],{89728:function(e,n,t){t.d(n,{Z5:function(){return c},g6:function(){return i},y$:function(){return s}});var a=t(51721),l=t(67294),r=t(14160);const c=e=>n=>e<n?"hidden":"visible",s=e=>n=>e!==n?"hidden":"visible",i=e=>n=>e>n?"hidden":"visible";n.ZP=function(e,n,t,c){return void 0===c&&(c=1),function(s){function i(e){var n;return(n=s.call(this,e)||this).state={currentStep:1},n.handleOnKeyDown=n.onKeyDown.bind(n),n}(0,a.Z)(i,s);var o=i.prototype;return o.render=function(){return l.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},o.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},o.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},o.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,r.c4)(n);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,r.c4)(t);break;case"Esc":case"Escape":(0,r.c4)("/")}},i}(l.Component)}},37725:function(e,n,t){t.r(n);var a=t(67294),l=t(21443),r=t(70446);const c=function(e){return void 0===e&&(e=""),"eclipsecon-2021-slide"+(e?`__${e}`:"")};n.default=e=>{let{slide:n=0,title:t="",children:s}=e;return a.createElement("div",{className:c()},a.createElement("div",{className:c("header")},a.createElement("div",{className:"title"},t),a.createElement(l.oH,{className:"jkube-logo"})),a.createElement("div",{className:c("content")},s),a.createElement("div",{className:c("footer")},a.createElement("img",{src:r.Z,alt:"An image of the EclipseCon logo"}),a.createElement("div",{className:"page-number"},n)))}},59097:function(e,n,t){t.r(n);var a=t(67294),l=t(89728),r=t(37725),c=t(21443);n.default=(0,l.ZP)((e=>{let{currentStep:n}=e;const t=(0,l.y$)(n);return a.createElement(r.default,{slide:4,title:"Deploying applications to Kubernetes - Challenges"},a.createElement("div",{className:"kubernetes-challenges"},a.createElement("div",{className:`challenge-docker ${t(2)}`},a.createElement("h2",null,"Dockerfile"),a.createElement(c.EK,{language:"dockerfile"},'\n            FROM openjdk:17-jdk-alpine\n            EXPOSE 8080\n            ARG JAR_FILE=target/*.jar\n            USER 1000:1000\n            COPY ${JAR_FILE} /deployments/app.jar\n            ENV JAVA_OPTIONS="-Xmx2G"\n            ENTRYPOINT ["java","-jar","/deployments/app.jar"]\n          '),a.createElement(c.EK,{language:"shell"},"\n            $ mvn package\n            $ docker build -t user/app:tag ./\n            $ docker login\n            $ docker push user/app:tag\n          ")),a.createElement("div",{className:`challenge-kubernetes ${t(3)}`},a.createElement("h2",null,"YAML files"),a.createElement("div",{className:"yaml-files"},a.createElement(c.EK,{language:"yaml"},"\n              kind: Deployment\n              metadata:\n                name: app\n              spec:\n                replicas: 1\n                selector:\n              # ...\n          "),a.createElement(c.EK,{language:"yaml"},"\n              kind: Service\n              metadata:\n                name: app\n              spec:\n                ports:\n              # ...\n          "),a.createElement(c.EK,{language:"yaml"},"\n              kind: ConfigMap\n              metadata:\n                name: app\n              data:\n               application.yml: >-\n              # ...\n          ")),a.createElement(c.EK,{language:"shell"},"\n            $ kubectl apply -f ./your-yaml.yml\n          ")),a.createElement("div",{className:`challenge-jkube ${t(4)}`},a.createElement(c.oH,{className:"jkube-logo"}))))}),"/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-030","/presentations/2021-eclipsecon-kubernetes-gradle-plugins/slide-050",4)},70446:function(e,n,t){n.Z=t.p+"static/eclipsecon-white-7d6a164bf0362af837ea4fb021e08b02.png"}}]);
//# sourceMappingURL=component---src-pages-presentations-2021-eclipsecon-kubernetes-gradle-plugins-slide-040-jsx-23fc95294d34c78e4c9d.js.map