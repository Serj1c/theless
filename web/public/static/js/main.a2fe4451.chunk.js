(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{11:function(e,t,n){e.exports={root:"Page_root__3n_Ww",header:"Page_header__2EKTI",footer:"Page_footer__22yAY",content:"Page_content__3Dseh",content_center:"Page_content_center__1DEdk"}},16:function(e,t,n){e.exports={logo:"Home_logo__1bux9",footer:"Home_footer__3SIY9"}},17:function(e,t,n){e.exports={root:"Link_root__20wTd"}},18:function(e,t,n){e.exports={paragraph:"About_paragraph__IsDpb",footer:"About_footer__3fRoG"}},21:function(e,t,n){e.exports=n.p+"static/media/logo.svg"},26:function(e,t,n){e.exports=n(42)},40:function(e,t,n){},42:function(e,t,n){"use strict";n.r(t);var a=n(0),o=n.n(a),r=n(20),c=n.n(r),l=n(6),i=n(7),s=n(9),u=n(8),p=n(10),m=n(45),_=n(47),d=n(44),f=n(21),h=n.n(f),E=n(16),v=n.n(E),b=n(43),k=n(17),g=n.n(k),j=function(e){return e.to?o.a.createElement(b.a,Object.assign({},e,{to:e.to,className:g.a.root})):o.a.createElement("a",Object.assign({},e,{className:g.a.root}))},y=n(22),O=n(23),w=n.n(O),C=n(11),N=n.n(C),I=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).handelResize=function(){var e=.01*window.innerHeight;document.documentElement.style.setProperty("--vh","".concat(e,"px"))},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){window.addEventListener("resize",this.handelResize),this.handelResize()}},{key:"componentWillUnmount",value:function(){window.removeEventListener("resize",this.handelResize)}},{key:"render",value:function(){var e=this.props,t=e.header,n=e.footer,a=e.center,r=e.children,c=w()(N.a.content,Object(y.a)({},N.a.content_center,a));return o.a.createElement("div",{className:N.a.root},t&&o.a.createElement("div",{className:N.a.header},t),o.a.createElement("div",{className:c},r),n&&o.a.createElement("div",{className:N.a.footer},n))}}]),t}(o.a.Component),x=function(){return o.a.createElement(I,{center:!0,footer:o.a.createElement("div",{className:v.a.footer},o.a.createElement(j,{to:"/about"},"\u041e \u043f\u0440\u043e\u0435\u043a\u0442\u0435"))},o.a.createElement("img",{className:v.a.logo,src:h.a,alt:"Less"}))},A=n(5),B=n.n(A),P=function(e){function t(){var e,n;Object(l.a)(this,t);for(var a=arguments.length,o=new Array(a),r=0;r<a;r++)o[r]=arguments[r];return(n=Object(s.a)(this,(e=Object(u.a)(t)).call.apply(e,[this].concat(o)))).handleIconClick=function(){n.props.onIconClick&&n.props.onIconClick()},n}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement("div",{className:B.a.root},this.renderIcon(),this.renderContent(),this.renderControls())}},{key:"renderIcon",value:function(){var e=this.props.icon,t=B.a.icon+" "+B.a["icon_".concat(e)];return o.a.createElement("div",{className:B.a["icon-wrapper"]},o.a.createElement("button",{className:t,type:"button",onClick:this.handleIconClick}))}},{key:"renderContent",value:function(){var e=this.props,t=e.children,n=e.title;return n||t?o.a.createElement("div",{className:B.a.title},n?o.a.createElement("div",null,n):t):null}},{key:"renderControls",value:function(){var e=this.props.controls;return e?o.a.createElement("ul",{className:B.a.controls},e.map(function(e,t){return o.a.createElement("li",{className:B.a.control,key:t},e)})):null}}]),t}(o.a.PureComponent);P.defaultProps={icon:"back"};var z=n(18),R=n.n(z),D=n(46),K=Object(D.a)(function(e){var t=e.history;return o.a.createElement(I,{center:!0,header:o.a.createElement(P,{onIconClick:function(){1===t.length?t.replace("/"):t.goBack()}},"\u041e \u043f\u0440\u043e\u0435\u043a\u0442\u0435"),footer:o.a.createElement("div",{className:R.a.footer},o.a.createElement(j,{href:"mailto:info@theless.ru"},"info@theless.ru"))},o.a.createElement("p",{className:R.a.paragraph},"\u041f\u0440\u043e\u0435\u043a\u0442 \u043e\u0431\xa0\u044d\u043a\u0441\u0442\u0440\u0435\u043c\u0430\u043b\u044c\u043d\u044b\u0435 \u0432\u0438\u0434\u0430\u0445 \u0441\u043f\u043e\u0440\u0442\u0430"))}),L=Object(D.a)(function(e){var t=e.history;return o.a.createElement(I,{center:!0,header:o.a.createElement(P,{onIconClick:function(){1===t.length?t.replace("/"):t.goBack()}})},"404")}),Y=function(e){function t(){return Object(l.a)(this,t),Object(s.a)(this,Object(u.a)(t).apply(this,arguments))}return Object(p.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return o.a.createElement(m.a,null,o.a.createElement(_.a,null,o.a.createElement(d.a,{exact:!0,path:"/",component:x}),o.a.createElement(d.a,{exact:!0,path:"/about",component:K}),o.a.createElement(d.a,{component:L})))}}]),t}(o.a.PureComponent);n(40);c.a.render(o.a.createElement(Y,null),document.getElementById("root"))},5:function(e,t,n){e.exports={root:"AppBar_root__1Y9KY","icon-wrapper":"AppBar_icon-wrapper__1kjpx",icon:"AppBar_icon__30a7l",icon_back:"AppBar_icon_back__R5nE7",icon_close:"AppBar_icon_close__1zmKd",title:"AppBar_title__3KCqI",controls:"AppBar_controls__2CukI",control:"AppBar_control__16xag"}}},[[26,2,1]]]);
//# sourceMappingURL=main.a2fe4451.chunk.js.map