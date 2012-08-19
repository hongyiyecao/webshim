jQuery.webshims.register("dom-extend",function(a,f,h,k,n){var t=f.modules,p=/\s*,\s*/,o={},r={},l={},v={},s={},A=a.fn.val,z=function(c,b,d,g,q){return q?A.call(a(c)):A.call(a(c),d)};a.fn.val=function(c){var b=this[0];arguments.length&&null==c&&(c="");if(!arguments.length)return!b||1!==b.nodeType?A.call(this):a.prop(b,"value",c,"val",!0);if(a.isArray(c))return A.apply(this,arguments);var d=a.isFunction(c);return this.each(function(g){b=this;1===b.nodeType&&(d?(g=c.call(b,g,a.prop(b,"value",n,"val",
!0)),null==g&&(g=""),a.prop(b,"value",g,"val")):a.prop(b,"value",c,"val"))})};var j="_webshimsLib"+Math.round(1E3*Math.random()),x=function(c,b,d){c=c.jquery?c[0]:c;if(!c)return d||{};var g=a.data(c,j);d!==n&&(g||(g=a.data(c,j,{})),b&&(g[b]=d));return b?g&&g[b]:g};[{name:"getNativeElement",prop:"nativeElement"},{name:"getShadowElement",prop:"shadowElement"},{name:"getShadowFocusElement",prop:"shadowFocusElement"}].forEach(function(c){a.fn[c.name]=function(){return this.map(function(){var a=x(this,
"shadowData");return a&&a[c.prop]||this})}});["removeAttr","prop","attr"].forEach(function(c){o[c]=a[c];a[c]=function(b,d,g,q,m){var w="val"==q,e=!w?o[c]:z;if(!b||!r[d]||1!==b.nodeType||!w&&q&&"attr"==c&&a.attrFn[d])return e(b,d,g,q,m);var B=(b.nodeName||"").toLowerCase(),i=l[B],f="attr"==c&&(!1===g||null===g)?"removeAttr":c,j,v,u;i||(i=l["*"]);i&&(i=i[d]);i&&(j=i[f]);if(j){if("value"==d)v=j.isVal,j.isVal=w;if("removeAttr"===f)return j.value.call(b);if(g===n)return j.get?j.get.call(b):j.value;j.set&&
("attr"==c&&!0===g&&(g=d),u=j.set.call(b,g));if("value"==d)j.isVal=v}else u=e(b,d,g,q,m);if((g!==n||"removeAttr"===f)&&s[B]&&s[B][d]){var h;h="removeAttr"==f?!1:"prop"==f?!!g:!0;s[B][d].forEach(function(a){if(!a.only||(a.only="prop"==c)||"attr"==a.only&&"prop"!=c)a.call(b,g,h,w?"val":f,c)})}return u};v[c]=function(b,d,g){l[b]||(l[b]={});l[b][d]||(l[b][d]={});var q=l[b][d][c],m=function(a,b,m){return b&&b[a]?b[a]:m&&m[a]?m[a]:"prop"==c&&"value"==d?function(a){return g.isVal?z(this,d,a,!1,0===arguments.length):
o[c](this,d,a)}:"prop"==c&&"value"==a&&g.value.apply?function(a){var b=o[c](this,d);b&&b.apply&&(b=b.apply(this,arguments));return b}:function(a){return o[c](this,d,a)}};l[b][d][c]=g;if(g.value===n){if(!g.set)g.set=g.writeable?m("set",g,q):f.cfg.useStrict&&"prop"==d?function(){throw d+" is readonly on "+b;}:a.noop;if(!g.get)g.get=m("get",g,q)}["value","get","set"].forEach(function(a){g[a]&&(g["_sup"+a]=m(a,q))})}});var y=!a.browser.msie||8<parseInt(a.browser.version,10),e=function(){var a=f.getPrototypeOf(k.createElement("foobar")),
b=Object.prototype.hasOwnProperty;return function(d,g,q){var m=k.createElement(d),w=f.getPrototypeOf(m);if(y&&w&&a!==w&&(!m[g]||!b.call(m,g))){var e=m[g];q._supvalue=function(){return e&&e.apply?e.apply(this,arguments):e};w[g]=q.value}else q._supvalue=function(){var a=x(this,"propValue");return a&&a[g]&&a[g].apply?a[g].apply(this,arguments):a&&a[g]},i.extendValue(d,g,q.value);q.value._supvalue=q._supvalue}}(),i=function(){var c={};f.addReady(function(b,d){var g={},e=function(c){g[c]||(g[c]=a(b.getElementsByTagName(c)),
d[0]&&a.nodeName(d[0],c)&&(g[c]=g[c].add(d)))};a.each(c,function(a,c){e(a);!c||!c.forEach?f.warn("Error: with "+a+"-property. methods: "+c):c.forEach(function(c){g[a].each(c)})});g=null});var b,d=a([]),g=function(d,m){c[d]?c[d].push(m):c[d]=[m];a.isDOMReady&&(b||a(k.getElementsByTagName(d))).each(m)};return{createTmpCache:function(c){a.isDOMReady&&(b=b||a(k.getElementsByTagName(c)));return b||d},flushTmpCache:function(){b=null},content:function(c,b){g(c,function(){var c=a.attr(this,b);null!=c&&a.attr(this,
b,c)})},createElement:function(a,c){g(a,c)},extendValue:function(c,b,d){g(c,function(){a(this).each(function(){x(this,"propValue",{})[b]=this[b];this[b]=d})})}}}(),u=function(a,b){if(a.defaultValue===n)a.defaultValue="";if(!a.removeAttr)a.removeAttr={value:function(){a[b||"prop"].set.call(this,a.defaultValue);a.removeAttr._supvalue.call(this)}};if(!a.attr)a.attr={}};a.extend(f,{getID:function(){var c=(new Date).getTime();return function(b){var b=a(b),d=b.attr("id");d||(c++,d="ID-"+c,b.attr("id",d));
return d}}(),extendUNDEFProp:function(c,b){a.each(b,function(a,b){a in c||(c[a]=b)})},createPropDefault:u,data:x,moveToFirstEvent:function(){var c=a._data?"_data":"data";return function(b,d,g){if((b=(a[c](b,"events")||{})[d])&&1<b.length)d=b.pop(),g||(g="bind"),"bind"==g&&b.delegateCount?b.splice(b.delegateCount,0,d):b.unshift(d)}}(),addShadowDom:function(c,b,d){d=d||{};c.jquery&&(c=c[0]);b.jquery&&(b=b[0]);var g=a.data(c,j)||a.data(c,j,{}),e=a.data(b,j)||a.data(b,j,{}),m={};if(d.shadowFocusElement){if(d.shadowFocusElement){if(d.shadowFocusElement.jquery)d.shadowFocusElement=
d.shadowFocusElement[0];m=a.data(d.shadowFocusElement,j)||a.data(d.shadowFocusElement,j,m)}}else d.shadowFocusElement=b;g.hasShadow=b;m.nativeElement=e.nativeElement=c;m.shadowData=e.shadowData=g.shadowData={nativeElement:c,shadowElement:b,shadowFocusElement:d.shadowFocusElement};d.shadowChilds&&d.shadowChilds.each(function(){x(this,"shadowData",e.shadowData)});if(d.data)m.shadowData.data=e.shadowData.data=g.shadowData.data=d.data;d=null},propTypes:{standard:function(a){u(a);if(!a.prop)a.prop={set:function(b){a.attr.set.call(this,
""+b)},get:function(){return a.attr.get.call(this)||a.defaultValue}}},"boolean":function(a){u(a);if(!a.prop)a.prop={set:function(b){b?a.attr.set.call(this,""):a.removeAttr.value.call(this)},get:function(){return null!=a.attr.get.call(this)}}},src:function(){var c=k.createElement("a");c.style.display="none";return function(b,d){u(b);if(!b.prop)b.prop={set:function(a){b.attr.set.call(this,a)},get:function(){var b=this.getAttribute(d),e;if(null==b)return"";c.setAttribute("href",b+"");if(!a.support.hrefNormalized){try{a(c).insertAfterTo(this),
e=c.getAttribute("href",4)}catch(m){e=c.getAttribute("href",4)}a(c).detach()}return e||c.href}}}}(),enumarated:function(a){u(a);if(!a.prop)a.prop={set:function(b){a.attr.set.call(this,b)},get:function(){var b=(a.attr.get.call(this)||"").toLowerCase();if(!b||-1==a.limitedTo.indexOf(b))b=a.defaultValue;return b}}}},reflectProperties:function(c,b){"string"==typeof b&&(b=b.split(p));b.forEach(function(b){f.defineNodeNamesProperty(c,b,{prop:{set:function(c){a.attr(this,b,c)},get:function(){return a.attr(this,
b)||""}}})})},defineNodeNameProperty:function(c,b,d){r[b]=!0;if(d.reflect)f.propTypes[d.propType||"standard"](d,b);["prop","attr","removeAttr"].forEach(function(g){var i=d[g];i&&(i="prop"===g?a.extend({writeable:!0},i):a.extend({},i,{writeable:!0}),v[g](c,b,i),"*"!=c&&f.cfg.extendNative&&"prop"==g&&i.value&&a.isFunction(i.value)&&e(c,b,i),d[g]=i)});d.initAttr&&i.content(c,b);return d},defineNodeNameProperties:function(a,b,d,g){for(var e in b)!g&&b[e].initAttr&&i.createTmpCache(a),d&&(b[e][d]?f.log("override: "+
a+"["+e+"] for "+d):(b[e][d]={},["value","set","get"].forEach(function(a){a in b[e]&&(b[e][d][a]=b[e][a],delete b[e][a])}))),b[e]=f.defineNodeNameProperty(a,e,b[e]);g||i.flushTmpCache();return b},createElement:function(c,b,d){var g;a.isFunction(b)&&(b={after:b});i.createTmpCache(c);b.before&&i.createElement(c,b.before);d&&(g=f.defineNodeNameProperties(c,d,!1,!0));b.after&&i.createElement(c,b.after);i.flushTmpCache();return g},onNodeNamesPropertyModify:function(c,b,d,g){"string"==typeof c&&(c=c.split(p));
a.isFunction(d)&&(d={set:d});c.forEach(function(a){s[a]||(s[a]={});"string"==typeof b&&(b=b.split(p));d.initAttr&&i.createTmpCache(a);b.forEach(function(b){s[a][b]||(s[a][b]=[],r[b]=!0);if(d.set){if(g)d.set.only=g;s[a][b].push(d.set)}d.initAttr&&i.content(a,b)});i.flushTmpCache()})},defineNodeNamesBooleanProperty:function(c,b,d){d||(d={});if(a.isFunction(d))d.set=d;f.defineNodeNamesProperty(c,b,{attr:{set:function(a){this.setAttribute(b,a);d.set&&d.set.call(this,!0)},get:function(){return null==this.getAttribute(b)?
n:b}},removeAttr:{value:function(){this.removeAttribute(b);d.set&&d.set.call(this,!1)}},reflect:!0,propType:"boolean",initAttr:d.initAttr||!1})},contentAttr:function(a,b,d){if(a.nodeName){if(d===n)return d=(a.attributes[b]||{}).value,null==d?n:d;"boolean"==typeof d?d?a.setAttribute(b,b):a.removeAttribute(b):a.setAttribute(b,d)}},activeLang:function(){var c=[],b={},d,e,i=/:\/\/|^\.*\//,m=function(b,d,c){return d&&c&&-1!==a.inArray(d,c.availabeLangs||[])?(b.loading=!0,c=c.langSrc,i.test(c)||(c=f.cfg.basePath+
c),f.loader.loadScript(c+d+".js",function(){b.langObj[d]?(b.loading=!1,l(b,!0)):a(function(){b.langObj[d]&&l(b,!0);b.loading=!1})}),!0):!1},w=function(a){b[a]&&b[a].forEach(function(a){a.callback()})},l=function(a,b){if(a.activeLang!=d&&a.activeLang!==e){var c=t[a.module].options;if(a.langObj[d]||e&&a.langObj[e])a.activeLang=d,a.callback(a.langObj[d]||a.langObj[e],d),w(a.module);else if(!b&&!m(a,d,c)&&!m(a,e,c)&&a.langObj[""]&&""!==a.activeLang)a.activeLang="",a.callback(a.langObj[""],d),w(a.module)}};
return function(m){if("string"==typeof m&&m!==d)d=m,e=d.split("-")[0],d==e&&(e=!1),a.each(c,function(a,b){l(b)});else if("object"==typeof m)if(m.register)b[m.register]||(b[m.register]=[]),b[m.register].push(m),m.callback();else{if(!m.activeLang)m.activeLang="";c.push(m);l(m)}return d}}()});a.each({defineNodeNamesProperty:"defineNodeNameProperty",defineNodeNamesProperties:"defineNodeNameProperties",createElements:"createElement"},function(a,b){f[a]=function(a,c,e,m){"string"==typeof a&&(a=a.split(p));
var i={};a.forEach(function(a){i[a]=f[b](a,c,e,m)});return i}});f.isReady("webshimLocalization",!0)});
(function(a,f){var h=a.webshims.browserVersion;if(!(a.browser.mozilla&&5<h)&&(!a.browser.msie||12>h&&7<h)){var k={article:"article",aside:"complementary",section:"region",nav:"navigation",address:"contentinfo"},n=function(a,f){a.getAttribute("role")||a.setAttribute("role",f)};a.webshims.addReady(function(h,p){a.each(k,function(l,f){for(var k=a(l,h).add(p.filter(l)),o=0,j=k.length;o<j;o++)n(k[o],f)});if(h===f){var o=f.getElementsByTagName("header")[0],r=f.getElementsByTagName("footer"),l=r.length;
o&&!a(o).closest("section, article")[0]&&n(o,"banner");l&&(o=r[l-1],a(o).closest("section, article")[0]||n(o,"contentinfo"))}})}})(jQuery,document);
(function(a,f,h){var k=f.audio&&f.video,n=!1,t=h.cfg.mediaelement,p;if(k){var o=document.createElement("video");f.videoBuffered="buffered"in o;n="loop"in o;h.capturingEvents("play,playing,waiting,paused,ended,durationchange,loadedmetadata,canplay,volumechange".split(","));f.videoBuffered||(h.addPolyfill("mediaelement-native-fix",{f:"mediaelement",test:f.videoBuffered,d:["dom-support"]}),h.reTest("mediaelement-native-fix"))}if(k&&!t.preferFlash){var r=function(l){var f=l.target.parentNode;!t.preferFlash&&
(a(l.target).is("audio, video")||f&&a("source:last",f)[0]==l.target)&&h.ready("mediaelement-swf",function(){setTimeout(function(){p&&!t.preferFlash&&!a(l.target).closest("audio, video").is(".nonnative-api-active")?(t.preferFlash=!0,document.removeEventListener("error",r,!0),a("audio, video").mediaLoad(),h.info("switching mediaelements option to 'preferFlash', due to an error with native player: "+l.target.src)):p||document.removeEventListener("error",r,!0)},20)})};document.addEventListener("error",
r,!0);a("audio, video").each(function(){this.error&&r({target:this})})}(!f.track||"number"!=typeof a("<track />")[0].readyState)&&h.ready("dom-support",function(){h.defineNodeNamesProperties(["track"],{readyState:{get:function(){return(a.prop(this,"track")||{readyState:0}).readyState},writeable:!1}},"prop")});f.track&&function(){var l=h.cfg.track,f=function(l){a(l.target).filter("track").each(s)},s=function(){if(!l.override&&3==a.prop(this,"readyState"))l.override=!0,h.reTest("track"),document.removeEventListener("error",
f,!0),h.error("track support was overwritten. Please check your vtt mime-type")},k=function(){document.addEventListener("error",f,!0);a("track").each(s)};l.override||(h.isReady("track")?k():a(k))}();h.register("mediaelement-core",function(a,h,s,o,r){p=swfobject.hasFlashPlayerVersion("9.0.115");var j=h.mediaelement,x=function(b,c){var b=a(b),d={src:b.attr("src")||"",elem:b,srcProp:b.prop("src")};if(!d.src)return d;var e=b.attr("type");if(e)d.type=e,d.container=a.trim(e.split(";")[0]);else if(c||(c=
b[0].nodeName.toLowerCase(),"source"==c&&(c=(b.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())),e=j.getTypeForSrc(d.src,c))d.type=e,d.container=e;if(e=b.attr("media"))d.media=e;return d},y=!p&&"postMessage"in s&&k,e=function(){h.ready("mediaelement-swf",function(){if(!j.createSWF)h.modules["mediaelement-swf"].test=a.noop,h.reTest(["mediaelement-swf"],k)})},i=function(){var b;return function(){!b&&y&&(b=!0,h.loader.loadScript("https://www.youtube.com/player_api"),a(function(){h.polyfill("mediaelement-yt")}))}}(),
u=function(){p?e():i();a(function(){h.loader.loadList(["track-ui"])})};h.addPolyfill("mediaelement-yt",{test:!y,d:["dom-support"]});j.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],'audio/ogg;codecs="opus"':"opus","audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":"mp4,mpg4,m4r,m4a,m4p,m4b,aac".split(","),"audio/wav":["wav"],"audio/3gpp":["3gp","3gpp"],"audio/webm":["webm"],"audio/fla":["flv","f4a","fla"],"application/x-mpegURL":["m3u8","m3u"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg",
"mpeg","mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],"video/webm":["webm"],"application/x-mpegURL":["m3u8","m3u"],"video/MP2T":["ts"]}};j.mimeTypes.source=a.extend({},j.mimeTypes.audio,j.mimeTypes.video);j.getTypeForSrc=function(b,c){if(-1!=b.indexOf("youtube.com/watch?")||-1!=b.indexOf("youtube.com/v/"))return"video/youtube";var b=b.split("?")[0].split("."),b=b[b.length-
1],d;a.each(j.mimeTypes[c],function(a,c){if(-1!==c.indexOf(b))return d=a,!1});return d};j.srces=function(b,c){b=a(b);if(c)b.removeAttr("src").removeAttr("type").find("source").remove(),a.isArray(c)||(c=[c]),c.forEach(function(a){var c=o.createElement("source");"string"==typeof a&&(a={src:a});c.setAttribute("src",a.src);a.type&&c.setAttribute("type",a.type);a.media&&c.setAttribute("media",a.media);b.append(c)});else{var c=[],d=b[0].nodeName.toLowerCase(),e=x(b,d);e.src?c.push(e):a("source",b).each(function(){e=
x(this,d);e.src&&c.push(e)});return c}};a.fn.loadMediaSrc=function(b,c){return this.each(function(){c!==r&&(a(this).removeAttr("poster"),c&&a.attr(this,"poster",c));j.srces(this,b);a(this).mediaLoad()})};j.swfMimeTypes="video/3gpp,video/x-msvideo,video/quicktime,video/x-m4v,video/mp4,video/m4p,video/x-flv,video/flv,audio/mpeg,audio/aac,audio/mp4,audio/x-m4a,audio/m4a,audio/mp3,audio/x-fla,audio/fla,youtube/flv,jwplayer/jwplayer,video/youtube".split(",");j.canThirdPlaySrces=function(b,c){var d="";
if(p||y)b=a(b),c=c||j.srces(b),a.each(c,function(a,b){if(b.container&&b.src&&(p&&-1!=j.swfMimeTypes.indexOf(b.container)||y&&"video/youtube"==b.container))return d=b,!1});return d};var c={};j.canNativePlaySrces=function(b,d){var e="";if(k){var b=a(b),g=(b[0].nodeName||"").toLowerCase();if(!c[g])return e;d=d||j.srces(b);a.each(d,function(a,d){if(d.type&&c[g].prop._supvalue.call(b[0],d.type))return e=d,!1})}return e};j.setError=function(b,c){c||(c="can't play sources");a(b).pause().data("mediaerror",
c);h.warn("mediaelementError: "+c);setTimeout(function(){a(b).data("mediaerror")&&a(b).trigger("mediaerror")},1)};var b=function(){var a;return function(c,d,e){h.ready(p?"mediaelement-swf":"mediaelement-yt",function(){j.createSWF?j.createSWF(c,d,e):a||(a=!0,u(),b(c,d,e))});!a&&y&&!j.createSWF&&i()}}(),d=function(a,c,e,g,i){e||!1!==e&&c&&"third"==c.isActive?(e=j.canThirdPlaySrces(a,g))?b(a,e,c):i?j.setError(a,!1):d(a,c,!1,g,!0):(e=j.canNativePlaySrces(a,g))?c&&"third"==c.isActive&&j.setActive(a,"html5",
c):i?(j.setError(a,!1),c&&"third"==c.isActive&&j.setActive(a,"html5",c)):d(a,c,!0,g,!0)},g=/^(?:embed|object|datalist)$/i,q=function(b,c){var e=h.data(b,"mediaelementBase")||h.data(b,"mediaelementBase",{}),i=j.srces(b),f=b.parentNode;clearTimeout(e.loadTimer);a.data(b,"mediaerror",!1);if(i.length&&f&&!(1!=f.nodeType||g.test(f.nodeName||"")))c=c||h.data(b,"mediaelement"),d(b,c,t.preferFlash||r,i)};a(o).bind("ended",function(b){var c=h.data(b.target,"mediaelement");(!n||c&&"html5"!=c.isActive||a.prop(b.target,
"loop"))&&setTimeout(function(){!a.prop(b.target,"paused")&&a.prop(b.target,"loop")&&a(b.target).prop("currentTime",0).play()},1)});n||h.defineNodeNamesBooleanProperty(["audio","video"],"loop");["audio","video"].forEach(function(b){var d=h.defineNodeNameProperty(b,"load",{prop:{value:function(){var a=h.data(this,"mediaelement");q(this,a);k&&(!a||"html5"==a.isActive)&&d.prop._supvalue&&d.prop._supvalue.apply(this,arguments)}}});c[b]=h.defineNodeNameProperty(b,"canPlayType",{prop:{value:function(d){var e=
"";k&&c[b].prop._supvalue&&(e=c[b].prop._supvalue.call(this,d),"no"==e&&(e=""));!e&&p&&(d=a.trim((d||"").split(";")[0]),-1!=j.swfMimeTypes.indexOf(d)&&(e="maybe"));return e}}})});h.onNodeNamesPropertyModify(["audio","video"],["src","poster"],{set:function(){var a=this,b=h.data(a,"mediaelementBase")||h.data(a,"mediaelementBase",{});clearTimeout(b.loadTimer);b.loadTimer=setTimeout(function(){q(a);a=null},9)}});s=function(){h.addReady(function(b,c){a("video, audio",b).add(c.filter("video, audio")).each(function(){a.browser.msie&&
8<h.browserVersion&&a.prop(this,"paused")&&!a.prop(this,"readyState")&&a(this).is('audio[preload="none"][controls]:not([autoplay])')?a(this).prop("preload","metadata").mediaLoad():q(this);if(k){var b,c,d=this,e=function(){var b=a.prop(d,"buffered");if(b){for(var c="",e=0,g=b.length;e<g;e++)c+=b.end(e);return c}},g=function(){var b=e();b!=c&&(c=b,a(d).triggerHandler("progress"))};a(this).bind("play loadstart progress",function(a){"progress"==a.type&&(c=e());clearTimeout(b);b=setTimeout(g,999)}).bind("emptied stalled mediaerror abort suspend",
function(a){"emptied"==a.type&&(c=!1);clearTimeout(b)})}})})};f.track?(h.defineProperty(TextTrack.prototype,"shimActiveCues",{get:function(){return this._shimActiveCues||this.activeCues}}),a(function(){h.polyfill("track")})):a(function(){h.loader.loadList(["track-ui"])});k?(h.isReady("mediaelement-core",!0),s(),h.ready("WINDOWLOAD mediaelement",u)):h.ready("mediaelement-swf",s)})})(jQuery,Modernizr,jQuery.webshims);
(function(a){var f=window.Modernizr,h=a.webshims,k=h.bugs,n=a('<form action="#" style="width: 1px; height: 1px; overflow: hidden;"><select name="b" required="" /><input type="date" required="" name="a" /><input type="submit" /></form>'),t=function(){if(n[0].querySelector)try{k.findRequired=!n[0].querySelector("select:required")}catch(a){k.findRequired=!1}};k.findRequired=!1;k.validationMessage=!1;k.valueAsNumberSet=!1;h.capturingEventPrevented=function(f){if(!f._isPolyfilled){var h=f.isDefaultPrevented,
k=f.preventDefault;f.preventDefault=function(){clearTimeout(a.data(f.target,f.type+"DefaultPrevented"));a.data(f.target,f.type+"DefaultPrevented",setTimeout(function(){a.removeData(f.target,f.type+"DefaultPrevented")},30));return k.apply(this,arguments)};f.isDefaultPrevented=function(){return!(!h.apply(this,arguments)&&!a.data(f.target,f.type+"DefaultPrevented"))};f._isPolyfilled=!0}};if(!f.formvalidation||k.bustedValidity)t();else if(h.capturingEvents(["input"]),h.capturingEvents(["invalid"],!0),
f.bugfreeformvalidation=!0,window.opera||a.browser.webkit||window.testGoodWithFix){var p=a("input",n).eq(0),o,r=function(a){h.loader.loadList(["dom-extend"]);h.ready("dom-extend",a)},l=function(k){var l=["form-extend","form-message","form-native-fix"];k&&(k.preventDefault(),k.stopImmediatePropagation());clearTimeout(o);setTimeout(function(){n&&(n.remove(),n=p=null)},9);if(!f.bugfreeformvalidation)h.addPolyfill("form-native-fix",{f:"forms",d:["form-extend"]}),h.modules["form-extend"].test=a.noop;h.isReady("form-number-date-api")&&
l.push("form-number-date-api");h.reTest(l);if(p)try{p.prop({disabled:!0,value:""}).prop("disabled",!1).is(":valid")&&r(function(){h.onNodeNamesPropertyModify(["input","textarea"],["disabled","readonly"],{set:function(f){!f&&this&&a.prop(this,"value",a.prop(this,"value"))}});h.onNodeNamesPropertyModify(["select"],["disabled","readonly"],{set:function(f){if(!f&&this)f=a(this).val(),(a("option:last-child",this)[0]||{}).selected=!0,a(this).val(f)}})})}catch(t){}(a.browser.opera||window.testGoodWithFix)&&
r(function(){var f=function(a){a.preventDefault()};["form","input","textarea","select"].forEach(function(k){var l=h.defineNodeNameProperty(k,"checkValidity",{prop:{value:function(){h.fromSubmit||a(this).bind("invalid.checkvalidity",f);h.fromCheckValidity=!0;var e=l.prop._supvalue.apply(this,arguments);h.fromSubmit||a(this).unbind("invalid.checkvalidity",f);h.fromCheckValidity=!1;return e}}})})})};n.appendTo("head");if(window.opera||window.testGoodWithFix){t();k.validationMessage=!p.prop("validationMessage");
if((f.inputtypes||{}).date){try{p.prop("valueAsNumber",0)}catch(v){}k.valueAsNumberSet="1970-01-01"!=p.prop("value")}p.prop("value","")}n.bind("submit",function(a){f.bugfreeformvalidation=!1;l(a)});o=setTimeout(function(){n&&n.triggerHandler("submit")},9);a("input, select",n).bind("invalid",l).filter('[type="submit"]').bind("click",function(a){a.stopImmediatePropagation()}).trigger("click")}})(jQuery);
jQuery.webshims.register("form-core",function(a,f,h,k,n,t){var p={radio:1},o={checkbox:1,radio:1},r=a([]),l=f.bugs,v=function(e){var e=a(e),i,f;i=r;if(p[e[0].type])f=e.prop("form"),i=(i=e[0].name)?f?a(f[i]):a(k.getElementsByName(i)).filter(function(){return!a.prop(this,"form")}):e,i=i.filter('[type="radio"]');return i},s=f.getContentValidationMessage=function(e,i,f){var c=a(e).data("errormessage")||e.getAttribute("x-moz-errormessage")||"";f&&c[f]&&(c=c[f]);"object"==typeof c&&(i=i||a.prop(e,"validity")||
{valid:1},i.valid||a.each(i,function(a,d){if(d&&"valid"!=a&&c[a])return c=c[a],!1}));if("object"==typeof c)c=c.defaultMessage;return c||""},A={number:1,range:1,date:1};a.extend(a.expr.filters,{"valid-element":function(e){return!(!a.prop(e,"willValidate")||!(a.prop(e,"validity")||{valid:1}).valid)},"invalid-element":function(e){return!(!a.prop(e,"willValidate")||(a.prop(e,"validity")||{valid:1}).valid)},"required-element":function(e){return!(!a.prop(e,"willValidate")||!a.prop(e,"required"))},"optional-element":function(e){return!!(a.prop(e,
"willValidate")&&!1===a.prop(e,"required"))},"in-range":function(e){if(!A[a.prop(e,"type")]||!a.prop(e,"willValidate"))return!1;e=a.prop(e,"validity");return!(!e||e.rangeOverflow||e.rangeUnderflow)},"out-of-range":function(e){if(!A[a.prop(e,"type")]||!a.prop(e,"willValidate"))return!1;e=a.prop(e,"validity");return!(!e||!e.rangeOverflow&&!e.rangeUnderflow)}});["valid","invalid","required","optional"].forEach(function(e){a.expr.filters[e]=a.expr.filters[e+"-element"]});a.expr.filters.focus=function(a){try{var i=
a.ownerDocument;return a===i.activeElement&&(!i.hasFocus||i.hasFocus())}catch(f){}return!1};var z=a.event.customEvent||{};(l.bustedValidity||l.findRequired||!Modernizr.bugfreeformvalidation)&&function(){var e=a.find,i=a.find.matchesSelector,f=/(\:valid|\:invalid|\:optional|\:required|\:in-range|\:out-of-range)(?=[\s\[\~\.\+\>\:\#*]|$)/ig,c=function(a){return a+"-element"};a.find=function(){var a=Array.prototype.slice,d=function(d){var g=arguments,g=a.call(g,1,g.length);g.unshift(d.replace(f,c));return e.apply(this,
g)},g;for(g in e)e.hasOwnProperty(g)&&(d[g]=e[g]);return d}();if(!Modernizr.prefixed||Modernizr.prefixed("matchesSelector",k.documentElement))a.find.matchesSelector=function(a,d){d=d.replace(f,c);return i.call(this,a,d)}}();var j=a.prop,x={selectedIndex:1,value:1,checked:1,disabled:1,readonly:1};a.prop=function(e,i,f){var c=j.apply(this,arguments);if(e&&"form"in e&&x[i]&&f!==n&&a(e).hasClass("form-ui-invalid")&&(a.prop(e,"validity")||{valid:1}).valid)a(e).getShadowElement().removeClass("form-ui-invalid"),
"checked"==i&&f&&v(e).not(e).removeClass("form-ui-invalid").removeAttr("aria-invalid");return c};var y=function(e,i){var f;a.each(e,function(c,b){if(b)return f="customError"==c?a.prop(i,"validationMessage"):c,!1});return f};a(k).bind(t.validityUIEvents||"focusout change refreshvalidityui",function(e){var f,h;if(e.target&&(f=a(e.target).getNativeElement()[0],"submit"!=f.type&&a.prop(f,"willValidate"))){h=a.data(f,"webshimsswitchvalidityclass");var c=function(){var b=a.prop(f,"validity"),c=a(f).getShadowElement(),
g,h,m,j;a(f).trigger("refreshCustomValidityRules");b.valid?c.hasClass("form-ui-valid")||(g="form-ui-valid",h="form-ui-invalid",j="changedvaliditystate",m="changedvalid",o[f.type]&&f.checked&&v(f).not(f).removeClass(h).addClass(g).removeAttr("aria-invalid"),a.removeData(f,"webshimsinvalidcause")):(b=y(b,f),a.data(f,"webshimsinvalidcause")!=b&&(a.data(f,"webshimsinvalidcause",b),j="changedvaliditystate"),c.hasClass("form-ui-invalid")||(g="form-ui-invalid",h="form-ui-valid",o[f.type]&&!f.checked&&v(f).not(f).removeClass(h).addClass(g),
m="changedinvalid"));g&&(c.addClass(g).removeClass(h),setTimeout(function(){a(f).trigger(m)},0));j&&setTimeout(function(){a(f).trigger(j)},0);a.removeData(e.target,"webshimsswitchvalidityclass")};h&&clearTimeout(h);"refreshvalidityui"==e.type?c():a.data(e.target,"webshimsswitchvalidityclass",setTimeout(c,9))}});z.changedvaliditystate=!0;z.refreshCustomValidityRules=!0;z.changedvalid=!0;z.changedinvalid=!0;z.refreshvalidityui=!0;f.triggerInlineForm=function(e,f){a(e).trigger(f)};f.modules["form-core"].getGroupElements=
v;l=function(){f.scrollRoot=a.browser.webkit||"BackCompat"==k.compatMode?a(k.body):a(k.documentElement)};l();f.ready("DOM",l);f.getRelOffset=function(e,f){var e=a(e),h=a(f).offset(),c;a.swap(a(e)[0],{visibility:"hidden",display:"inline-block",left:0,top:0},function(){c=e.offset()});h.top-=c.top;h.left-=c.left;return h};f.validityAlert=function(){var e=!a.browser.msie||7<parseInt(a.browser.version,10)?"span":"label",i,j=!1,c=!1,b,d={hideDelay:5E3,showFor:function(e,f,m,k){d._create();var e=a(e),l=
a(e).getShadowElement(),n=d.getOffsetFromBody(l);d.clear();k?this.hide():(this.getMessage(e,f),this.position(l,n),i.css({fontSize:e.css("fontSize"),fontFamily:e.css("fontFamily")}),this.show(),this.hideDelay&&(j=setTimeout(b,this.hideDelay)),a(h).bind("resize.validityalert orientationchange.validityalert emchange.validityalert",function(){clearTimeout(c);c=setTimeout(function(){d.position(l)},9)}));m||this.setFocus(l,n)},getOffsetFromBody:function(a){return f.getRelOffset(i,a)},setFocus:function(c,
d){var h=a(c).getShadowFocusElement(),j=f.scrollRoot.scrollTop(),l=(d||h.offset()).top-30,n;f.getID&&"label"==e&&i.attr("for",f.getID(h));j>l&&(f.scrollRoot.animate({scrollTop:l-5},{queue:!1,duration:Math.max(Math.min(600,1.5*(j-l)),80)}),n=!0);try{h[0].focus()}catch(o){}n&&(f.scrollRoot.scrollTop(j),setTimeout(function(){f.scrollRoot.scrollTop(j)},0));setTimeout(function(){a(k).bind("focusout.validityalert",b)},10)},getMessage:function(b,c){c||(c=s(b[0])||b.prop("validationMessage"));c?a("span.va-box",
i).text(c):this.hide()},position:function(b,c){c=c?a.extend({},c):d.getOffsetFromBody(b);c.top+=b.outerHeight();i.css(c)},show:function(){"none"===i.css("display")&&i.css({opacity:0}).show();i.addClass("va-visible").fadeTo(400,1)},hide:function(){i.removeClass("va-visible").fadeOut()},clear:function(){clearTimeout(!1);clearTimeout(j);a(k).unbind(".validityalert");a(h).unbind(".validityalert");i.stop().removeAttr("for")},_create:function(){if(!i)i=d.errorBubble=a("<"+e+' class="validity-alert-wrapper" role="alert"><span  class="validity-alert"><span class="va-arrow"><span class="va-arrow-box"></span></span><span class="va-box"></span></span></'+
e+">").css({position:"absolute",display:"none"}),f.ready("DOM",function(){i.appendTo("body");a.fn.bgIframe&&a.browser.msie&&7>parseInt(a.browser.version,10)&&i.bgIframe()})}};b=a.proxy(d,"hide");return d}();(function(){var e,f=[],h;a(k).bind("invalid",function(c){if(!c.wrongWebkitInvalid){var b=a(c.target),d=b.getShadowElement();d.hasClass("form-ui-invalid")||(d.addClass("form-ui-invalid").removeClass("form-ui-valid"),setTimeout(function(){a(c.target).trigger("changedinvalid").trigger("changedvaliditystate")},
0));if(!e)e=a.Event("firstinvalid"),e.isInvalidUIPrevented=c.isDefaultPrevented,d=a.Event("firstinvalidsystem"),a(k).triggerHandler(d,{element:c.target,form:c.target.form,isInvalidUIPrevented:c.isDefaultPrevented}),b.trigger(e);e&&e.isDefaultPrevented()&&c.preventDefault();f.push(c.target);c.extraData="fix";clearTimeout(h);h=setTimeout(function(){var b={type:"lastinvalid",cancelable:!1,invalidlist:a(f)};e=!1;f=[];a(c.target).trigger(b,b)},9);d=b=null}})})();a.fn.getErrorMessage=function(){var e="",
f=this[0];f&&(e=s(f)||a.prop(f,"customValidationMessage")||a.prop(f,"validationMessage"));return e};t.replaceValidationUI&&f.ready("DOM forms",function(){a(k).bind("firstinvalid",function(e){e.isInvalidUIPrevented()||(e.preventDefault(),a.webshims.validityAlert.showFor(e.target,a(e.target).prop("customValidationMessage")))})})});
