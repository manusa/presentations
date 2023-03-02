"use strict";(self.webpackChunk_marcnuri_presentations=self.webpackChunk_marcnuri_presentations||[]).push([[9122],{89728:function(e,t,A){A.d(t,{Z5:function(){return c},g6:function(){return o},y$:function(){return s}});var n=A(97326),i=A(94578),r=A(67294),a=A(84854);const c=e=>t=>e<t?"hidden":"visible",s=e=>t=>e!==t?"hidden":"visible",o=e=>t=>e>t?"hidden":"visible";t.ZP=function(e,t,A,c){return void 0===c&&(c=1),function(s){function o(e){var t;return(t=s.call(this,e)||this).state={currentStep:1},t.handleOnKeyDown=t.onKeyDown.bind((0,n.Z)(t)),t}(0,i.Z)(o,s);var l=o.prototype;return l.render=function(){return r.createElement(e,Object.assign({},this.props,{currentStep:this.state.currentStep}))},l.componentDidMount=function(){document.addEventListener("keydown",this.handleOnKeyDown,!1)},l.componentWillUnmount=function(){document.removeEventListener("keydown",this.handleOnKeyDown,!1)},l.onKeyDown=function(e){switch(e.key){case"Left":case"ArrowLeft":this.state.currentStep>1?this.setState({currentStep:this.state.currentStep-1}):(0,a.c4)(t);break;case"Right":case"ArrowRight":this.state.currentStep<c?this.setState({currentStep:this.state.currentStep+1}):(0,a.c4)(A);break;case"Esc":case"Escape":(0,a.c4)("/")}},o}(r.Component)}},5279:function(e,t,A){A.r(t),A.d(t,{default:function(){return r}});var n=A(67294),i=A(89728);var r=(0,i.ZP)((()=>n.createElement("div",{className:"slide slide-summary"},n.createElement("div",{className:"content"},n.createElement("div",{className:"col links"},n.createElement("div",{className:"thank-you"},"Thank you!"),n.createElement("a",{className:"github",href:"https://github.com/manusa/isotope-mail"},n.createElement("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAABmJLR0QA/wD/AP+gvaeTAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAB3RJTUUH4wIHDAIbClr6XwAABqxJREFUeNrVWltonEUU/ubfS7pxqynVGKKNpWAsXlpbahUvVasoWC8tovZJVBTFC0UUfLJiH7SIl3qBgqIiiKKC4KWINAilYowEGytNa01tk2wuGpJNk91/d2fmnPFlN92mye4/e8u/5y3Zf+ac8825zwBVptHR0TP+l0wmm6SUK4joUiK6VEq5IplMLpn93djYGOqaent7A0R0JzO/wcz7mXnSFCFmPsnMPzPzm0R09/DwcKgulM1kMgCAeDy+iJm3MfPvpkLEzD3M/GwikWjM5+ULklICAJRSq5j5G1NlYubvlVJr8nkvCCWTyZziK5n5F1NjYubflFKXA4DrurUHYGRkJMDMn5kFJmb+cmJiojZxIh6PAwC01rcbY5TxD5HWehMATE1NVdfXiWi38SkR0YdViQ1KKXR2dopKRvYqusTBWCwWUEp50k14UT6dTkei0WgfgNY6KUH+y2QyKwKBQDIUCpUOgFIKSqlFkUhkEMC5dVSDGWPMyVQqdUE4HHYLgeAUKmxCoRAikcjROlMeAIQQ4pzGxsa+jo4OYV04HThwAACwEPm9CjGhO5u27UAgoleL7e0nPYtkh7dsnAda6/VeuObFilXM/BIzj9XgRCeIaIfW+sp8hy9GWuvr80Sem4aHh3MbnvQgyP55LGcTM/dXQfEYEd0zF09m7vCwRSK/mMtRMP+P1tZWENHrAM72YCl754yqjrNHCHERET3qOM4Hed8fAtAD4G9jzCCAcWOMm41YEQDnCiEuBHAxgNVCiCvyFHwyEAjsLnCCewHcUkTks5j5XcdxnpnzV9d1kU6nl1pUXVs8tMiLtdbXlBrKtdZXZTKZJg/x6g6vckspW1Kp1NwbMfPnFiZ5nV9yntZ6ncXBfX1GHTA6OopUKrVECLHVIlgGfJT3PcviOM6WdDp9/uTk5CkAWlpa0NDQ8KIl02WzA8pC0MjICIQQy2zWhMPh7U1NTWecqLKMyu/55fiZ+XXbrDJjEa7rQmt9++yM4IFu8pELWMtCRPek0+kZBD+1RVAp1eK15awmZbvVpSXUFV/lm5BrOXh4ym/dDxE9YgmAzuXqNsuFvr2tYOaYjS5SynYnGAzeaMlnh4+HAC9b5c5AYIMjhFhrs8h13Y/9CsD4+PgnlkODtQ6ASywQ/jcajSb8CkBzc7M0xvRbLGl3ALRZLPijDqZBBy2+bXOEEM0WC/6tAwBsZGx2ACy26TvqAABtEQPOdowxiyw2b6wDACI2cdABwBYLltYBAFYTbAdAyuL75XUAgI2MSjDzgE07KYQQftaemY1XEY0x/zkAhm0YSCkv8avymUxmueX5DDsAjtusCAaDm/0KQCgUspXtuGOM6bVc9ISPPeBxy+97HWPMr5b183Kt9bVFLxlqSFJKKKXWCiFWWjZPXTh8+HCghGHCUR8Gvz9t9YjH45Hc4sMlvMbY7qNhyAslHOI/+Ru8XOKTlHt9oPxdJV617cz3obZS7+yI6LmcH9bS57PKbytVbill+7Fjx07zoUNlXFz+KqVcls3FVVM8N8WVUi5j5s4y5P1nLlN6cJ6P9xHRbUR0HzN/UWTjPVrrW6po7rcx8w8VeE322ExWm5UW3Dm6qb+EECuNMRBCQErZFgqFurNNhyiQYn4EsI+Zu5n5iJRyKBqNemq8EolEoKGhYYXjOO1CiHUANgghNlYIRyWECM+XSp6e725da70eALTWmJiYCBtjJi1M7qcS0lrZJz2PLM8XYzxe4JXFtdnThVJqlVee2WGqzeA1Z0WVfo06Vawygtb61kI7TE9PR3ICEtEuD4i/XUZxs7OS2mut7/RUwTLztwUU+gw49dSk2INprfXGUm6R+/r6PL9V8mj6ez0xTqVSiMViAWPMvNdlruueMzQ0NPNkXmu9iZm7ZzE8wswvJRKJYKkWEIvFwhXSX8bj8fDMZaiHJgFKqdUF0Nw1+/sc9fT0VPTpeoVMf31JzRsRPVxg06trNeEpM+c/WW7x8UoBEB6YbQF+AoCIdpXFvLOzMwfCOwXc4U8iejCVSp2Xv/bEiRPhXNpcCACI6H0A6O/vL0+AgYEBq46RmU2+0AsBABG9BgDT09MVr8W3lvoWp1YAENFDADA4OFgdn1RKXWyMmfAhAFNKqcuqHpVzOjHzR34BgJk/rXYwPo1yvqWUWs3MRxcKAGY+rpRal+0gaz+OyulHRJuZ+XitAMi+HL+/pqfuBQil1A3M/F2eoIcqAMDvefv9oLW+2TeKzzey6urqcrTWa7KglBNwcxa2ZnBwMFiNkdv/gWmvnWrwAdQAAAAASUVORK5CYII="}),"github.com/manusa/isotope-mail"),n.createElement("a",{className:"twitter",href:"https://twitter.com/MarcNuri"},n.createElement("img",{src:"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAYAAACqaXHeAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAEt0lEQVR4nO2ba4hVVRSAvz3IMIhEiEjIFCaDzA+RFJEeg4iFRfRHCAShsKyI6EFGBWGCCAXZAyEK8pFk/QopsYQECaPSiizpQWJmWImUTmElas18/dhn7HbnnnPPvXPPmVvdDy6Xmb3P3mutsx9r77UudOjQoUOH/y9hvAXIQp0IXA9cC8wGLgS6gDPAj8DnwHbgnRDCn+MlZ8tRJ6lr1JPm44h6lzohR9uT1VVqX1qF2gUloS5Sv8upeDWfqP0p7far69Vf1b1pnU9NKiwvUsk0krf4R5PKj/Czujhpb4Z6t/peVZ2FaQI8lFQYUm8tWfk7k35bwZDp02drlhB7qxq5oyTlBxz7m8/DR+qkNCF61LNVDwypKwtWvkc9WILyB9QpFf32qcsqBenPePgpc6ywTRrg3hKU3632qgvUterHxhG3qFKQK+s08qY6ucXKd6mHC1R8hCOOHt0rq4UZyNnQghYaoJ7Ri2LdiAxdFfL8kkPm6cDbxv30ghbYYGEL2miUZ4GHR/1XnWhj29AP6m2OYW1QN7T83WbzeD2BDjTR6EF1udrThAFebal66fyu3lxLhq6qv99oVAlgJvAicNjov1/SwLMNG61JdoUQXqpVUG2ATcBwk51MA1YTDbHHuL31qdV9VHKuyb4a5XRawT+ECyF8A7w8xs4mAAuA9cAh4JC6NTHIQuN+3J3UPT7GvvLyW1rBqPsA9SLgADC1QIFOA4NAd8H9jPB0COGBWgWjhmcI4ThwE8UOz4lAL+UoD3AyreC8AdS56nyAEMIu4BbKm6NFkzrVKkdAP/CB8cS0CjgGrABOFSxcGRxNK6h0Yo4l3/OSzwjN7grtxNdpBZUj4Kscdf6NnAK+Tys8r1yy+H1ahkQlsz/rxrj67W4oWJjx4N2swmoDbOHvteC/wu6swmpP8DTwaKHilMsg8H5WhVoL3BZgVxHSjAM7QwiZvkwtT3AYWArsL0qqEnmlXoXU2KDx/m8b43Nr0wqOAxfXixmm7vEhhEFiUPIx/p0u8cY8AdNc0WFjvO1+YBlQO7DQXpwDLg0h1N3RMg2gziW6y8PJdy9wD/G8385sDCHcnqdivQvNG4A1Y5enVM4B2ZefFdTz818g4zalTXkuudnKRaYBkvPBuqw6bcYJYG0jD+Q56T0BfNiUOOVzX7J75SbvLtAL7AFmNCNVSbweQljS6EO5k6TU6cAOYFajnZTAUWBOo28fGrjsCCF8C1wFbKa9bonOAEubUb5p1Pnqa5aT1ZHFkJVJDk0wpjxBYwxhMXAFcWpcRrme4oMhhCdL7K82arcx86I6CaFI2sNBMyZWfFai4qqPjLfeqLOM4e1Wpbbl4awlp+9VK92j3qi+VbLiGhMyWn4Iq3canECMGA0AVxMXvFakxjTKTmBF4pq3lKAOEI+4IyfDbmLwcgrR8xvP8/8gMZ9nc3JVVwzqbHVHyUM6i7Pq82pZ0ePzhpinbrP8+V2p+CZ1ZqmK1zBEn/qM+lNJih9RV6vTyta13iLYDVwDLAGuI16JtYJh4Evi4rYd2FfoHM+gIVfY+GOKy4E5xN1hBjE5Km1nGCYuZEeJIeoviPGGfSGEE03K3KFDhw4dOrSIvwCPQ6qZnKB1LgAAAABJRU5ErkJggg=="}),"@MarcNuri"),n.createElement("a",{className:"blog",href:"https://blog.marcnuri.com"},"blog.marcnuri.com")),n.createElement("div",{className:"col isotope-logo"})))),"/presentations/isotope-introduction/slide-q-and-a","/")}}]);
//# sourceMappingURL=component---src-pages-presentations-isotope-introduction-summary-jsx-ffb83e7989fecb8df604.js.map