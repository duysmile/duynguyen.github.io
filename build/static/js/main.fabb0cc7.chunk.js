(window["webpackJsonpreact-competition"]=window["webpackJsonpreact-competition"]||[]).push([[0],{36:function(e,t,a){e.exports=a(68)},42:function(e,t,a){},43:function(e,t,a){},66:function(e,t,a){},67:function(e,t,a){},68:function(e,t,a){"use strict";a.r(t);var n=a(0),c=a.n(n),o=a(33),r=a.n(o),i=(a(41),a(42),a(8)),l=a(6);a(43);var s=function(){return c.a.createElement("div",{className:"custom-container custom-container__bg-dark custom-container__flex-box"},c.a.createElement("div",{className:"avatar"},c.a.createElement("div",{className:"text--hover"},c.a.createElement(i.b,{className:"text-item--hover",to:"/blog"},"My Blog"))),c.a.createElement("div",{className:"text"},"I'm Duy Nguyen",c.a.createElement("br",null),c.a.createElement("small",{className:"text-description"},"developer")))},u=a(9),m=a.n(u),p=a(11),v=a(12),g=a(13),b=a(16),h=a(14),d=a(17),f=a(15),E=a.n(f),k=(a(66),function(e){function t(e){var a;return Object(v.a)(this,t),(a=Object(b.a)(this,Object(h.a)(t).call(this,e))).state={blogs:[]},a}return Object(d.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){var e=Object(p.a)(m.a.mark((function e(){var t,a;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,this.getListBlog(1,10);case 3:t=e.sent,console.log(t),a=t.data.map((function(e){var t=e.name.split(".");return{name:t[0].split("_").join(" "),time:t[1].replace(/_/g,"-")||"",tags:t[2]&&t[2].split("_").join(", ")||"",id:e.sha}})),this.setState({blogs:a}),e.next=12;break;case 9:e.prev=9,e.t0=e.catch(0),console.error("ERROR",e.t0);case 12:case"end":return e.stop()}}),e,this,[[0,9]])})));return function(){return e.apply(this,arguments)}}()},{key:"getListBlog",value:function(e,t){var a="".concat("https://api.github.com","/repos/orangetwentyfour/duynguyen.github.io/contents/blogs?page=").concat(e,"&per_page=").concat(t);return E.a.get(a)}},{key:"render",value:function(){var e=this.state.blogs.map((function(e,t){return c.a.createElement("div",{className:"item-blog",key:t},c.a.createElement("div",null,c.a.createElement("span",{className:"time"},e.time),c.a.createElement("span",{className:"tag"},e.tags)),c.a.createElement("div",{className:"title-article"},c.a.createElement(i.b,{className:"link-article",to:"/blog/".concat(e.id)},e.name)))}));return c.a.createElement("div",{className:"custom-container custom-container__bg-raisin-black"},c.a.createElement("div",{className:"box-blog"},c.a.createElement("div",{className:"about-me color-black-coral"},c.a.createElement("div",{className:"logo"}),c.a.createElement("h1",{className:"title"},"Torf Blog"),c.a.createElement("div",{className:"author"},"By Duy Nguyen"),c.a.createElement("div",{className:"description"},"N\u01a1i m\xecnh chia s\u1ebb v\xe0i \u0111i\u1ec1u nho nh\u1ecf v\u1ec1 l\u1eadp tr\xecnh v\xe0 cu\u1ed9c s\u1ed1ng.")),c.a.createElement("div",{className:"list-blog"},e)))}}]),t}(c.a.Component)),y=a(18),N=a.n(y);a(67);N.a.setOptions({breaks:!0});var w=new N.a.Renderer;w.link=function(e,t,a){return'<a id="tribute-link" href='.concat(e," title=").concat(t,'" target="_blank">').concat(a,"</a>")};var x=function(e){function t(e){var a;return Object(v.a)(this,t),(a=Object(b.a)(this,Object(h.a)(t).call(this,e))).state={content:""},a}return Object(d.a)(t,e),Object(g.a)(t,[{key:"componentDidMount",value:function(){var e=Object(p.a)(m.a.mark((function e(){var t,a,n;return m.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,t=this.props.match.params.id,e.next=4,this.getBlogContent(t);case 4:a=e.sent,n=atob(a.data.content),console.log(n),this.setState({content:n}),e.next=13;break;case 10:e.prev=10,e.t0=e.catch(0),console.log("ERROR",e.t0);case 13:case"end":return e.stop()}}),e,this,[[0,10]])})));return function(){return e.apply(this,arguments)}}()},{key:"getBlogContent",value:function(e){var t="".concat("https://api.github.com","/repos/orangetwentyfour/duynguyen.github.io/git/blobs/").concat(e);return E.a.get(t)}},{key:"render",value:function(){var e=N()(this.state.content,w);return c.a.createElement("div",{className:"custom-container custom-container__bg-raisin-black blog-content color-black-coral"},c.a.createElement("div",{className:"box-content",dangerouslySetInnerHTML:{__html:e}}))}}]),t}(c.a.Component);function O(){return c.a.createElement("h2",null,"About")}var _=function(){return c.a.createElement(i.a,null,c.a.createElement("div",null,c.a.createElement(l.a,{path:"/",exact:!0,component:s}),c.a.createElement(l.a,{path:"/about",component:O}),c.a.createElement(l.a,{exact:!0,path:"/blog",component:k}),c.a.createElement(l.a,{path:"/blog/:id",component:x})))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));r.a.render(c.a.createElement(_,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[36,1,2]]]);
//# sourceMappingURL=main.fabb0cc7.chunk.js.map