(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{147:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(166),c=n(163),u=(n(198),"MockMVC in Action!");t.default=Object(c.a)(function(){return a.a.createElement("div",{className:"mock-mvc-in-action"},a.a.createElement(i.Helmet,null,a.a.createElement("title",null,u)),a.a.createElement("div",null,a.a.createElement("h1",{className:"title"},u),a.a.createElement("h2",{className:"subtitle"},"Marc Nuri")))},"/","/presentations/mock-mvc-in-action/slide1")},160:function(e,t,n){var r;e.exports=(r=n(162))&&r.default||r},161:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return h}),n.d(t,"StaticQueryContext",function(){return f}),n.d(t,"StaticQuery",function(){return p});var r=n(0),a=n.n(r),i=n(4),c=n.n(i),u=n(159),o=n.n(u);n.d(t,"Link",function(){return o.a}),n.d(t,"withPrefix",function(){return u.withPrefix}),n.d(t,"navigate",function(){return u.navigate}),n.d(t,"push",function(){return u.push}),n.d(t,"replace",function(){return u.replace}),n.d(t,"navigateTo",function(){return u.navigateTo});var s=n(160),l=n.n(s);n.d(t,"PageRenderer",function(){return l.a});var d=n(33);n.d(t,"parsePath",function(){return d.a});var f=a.a.createContext({}),p=function(e){return a.a.createElement(f.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):a.a.createElement("div",null,"Loading (StaticQuery)")})};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}p.propTypes={data:c.a.object,query:c.a.string.isRequired,render:c.a.func,children:c.a.func}},162:function(e,t,n){"use strict";n.r(t);n(32);var r=n(0),a=n.n(r),i=n(4),c=n.n(i),u=n(52),o=n(2),s=function(e){var t=e.location,n=o.default.getResourcesForPathnameSync(t.pathname);return a.a.createElement(u.a,Object.assign({location:t,pageResources:n},n.json))};s.propTypes={location:c.a.shape({pathname:c.a.string.isRequired}).isRequired},t.default=s},163:function(e,t,n){"use strict";n.d(t,"b",function(){return l}),n.d(t,"c",function(){return d});n(32);var r=n(7),a=n.n(r),i=n(51),c=n.n(i),u=n(0),o=n.n(u),s=n(161),l=function(e){return function(t){return e<t?"hidden":"visible"}},d=function(e){return function(t){return e!==t?"hidden":"visible"}};t.a=function(e,t,n,r){return void 0===r&&(r=1),function(i){function u(e){var t;return(t=i.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(c()(c()(t))),t}a()(u,i);var l=u.prototype;return l.render=function(){return o.a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):Object(s.navigate)(t);break;case"Right":case"ArrowRight":this.state.currentStep<r?this.setState({currentStep:this.state.currentStep+1}):Object(s.navigate)(n);break;case"Esc":case"Escape":Object(s.navigate)("/")}},u}(o.a.Component)}},198:function(e,t,n){}}]);
//# sourceMappingURL=component---src-pages-presentations-mock-mvc-in-action-index-jsx-2df1f12eab8dda1ec2eb.js.map