(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{138:function(e,t,n){"use strict";n.r(t);var r=n(0),a=n.n(r),i=n(166),u=n(163),o=(n(179),"Isotope Mail Introduction");t.default=Object(u.a)(function(){return a.a.createElement("div",{className:"isotope-introduction"},a.a.createElement(i.Helmet,null,a.a.createElement("title",null,o)),a.a.createElement("div",null,a.a.createElement("h1",{className:"title"},o),a.a.createElement("h2",{className:"subtitle"},"Marc Nuri")))},"/","/presentations/isotope-introduction/slide1")},160:function(e,t,n){var r;e.exports=(r=n(162))&&r.default||r},161:function(e,t,n){"use strict";n.r(t),n.d(t,"graphql",function(){return h}),n.d(t,"StaticQueryContext",function(){return p}),n.d(t,"StaticQuery",function(){return f});var r=n(0),a=n.n(r),i=n(4),u=n.n(i),o=n(159),c=n.n(o);n.d(t,"Link",function(){return c.a}),n.d(t,"withPrefix",function(){return o.withPrefix}),n.d(t,"navigate",function(){return o.navigate}),n.d(t,"push",function(){return o.push}),n.d(t,"replace",function(){return o.replace}),n.d(t,"navigateTo",function(){return o.navigateTo});var s=n(160),d=n.n(s);n.d(t,"PageRenderer",function(){return d.a});var l=n(33);n.d(t,"parsePath",function(){return l.a});var p=a.a.createContext({}),f=function(e){return a.a.createElement(p.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):a.a.createElement("div",null,"Loading (StaticQuery)")})};function h(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}f.propTypes={data:u.a.object,query:u.a.string.isRequired,render:u.a.func,children:u.a.func}},162:function(e,t,n){"use strict";n.r(t);n(32);var r=n(0),a=n.n(r),i=n(4),u=n.n(i),o=n(52),c=n(2),s=function(e){var t=e.location,n=c.default.getResourcesForPathnameSync(t.pathname);return a.a.createElement(o.a,Object.assign({location:t,pageResources:n},n.json))};s.propTypes={location:u.a.shape({pathname:u.a.string.isRequired}).isRequired},t.default=s},163:function(e,t,n){"use strict";n.d(t,"b",function(){return d}),n.d(t,"c",function(){return l});n(32);var r=n(7),a=n.n(r),i=n(51),u=n.n(i),o=n(0),c=n.n(o),s=n(161),d=function(e){return function(t){return e<t?"hidden":"visible"}},l=function(e){return function(t){return e!==t?"hidden":"visible"}};t.a=function(e,t,n,r){return void 0===r&&(r=1),function(i){function o(e){var t;return(t=i.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind(u()(u()(t))),t}a()(o,i);var d=o.prototype;return d.render=function(){return c.a.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},d.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},d.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},d.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):Object(s.navigate)(t);break;case"Right":case"ArrowRight":this.state.currentStep<r?this.setState({currentStep:this.state.currentStep+1}):Object(s.navigate)(n);break;case"Esc":case"Escape":Object(s.navigate)("/")}},o}(c.a.Component)}},179:function(e,t,n){}}]);
//# sourceMappingURL=component---src-pages-presentations-isotope-introduction-index-jsx-f8fc583ae2e217990427.js.map