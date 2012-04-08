window.Modernizr=function(ah,ag,af){function G(b){Z.cssText=b}function F(d,c){return G(prefixes.join(d+";")+(c||""))}function E(d,c){return typeof d===c}function S(d,c){return !!~(""+d).indexOf(c)}function Q(g,c,j){for(var i in g){var h=c[g[i]];if(h!==af){return j===!1?g[i]:E(h,"function")?h.bind(j||c):h}}return !1}function O(){ad.input=function(f){for(var b=0,a=f.length;b<a;b++){T[f[b]]=f[b] in Y}return T.list&&(T.list=!!ag.createElement("datalist")&&!!ah.HTMLDataListElement),T}("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")),ad.inputtypes=function(b){for(var l=0,k,j,f,c=b.length;l<c;l++){Y.setAttribute("type",j=b[l]),k=Y.type!=="text",k&&(Y.value=X,Y.style.cssText="position:absolute;visibility:hidden;",/^range$/.test(j)&&Y.style.WebkitAppearance!==af?(ac.appendChild(Y),f=ag.defaultView,k=f.getComputedStyle&&f.getComputedStyle(Y,null).WebkitAppearance!=="textfield"&&Y.offsetHeight!==0,ac.removeChild(Y)):/^(search|tel)$/.test(j)||(/^(url|email)$/.test(j)?k=Y.checkValidity&&Y.checkValidity()===!1:/^color$/.test(j)?(ac.appendChild(Y),ac.offsetWidth,k=Y.value!=X,ac.removeChild(Y)):k=Y.value!=X)),U[b[l]]=!!k}return U}("search tel url email datetime date month week time datetime-local number range color".split(" "))}var ae="2.5.3",ad={},ac=ag.documentElement,ab="modernizr",aa=ag.createElement(ab),Z=aa.style,Y=ag.createElement("input"),X=":)",W={}.toString,V={},U={},T={},R=[],P=R.slice,N,M=function(t,s,r,q){var p,o,n,g=ag.createElement("div"),f=ag.body,b=f?f:ag.createElement("body");if(parseInt(r,10)){while(r--){n=ag.createElement("div"),n.id=q?q[r]:ab+(r+1),g.appendChild(n)}}return p=["&#173;","<style>",t,"</style>"].join(""),g.id=ab,b.innerHTML+=p,b.appendChild(g),f||(b.style.background="",ac.appendChild(b)),o=s(g,t),f?g.parentNode.removeChild(g):b.parentNode.removeChild(b),!!o},K=function(a){var f=ah.matchMedia||ah.msMatchMedia;if(f){return f(a).matches}var e;return M("@media "+a+" { #"+ab+" { position: absolute; } }",function(c){e=(ah.getComputedStyle?getComputedStyle(c,null):c.currentStyle)["position"]=="absolute"}),e},J=function(){function c(h,g){g=g||ag.createElement(b[h]||"div"),h="on"+h;var a=h in g;return a||(g.setAttribute||(g=ag.createElement("div")),g.setAttribute&&g.removeAttribute&&(g.setAttribute(h,""),a=E(g[h],"function"),E(g[h],"undefined")||(g[h]=af),g.removeAttribute(h))),g=null,a}var b={select:"input",change:"input",submit:"form",reset:"form",error:"img",load:"img",abort:"img"};return c}(),I={}.hasOwnProperty,H;!E(I,"undefined")&&!E(I.call,"undefined")?H=function(d,c){return I.call(d,c)}:H=function(d,c){return c in d&&E(d.constructor.prototype[c],"undefined")},Function.prototype.bind||(Function.prototype.bind=function(a){var h=this;if(typeof h!="function"){throw new TypeError}var g=P.call(arguments,1),f=function(){if(this instanceof f){var b=function(){};b.prototype=h.prototype;var d=new b,c=h.apply(d,g.concat(P.call(arguments)));return Object(c)===c?c:d}return h.apply(a,g.concat(P.call(arguments)))};return f}),V.hashchange=function(){return J("hashchange",ah)&&(ag.documentMode===af||ag.documentMode>7)},V.history=function(){return !!ah.history&&!!history.pushState};for(var L in V){H(V,L)&&(N=L.toLowerCase(),ad[N]=V[L](),R.push((ad[N]?"":"no-")+N))}return ad.input||O(),ad.addTest=function(e,c){if(typeof e=="object"){for(var f in e){H(e,f)&&ad.addTest(f,e[f])}}else{e=e.toLowerCase();if(ad[e]!==af){return ad}c=typeof c=="function"?c():c,ac.className+=" "+(c?"":"no-")+e,ad[e]=c}return ad},G(""),aa=Y=null,function(v,u){function p(f,e){var h=f.createElement("p"),g=f.getElementsByTagName("head")[0]||f.documentElement;return h.innerHTML="x<style>"+e+"</style>",g.insertBefore(h.lastChild,g.firstChild)}function o(){var b=l.elements;return typeof b=="string"?b.split(" "):b}function n(g){var d={},j=g.createElement,i=g.createDocumentFragment,h=i();g.createElement=function(b){var c=(d[b]||(d[b]=j(b))).cloneNode();return l.shivMethods&&c.canHaveChildren&&!s.test(b)?h.appendChild(c):c},g.createDocumentFragment=Function("h,f","return function(){var n=f.cloneNode(),c=n.createElement;h.shivMethods&&("+o().join().replace(/\w+/g,function(b){return d[b]=j(b),h.createElement(b),'c("'+b+'")'})+");return n}")(l,h)}function m(d){var c;return d.documentShived?d:(l.shivCSS&&!r&&(c=!!p(d,"article,aside,details,figcaption,figure,footer,header,hgroup,nav,section{display:block}audio{display:none}canvas,video{display:inline-block;*display:inline;*zoom:1}[hidden]{display:none}audio[controls]{display:inline-block;*display:inline;*zoom:1}mark{background:#FF0;color:#000}")),q||(c=!n(d)),c&&(d.documentShived=c),d)}var t=v.html5||{},s=/^<|^(?:button|form|map|select|textarea)$/i,r,q;(function(){var b=u.createElement("a");b.innerHTML="<xyz></xyz>",r="hidden" in b,q=b.childNodes.length==1||function(){try{u.createElement("a")}catch(d){return !0}var e=u.createDocumentFragment();return typeof e.cloneNode=="undefined"||typeof e.createDocumentFragment=="undefined"||typeof e.createElement=="undefined"}()})();var l={elements:t.elements||"abbr article aside audio bdi canvas data datalist details figcaption figure footer header hgroup mark meter nav output progress section summary time video",shivCSS:t.shivCSS!==!1,shivMethods:t.shivMethods!==!1,type:"default",shivDocument:m};v.html5=l,m(u)}(this,ag),ad._version=ae,ad.mq=K,ad.hasEvent=J,ad.testStyles=M,ad}(this,this.document),function(ad,ac,ab){function aa(b){return P.call(b)=="[object Function]"}function Z(b){return typeof b=="string"}function Y(){}function X(b){return !b||b=="loaded"||b=="complete"||b=="uninitialized"}function W(){var b=O.shift();M=1,b?b.t?R(function(){(b.t=="c"?L.injectCss:L.injectJs)(b.s,0,b.a,b.x,b.e,1)},0):(b(),W()):M=0}function V(w,v,t,s,q,p,n){function m(a){if(!g&&X(h.readyState)&&(x.r=g=1,!M&&W(),h.onload=h.onreadystatechange=null,a)){w!="img"&&R(function(){I.removeChild(h)},50);for(var c in D[v]){D[v].hasOwnProperty(c)&&D[v][c].onload()}}}var n=n||L.errorTimeout,h={},g=0,b=0,x={t:t,s:v,e:q,a:p,x:n};D[v]===1&&(b=1,D[v]=[],h=ac.createElement(w)),w=="object"?h.data=v:(h.src=v,h.type=w),h.width=h.height="0",h.onerror=h.onload=h.onreadystatechange=function(){m.call(this,b)},O.splice(s,0,x),w!="img"&&(b||D[v]===2?(I.insertBefore(h,J?null:Q),R(m,n)):D[v].push(h))}function U(g,e,j,i,h){return M=0,e=e||"j",Z(g)?V(e=="c"?G:H,g,e,this.i++,j,i,h):(O.splice(this.i++,0,g),O.length==1&&W()),this}function T(){var b=L;return b.loader={load:U,i:0},b}var S=ac.documentElement,R=ad.setTimeout,Q=ac.getElementsByTagName("script")[0],P={}.toString,O=[],M=0,K="MozAppearance" in S.style,J=K&&!!ac.createRange().compareNode,I=J?S:Q.parentNode,S=ad.opera&&P.call(ad.opera)=="[object Opera]",S=!!ac.attachEvent&&!S,H=K?"object":S?"script":"img",G=S?"script":H,F=Array.isArray||function(b){return P.call(b)=="[object Array]"},E=[],D={},C={timeout:function(d,c){return c.length&&(d.timeout=c[0]),d}},N,L;L=function(f){function d(j){var j=j.split("!"),i=E.length,q=j.pop(),p=j.length,q={url:q,origUrl:q,prefixes:j},o,m,l;for(m=0;m<p;m++){l=j[m].split("="),(o=C[l.shift()])&&(q=o(q,l))}for(m=0;m<i;m++){q=E[m](q)}return q}function n(m,s,r,q,p){var o=d(m),b=o.autoCallback;o.url.split(".").pop().split("?").shift(),o.bypass||(s&&(s=aa(s)?s:s[m]||s[q]||s[m.split("/").pop().split("?")[0]]||W),o.instead?o.instead(m,s,r,q,p):(D[o.url]?o.noexec=!0:D[o.url]=1,r.load(o.url,o.forceCSS||!o.forceJS&&"css"==o.url.split(".").pop().split("?").shift()?"c":ab,o.noexec,o.attrs,o.timeout),(aa(s)||aa(b))&&r.load(function(){T(),s&&s(o.origUrl,p,q),b&&b(o.origUrl,p,q),D[o.url]=2})))}function k(w,v){function u(b,i){if(b){if(Z(b)){i||(r=function(){var j=[].slice.call(arguments);q.apply(this,j),p()}),n(b,r,v,0,t)}else{if(Object(b)===b){for(g in o=function(){var a=0,j;for(j in b){b.hasOwnProperty(j)&&a++}return a}(),b){b.hasOwnProperty(g)&&(!i&&!--o&&(aa(r)?r=function(){var j=[].slice.call(arguments);q.apply(this,j),p()}:r[g]=function(j){return function(){var a=[].slice.call(arguments);j&&j.apply(this,a),p()}}(q[g])),n(b[g],r,v,g,t))}}}}else{!i&&p()}}var t=!!w.test,s=w.load||w.both,r=w.callback||Y,q=r,p=w.complete||Y,o,g;u(t?w.yep:w.nope,!!s),s&&u(s)}var h,e,c=this.yepnope.loader;if(Z(f)){n(f,0,c,0)}else{if(F(f)){for(h=0;h<f.length;h++){e=f[h],Z(e)?n(e,0,c,0):F(e)?L(e):Object(e)===e&&k(e,c)}}else{Object(f)===f&&k(f,c)}}},L.addPrefix=function(d,c){C[d]=c},L.addFilter=function(b){E.push(b)},L.errorTimeout=10000,ac.readyState==null&&ac.addEventListener&&(ac.readyState="loading",ac.addEventListener("DOMContentLoaded",N=function(){ac.removeEventListener("DOMContentLoaded",N,0),ac.readyState="complete"},0)),ad.yepnope=T(),ad.yepnope.executeStack=W,ad.yepnope.injectJs=function(r,q,p,n,m,h){var g=ac.createElement("script"),f,b,n=n||L.errorTimeout;g.src=r;for(b in p){g.setAttribute(b,p[b])}q=h?W:q||Y,g.onreadystatechange=g.onload=function(){!f&&X(g.readyState)&&(f=1,q(),g.onload=g.onreadystatechange=null)},R(function(){f||(f=1,q(1))},n),m?g.onload():Q.parentNode.insertBefore(g,Q)},ad.yepnope.injectCss=function(b,n,m,l,k,h){var l=ac.createElement("link"),f,n=h?W:n||Y;l.href=b,l.rel="stylesheet",l.type="text/css";for(f in m){l.setAttribute(f,m[f])}k||(Q.parentNode.insertBefore(l,Q),R(n,0))}}(this,document),Modernizr.load=function(){yepnope.apply(window,[].slice.call(arguments,0))};(function(){var w=this;var s=w._;var b={};var j=Array.prototype,C=Object.prototype,F=Function.prototype;var u=j.slice,y=j.unshift,x=C.toString,p=C.hasOwnProperty;var n=j.forEach,i=j.map,A=j.reduce,e=j.reduceRight,m=j.filter,a=j.every,z=j.some,v=j.indexOf,f=j.lastIndexOf,c=Array.isArray,B=Object.keys,k=F.bind;var E=function(H){return new g(H)};if(typeof exports!=="undefined"){if(typeof module!=="undefined"&&module.exports){exports=module.exports=E}exports._=E}else{w._=E}E.VERSION="1.3.0";var d=E.each=E.forEach=function(M,L,K){if(M==null){return}if(n&&M.forEach===n){M.forEach(L,K)}else{if(M.length===+M.length){for(var J=0,H=M.length;J<H;J++){if(J in M&&L.call(K,M[J],J,M)===b){return}}}else{for(var I in M){if(p.call(M,I)){if(L.call(K,M[I],I,M)===b){return}}}}}};E.map=function(K,J,I){var H=[];if(K==null){return H}if(i&&K.map===i){return K.map(J,I)}d(K,function(N,L,M){H[H.length]=J.call(I,N,L,M)});if(K.length===+K.length){H.length=K.length}return H};E.reduce=E.foldl=E.inject=function(L,K,H,J){var I=arguments.length>2;if(L==null){L=[]}if(A&&L.reduce===A){if(J){K=E.bind(K,J)}return I?L.reduce(K,H):L.reduce(K)}d(L,function(O,M,N){if(!I){H=O;I=true}else{H=K.call(J,H,O,M,N)}});if(!I){throw new TypeError("Reduce of empty array with no initial value")}return H};E.reduceRight=E.foldr=function(L,K,H,J){var I=arguments.length>2;if(L==null){L=[]}if(e&&L.reduceRight===e){if(J){K=E.bind(K,J)}return I?L.reduceRight(K,H):L.reduceRight(K)}var M=E.toArray(L).reverse();if(J&&!I){K=E.bind(K,J)}return I?E.reduce(M,K,H,J):E.reduce(M,K)};E.find=E.detect=function(K,J,I){var H;q(K,function(N,L,M){if(J.call(I,N,L,M)){H=N;return true}});return H};E.filter=E.select=function(K,J,I){var H=[];if(K==null){return H}if(m&&K.filter===m){return K.filter(J,I)}d(K,function(N,L,M){if(J.call(I,N,L,M)){H[H.length]=N}});return H};E.reject=function(K,J,I){var H=[];if(K==null){return H}d(K,function(N,L,M){if(!J.call(I,N,L,M)){H[H.length]=N}});return H};E.every=E.all=function(K,J,I){var H=true;if(K==null){return H}if(a&&K.every===a){return K.every(J,I)}d(K,function(N,L,M){if(!(H=H&&J.call(I,N,L,M))){return b}});return H};var q=E.some=E.any=function(K,J,I){J||(J=E.identity);var H=false;if(K==null){return H}if(z&&K.some===z){return K.some(J,I)}d(K,function(N,L,M){if(H||(H=J.call(I,N,L,M))){return b}});return !!H};E.include=E.contains=function(J,I){var H=false;if(J==null){return H}if(v&&J.indexOf===v){return J.indexOf(I)!=-1}H=q(J,function(K){return K===I});return H};E.invoke=function(I,J){var H=u.call(arguments,2);return E.map(I,function(K){return(E.isFunction(J)?J||K:K[J]).apply(K,H)})};E.pluck=function(I,H){return E.map(I,function(J){return J[H]})};E.max=function(K,J,I){if(!J&&E.isArray(K)){return Math.max.apply(Math,K)}if(!J&&E.isEmpty(K)){return -Infinity}var H={computed:-Infinity};d(K,function(O,L,N){var M=J?J.call(I,O,L,N):O;M>=H.computed&&(H={value:O,computed:M})});return H.value};E.min=function(K,J,I){if(!J&&E.isArray(K)){return Math.min.apply(Math,K)}if(!J&&E.isEmpty(K)){return Infinity}var H={computed:Infinity};d(K,function(O,L,N){var M=J?J.call(I,O,L,N):O;M<H.computed&&(H={value:O,computed:M})});return H.value};E.shuffle=function(J){var H=[],I;d(J,function(M,K,L){if(K==0){H[0]=M}else{I=Math.floor(Math.random()*(K+1));H[K]=H[I];H[I]=M}});return H};E.sortBy=function(J,I,H){return E.pluck(E.map(J,function(M,K,L){return{value:M,criteria:I.call(H,M,K,L)}}).sort(function(N,M){var L=N.criteria,K=M.criteria;return L<K?-1:L>K?1:0}),"value")};E.groupBy=function(J,K){var H={};var I=E.isFunction(K)?K:function(L){return L[K]};d(J,function(N,L){var M=I(N,L);(H[M]||(H[M]=[])).push(N)});return H};E.sortedIndex=function(M,L,J){J||(J=E.identity);var H=0,K=M.length;while(H<K){var I=(H+K)>>1;J(M[I])<J(L)?H=I+1:K=I}return H};E.toArray=function(H){if(!H){return[]}if(H.toArray){return H.toArray()}if(E.isArray(H)){return u.call(H)}if(E.isArguments(H)){return u.call(H)}return E.values(H)};E.size=function(H){return E.toArray(H).length};E.first=E.head=function(J,I,H){return(I!=null)&&!H?u.call(J,0,I):J[0]};E.initial=function(J,I,H){return u.call(J,0,J.length-((I==null)||H?1:I))};E.last=function(J,I,H){if((I!=null)&&!H){return u.call(J,Math.max(J.length-I,0))}else{return J[J.length-1]}};E.rest=E.tail=function(J,H,I){return u.call(J,(H==null)||I?1:H)};E.compact=function(H){return E.filter(H,function(I){return !!I})};E.flatten=function(I,H){return E.reduce(I,function(J,K){if(E.isArray(K)){return J.concat(H?K:E.flatten(K))}J[J.length]=K;return J},[])};E.without=function(H){return E.difference(H,u.call(arguments,1))};E.uniq=E.unique=function(L,K,J){var I=J?E.map(L,J):L;var H=[];E.reduce(I,function(M,O,N){if(0==N||(K===true?E.last(M)!=O:!E.include(M,O))){M[M.length]=O;H[H.length]=L[N]}return M},[]);return H};E.union=function(){return E.uniq(E.flatten(arguments,true))};E.intersection=E.intersect=function(I){var H=u.call(arguments,1);return E.filter(E.uniq(I),function(J){return E.every(H,function(K){return E.indexOf(K,J)>=0})})};E.difference=function(I){var H=E.flatten(u.call(arguments,1));return E.filter(I,function(J){return !E.include(H,J)})};E.zip=function(){var H=u.call(arguments);var K=E.max(E.pluck(H,"length"));var J=new Array(K);for(var I=0;I<K;I++){J[I]=E.pluck(H,""+I)}return J};E.indexOf=function(L,J,K){if(L==null){return -1}var I,H;if(K){I=E.sortedIndex(L,J);return L[I]===J?I:-1}if(v&&L.indexOf===v){return L.indexOf(J)}for(I=0,H=L.length;I<H;I++){if(I in L&&L[I]===J){return I}}return -1};E.lastIndexOf=function(J,I){if(J==null){return -1}if(f&&J.lastIndexOf===f){return J.lastIndexOf(I)}var H=J.length;while(H--){if(H in J&&J[H]===I){return H}}return -1};E.range=function(M,K,L){if(arguments.length<=1){K=M||0;M=0}L=arguments[2]||1;var I=Math.max(Math.ceil((K-M)/L),0);var H=0;var J=new Array(I);while(H<I){J[H++]=M;M+=L}return J};var h=function(){};E.bind=function G(K,I){var J,H;if(K.bind===k&&k){return k.apply(K,u.call(arguments,1))}if(!E.isFunction(K)){throw new TypeError}H=u.call(arguments,2);return J=function(){if(!(this instanceof J)){return K.apply(I,H.concat(u.call(arguments)))}h.prototype=K.prototype;var M=new h;var L=K.apply(M,H.concat(u.call(arguments)));if(Object(L)===L){return L}return M}};E.bindAll=function(I){var H=u.call(arguments,1);if(H.length==0){H=E.functions(I)}d(H,function(J){I[J]=E.bind(I[J],I)});return I};E.memoize=function(J,I){var H={};I||(I=E.identity);return function(){var K=I.apply(this,arguments);return p.call(H,K)?H[K]:(H[K]=J.apply(this,arguments))}};E.delay=function(I,J){var H=u.call(arguments,2);return setTimeout(function(){return I.apply(I,H)},J)};E.defer=function(H){return E.delay.apply(E,[H,1].concat(u.call(arguments,1)))};E.throttle=function(M,O){var K,H,N,L,J;var I=E.debounce(function(){J=L=false},O);return function(){K=this;H=arguments;var P=function(){N=null;if(J){M.apply(K,H)}I()};if(!N){N=setTimeout(P,O)}if(L){J=true}else{M.apply(K,H)}I();L=true}};E.debounce=function(H,J){var I;return function(){var M=this,L=arguments;var K=function(){I=null;H.apply(M,L)};clearTimeout(I);I=setTimeout(K,J)}};E.once=function(J){var H=false,I;return function(){if(H){return I}H=true;return I=J.apply(this,arguments)}};E.wrap=function(H,I){return function(){var J=[H].concat(u.call(arguments,0));return I.apply(this,J)}};E.compose=function(){var H=arguments;return function(){var I=arguments;for(var J=H.length-1;J>=0;J--){I=[H[J].apply(this,I)]}return I[0]}};E.after=function(I,H){if(I<=0){return H()}return function(){if(--I<1){return H.apply(this,arguments)}}};E.keys=B||function(J){if(J!==Object(J)){throw new TypeError("Invalid object")}var I=[];for(var H in J){if(p.call(J,H)){I[I.length]=H}}return I};E.values=function(H){return E.map(H,E.identity)};E.functions=E.methods=function(J){var I=[];for(var H in J){if(E.isFunction(J[H])){I.push(H)}}return I.sort()};E.extend=function(H){d(u.call(arguments,1),function(I){for(var J in I){if(I[J]!==void 0){H[J]=I[J]}}});return H};E.defaults=function(H){d(u.call(arguments,1),function(I){for(var J in I){if(H[J]==null){H[J]=I[J]}}});return H};E.clone=function(H){if(!E.isObject(H)){return H}return E.isArray(H)?H.slice():E.extend({},H)};E.tap=function(I,H){H(I);return I};function D(K,J,I){if(K===J){return K!==0||1/K==1/J}if(K==null||J==null){return K===J}if(K._chain){K=K._wrapped}if(J._chain){J=J._wrapped}if(K.isEqual&&E.isFunction(K.isEqual)){return K.isEqual(J)}if(J.isEqual&&E.isFunction(J.isEqual)){return J.isEqual(K)}var N=x.call(K);if(N!=x.call(J)){return false}switch(N){case"[object String]":return K==String(J);case"[object Number]":return K!=+K?J!=+J:(K==0?1/K==1/J:K==+J);case"[object Date]":case"[object Boolean]":return +K==+J;case"[object RegExp]":return K.source==J.source&&K.global==J.global&&K.multiline==J.multiline&&K.ignoreCase==J.ignoreCase}if(typeof K!="object"||typeof J!="object"){return false}var O=I.length;while(O--){if(I[O]==K){return true}}I.push(K);var M=0,H=true;if(N=="[object Array]"){M=K.length;H=M==J.length;if(H){while(M--){if(!(H=M in K==M in J&&D(K[M],J[M],I))){break}}}}else{if("constructor" in K!="constructor" in J||K.constructor!=J.constructor){return false}for(var L in K){if(p.call(K,L)){M++;if(!(H=p.call(J,L)&&D(K[L],J[L],I))){break}}}if(H){for(L in J){if(p.call(J,L)&&!(M--)){break}}H=!M}}I.pop();return H}E.isEqual=function(I,H){return D(I,H,[])};E.isEmpty=function(I){if(E.isArray(I)||E.isString(I)){return I.length===0}for(var H in I){if(p.call(I,H)){return false}}return true};E.isElement=function(H){return !!(H&&H.nodeType==1)};E.isArray=c||function(H){return x.call(H)=="[object Array]"};E.isObject=function(H){return H===Object(H)};E.isArguments=function(H){return x.call(H)=="[object Arguments]"};if(!E.isArguments(arguments)){E.isArguments=function(H){return !!(H&&p.call(H,"callee"))}}E.isFunction=function(H){return x.call(H)=="[object Function]"};E.isString=function(H){return x.call(H)=="[object String]"};E.isNumber=function(H){return x.call(H)=="[object Number]"};E.isNaN=function(H){return H!==H};E.isBoolean=function(H){return H===true||H===false||x.call(H)=="[object Boolean]"};E.isDate=function(H){return x.call(H)=="[object Date]"};E.isRegExp=function(H){return x.call(H)=="[object RegExp]"};E.isNull=function(H){return H===null};E.isUndefined=function(H){return H===void 0};E.noConflict=function(){w._=s;return this};E.identity=function(H){return H};E.times=function(K,J,I){for(var H=0;H<K;H++){J.call(I,H)}};E.escape=function(H){return(""+H).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;").replace(/\//g,"&#x2F;")};E.mixin=function(H){d(E.functions(H),function(I){r(I,E[I]=H[I])})};var l=0;E.uniqueId=function(H){var I=l++;return H?H+I:I};E.templateSettings={evaluate:/<%([\s\S]+?)%>/g,interpolate:/<%=([\s\S]+?)%>/g,escape:/<%-([\s\S]+?)%>/g};var t=/.^/;E.template=function(K,J){var L=E.templateSettings;var H="var __p=[],print=function(){__p.push.apply(__p,arguments);};with(obj||{}){__p.push('"+K.replace(/\\/g,"\\\\").replace(/'/g,"\\'").replace(L.escape||t,function(M,N){return"',_.escape("+N.replace(/\\'/g,"'")+"),'"}).replace(L.interpolate||t,function(M,N){return"',"+N.replace(/\\'/g,"'")+",'"}).replace(L.evaluate||t,function(M,N){return"');"+N.replace(/\\'/g,"'").replace(/[\r\n\t]/g," ").replace(/\\\\/g,"\\")+";__p.push('"}).replace(/\r/g,"\\r").replace(/\n/g,"\\n").replace(/\t/g,"\\t")+"');}return __p.join('');";var I=new Function("obj","_",H);if(J){return I(J,E)}return function(M){return I.call(this,M,E)}};E.chain=function(H){return E(H).chain()};var g=function(H){this._wrapped=H};E.prototype=g.prototype;var o=function(I,H){return H?E(I).chain():I};var r=function(H,I){g.prototype[H]=function(){var J=u.call(arguments);y.call(J,this._wrapped);return o(I.apply(E,J),this._chain)}};E.mixin(E);d(["pop","push","reverse","shift","sort","splice","unshift"],function(H){var I=j[H];g.prototype[H]=function(){var J=this._wrapped;I.apply(J,arguments);var K=J.length;if((H=="shift"||H=="splice")&&K===0){delete J[0]}return o(J,this._chain)}});d(["concat","join","slice"],function(H){var I=j[H];g.prototype[H]=function(){return o(I.apply(this._wrapped,arguments),this._chain)}});g.prototype.chain=function(){this._chain=true;return this};g.prototype.value=function(){return this._wrapped}}).call(this);
/*! matchMedia() polyfill - Test a CSS media type/query in JS. Authors & copyright (c) 2012: Scott Jehl, Paul Irish, Nicholas Zakas. Dual MIT/BSD license */
/*! NOTE: If you're already including a window.matchMedia polyfill via Modernizr or otherwise, you don't need this part */
window.matchMedia=window.matchMedia||(function(l,k){var n,i=l.documentElement,h=i.firstElementChild||i.firstChild,m=l.createElement("body"),j=l.createElement("div");j.id="mq-test-1";j.style.cssText="position:absolute;top:-100em";m.style.background="none";m.appendChild(j);return function(a){j.innerHTML='&shy;<style media="'+a+'"> #mq-test-1 { width: 42px; }</style>';i.insertBefore(m,h);n=j.offsetWidth==42;i.removeChild(m);return{matches:n,media:a}}})(document);
/*! Respond.js v1.1.0: min/max-width media query polyfill. (c) Scott Jehl. MIT/GPLv2 Lic. j.mp/respondjs  */
(function(P){P.respond={};respond.update=function(){};respond.mediaQueriesSupported=P.matchMedia&&P.matchMedia("only all").matches;if(respond.mediaQueriesSupported){return}var x=P.document,B=x.documentElement,L=[],J=[],D=[],F={},M=30,O=x.getElementsByTagName("head")[0]||B,N=x.getElementsByTagName("base")[0],S=O.getElementsByTagName("link"),Q=[],T=function(){var c=S,g=c.length,f=0,b,e,d,a;for(;f<g;f++){b=c[f],e=b.href,d=b.media,a=b.rel&&b.rel.toLowerCase()==="stylesheet";if(!!e&&a&&!F[e]){if(b.styleSheet&&b.styleSheet.rawCssText){H(b.styleSheet.rawCssText,e,d);F[e]=true}else{if((!/^([a-zA-Z:]*\/\/)/.test(e)&&!N)||e.replace(RegExp.$1,"").split("/")[0]===P.location.host){Q.push({href:e,media:d})}}}}z()},z=function(){if(Q.length){var a=Q.shift();G(a.href,function(b){H(b,a.href,a.media);F[a.href]=true;z()})}},H=function(i,h,e){var k=i.match(/@media[^\{]+\{([^\{\}]*\{[^\}\{]*\})+/gi),g=k&&k.length||0,h=h.substring(0,h.lastIndexOf("/")),f=function(n){return n.replace(/(url\()['"]?([^\/\)'"][^:\)'"]+)['"]?(\))/g,"$1"+h+"$2$3")},d=!g&&e,a=0,b,m,l,c,j;if(h.length){h+="/"}if(d){g=1}for(;a<g;a++){b=0;if(d){m=e;J.push(f(i))}else{m=k[a].match(/@media *([^\{]+)\{([\S\s]+?)$/)&&RegExp.$1;J.push(RegExp.$2&&f(RegExp.$2))}c=m.split(",");j=c.length;for(;b<j;b++){l=c[b];L.push({media:l.split("(")[0].match(/(only\s+)?([a-zA-Z]+)\s?/)&&RegExp.$2||"all",rules:J.length-1,hasquery:l.indexOf("(")>-1,minw:l.match(/\(min\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||""),maxw:l.match(/\(max\-width:[\s]*([\s]*[0-9\.]+)(px|em)[\s]*\)/)&&parseFloat(RegExp.$1)+(RegExp.$2||"")})}}K()},I,C,y=function(){var c,b=x.createElement("div"),a=x.body,d=false;b.style.cssText="position:absolute;font-size:1em;width:1em";if(!a){a=d=x.createElement("body");a.style.background="none"}a.appendChild(b);B.insertBefore(a,B.firstChild);c=b.offsetWidth;if(d){B.removeChild(a)}else{a.removeChild(b)}c=E=parseFloat(c);return c},E,K=function(l){var k="clientWidth",c=B[k],m=x.compatMode==="CSS1Compat"&&c||x.body[k]||c,a={},n=S[S.length-1],g=(new Date()).getTime();if(l&&I&&g-I<M){clearTimeout(C);C=setTimeout(K,M);return}else{I=g}for(var p in L){var i=L[p],b=i.minw,j=i.maxw,d=b===null,f=j===null,h="em";if(!!b){b=parseFloat(b)*(b.indexOf(h)>-1?(E||y()):1)}if(!!j){j=parseFloat(j)*(j.indexOf(h)>-1?(E||y()):1)}if(!i.hasquery||(!d||!f)&&(d||m>=b)&&(f||m<=j)){if(!a[i.media]){a[i.media]=[]}a[i.media].push(J[i.rules])}}for(var p in D){if(D[p]&&D[p].parentNode===O){O.removeChild(D[p])}}for(var p in a){var e=x.createElement("style"),o=a[p].join("\n");e.type="text/css";e.media=p;O.insertBefore(e,n.nextSibling);if(e.styleSheet){e.styleSheet.cssText=o}else{e.appendChild(x.createTextNode(o))}D.push(e)}},G=function(a,b){var c=R();if(!c){return}c.open("GET",a,true);c.onreadystatechange=function(){if(c.readyState!=4||c.status!=200&&c.status!=304){return}b(c.responseText)};if(c.readyState==4){return}c.send(null)},R=(function(){var a=false;try{a=new XMLHttpRequest()}catch(b){a=new ActiveXObject("Microsoft.XMLHTTP")}return function(){return a}})();T();respond.update=T;function A(){K(true)}if(P.addEventListener){P.addEventListener("resize",A,false)}else{if(P.attachEvent){P.attachEvent("onresize",A)}}})(this);window.log=function(){log.history=log.history||[];log.history.push(arguments);if(this.console){arguments.callee=arguments.callee.caller;var a=[].slice.call(arguments);(typeof console.log==="object"?log.apply.call(console.log,console,a):console.log.apply(console,a))}};(function(){prepareStoryHTML=function(k,m,g,p,c,e,b){if(m.length>140&&typeof b!=="undefined"){m=m.substring(0,139)+"…"}else{var n=m.split(" ");var j,d=n.length;var f=28;for(j=0;j<d;++j){var h="";var o=n[j].match(/(^|\s)((https?:\/\/)[\w-]+(\.[\w-]+)+\.?(:\d+)?(\/\S*)?)/gi);if(o){if(n[j].substr(0,7)!="http://"&&n[j].substr(0,8)!="https://"){h='<a href="http://'+n[j]+'">'}else{h='<a href="'+n[j]+'">'}}if(n[j].length>f){h+=n[j].substr(0,f)+" "+n[j].substr(f)}else{h+=n[j]}if(o){h+="</a>"}n[j]=h}m=n.join(" ")}if(typeof c!=="undefined"||typeof e!=="undefined"){return"<div class='"+k+"'><p class='author'><strong>"+g+"</strong> wrote:</p><p class='content'>"+m+'</p><p><a href="'+c+"/results?token="+e+'" class="hl">'+p+" ago</a></p></div>"}else{return"<div class='annotation'><p class='author'><strong>"+g+"</strong> wrote:</p><p class='content'>"+m+"</p><p class='author'>"+p+" ago</p></div>"}}}());(function(e){function h(){}for(var g="assert,clear,count,debug,dir,dirxml,error,exception,firebug,group,groupCollapsed,groupEnd,info,log,memoryProfile,memoryProfileEnd,profile,profileEnd,table,time,timeEnd,timeStamp,trace,warn".split(","),f;f=g.pop();){e[f]=e[f]||h}})((function(){try{console.log();return window.console}catch(a){return window.console={}}})());(function(){if(!Modernizr.input.placeholder){$.getScript("/assets/jquery.placeholder.min.js").done(function(a,b){$("input, textarea").placeholder()})}}());(function(){getUrlVar=function(b){var a=new RegExp(b+"=([^&]*)","i").exec(window.location.search);return a&&unescape(a[1])||""};Array.prototype.remove=function(c,b){var a=this.slice((b||c)+1||this.length);this.length=c<0?this.length+c:c;return this.push.apply(this,a)};"use strict";if(!("bind" in Function.prototype)){Function.prototype.bind=function(a){var c=this;if(arguments.length<=1){return function(){return c.apply(a,arguments)}}else{var b=Array.prototype.slice.call(arguments,1);return function(){return c.apply(a,arguments.length===0?b:b.concat(Array.prototype.slice.call(arguments)))}}}}if(!("trim" in String.prototype)){String.prototype.trim=function(){return this.replace(/^\s+/,"").replace(/\s+$/,"")}}if(!("indexOf" in Array.prototype)){Array.prototype.indexOf=function(b,a){if(a===undefined){a=0}if(a<0){a+=this.length}if(a<0){a=0}for(var c=this.length;a<c;a++){if(a in this&&this[a]===b){return a}}return -1}}if(!("lastIndexOf" in Array.prototype)){Array.prototype.lastIndexOf=function(b,a){if(a===undefined){a=this.length-1}if(a<0){a+=this.length}if(a>this.length-1){a=this.length-1}for(a++;a-->0;){if(a in this&&this[a]===b){return a}}return -1}}if(!("forEach" in Array.prototype)){Array.prototype.forEach=function(c,b){for(var a=0,d=this.length;a<d;a++){if(a in this){c.call(b,this[a],a,this)}}}}if(!("map" in Array.prototype)){Array.prototype.map=function(d,c){var a=new Array(this.length);for(var b=0,e=this.length;b<e;b++){if(b in this){a[b]=d.call(c,this[b],b,this)}}return a}}if(!("filter" in Array.prototype)){Array.prototype.filter=function(d,e){var a=[],b;for(var c=0,f=this.length;c<f;c++){if(c in this&&d.call(e,b=this[c],c,this)){a.push(b)}}return a}}if(!("every" in Array.prototype)){Array.prototype.every=function(a,c){for(var b=0,d=this.length;b<d;b++){if(b in this&&!a.call(c,this[b],b,this)){return false}}return true}}if(!("some" in Array.prototype)){Array.prototype.some=function(a,c){for(var b=0,d=this.length;b<d;b++){if(b in this&&a.call(c,this[b],b,this)){return true}}return false}}}());(function(c){function b(){c(document).ready(function(){a();d("#nav_bar a")})}function a(){c.ajaxSetup({cache:true,beforeSend:function(f){var e=c('meta[name="_csrf"]').attr("content");f.setRequestHeader("X_CSRF_TOKEN",e)}})}function d(e){c(e).each(function(){if(c(this).attr("href")===location.pathname){c(this).addClass("current")}});c(e).hover(function(){c(this).addClass("current")},function(){if(c(this).attr("href")!==location.pathname){c(this).removeClass("current")}})}return{init:b()}}(jQuery));