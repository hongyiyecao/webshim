(function(i,l,g){var j=l.audio&&l.video,r=!1,n=g.cfg.mediaelement,k;if(j){var o=document.createElement("video");l.videoBuffered="buffered"in o;r="loop"in o;g.capturingEvents("play,playing,waiting,paused,ended,durationchange,loadedmetadata,canplay,volumechange".split(","));l.videoBuffered||(g.addPolyfill("mediaelement-native-fix",{f:"mediaelement",test:l.videoBuffered,d:["dom-support"]}),g.reTest("mediaelement-native-fix"))}if(j&&!n.preferFlash){var m=function(c){var d=c.target.parentNode;!n.preferFlash&&
(i(c.target).is("audio, video")||d&&i("source:last",d)[0]==c.target)&&g.ready("mediaelement-swf",function(){setTimeout(function(){k&&!n.preferFlash&&!i(c.target).closest("audio, video").is(".nonnative-api-active")?(n.preferFlash=!0,document.removeEventListener("error",m,!0),i("audio, video").mediaLoad(),g.info("switching mediaelements option to 'preferFlash', due to an error with native player: "+c.target.src)):k||document.removeEventListener("error",m,!0)},20)})};document.addEventListener("error",
m,!0);i("audio, video").each(function(){this.error&&m({target:this})})}(!l.track||"number"!=typeof i("<track />")[0].readyState)&&g.ready("dom-support",function(){g.defineNodeNamesProperties(["track"],{readyState:{get:function(){return(i.prop(this,"track")||{readyState:0}).readyState},writeable:!1}},"prop")});l.track&&function(){var c=g.cfg.track,d=function(c){i(c.target).filter("track").each(j)},j=function(){if(!c.override&&3==i.prop(this,"readyState"))c.override=!0,g.reTest("track"),document.removeEventListener("error",
d,!0),g.error("track support was overwritten. Please check your vtt mime-type")},k=function(){document.addEventListener("error",d,!0);i("track").each(j)};c.override||(g.isReady("track")?k():i(k))}();g.register("mediaelement-core",function(c,d,g,i,m){k=swfobject.hasFlashPlayerVersion("9.0.115");var f=d.mediaelement,o=function(a,b){var a=c(a),h={src:a.attr("src")||"",elem:a,srcProp:a.prop("src")};if(!h.src)return h;var e=a.attr("type");if(e)h.type=e,h.container=c.trim(e.split(";")[0]);else if(b||(b=
a[0].nodeName.toLowerCase(),"source"==b&&(b=(a.closest("video, audio")[0]||{nodeName:"video"}).nodeName.toLowerCase())),e=f.getTypeForSrc(h.src,b))h.type=e,h.container=e;if(e=a.attr("media"))h.media=e;return h},p=!k&&"postMessage"in g&&j,x=function(){d.ready("mediaelement-swf",function(){if(!f.createSWF)d.modules["mediaelement-swf"].test=c.noop,d.reTest(["mediaelement-swf"],j)})},u=function(){var a;return function(){!a&&p&&(a=!0,d.loader.loadScript("https://www.youtube.com/player_api"),c(function(){d.polyfill("mediaelement-yt")}))}}(),
v=function(){k?x():u();c(function(){d.loader.loadList(["track-ui"])})};d.addPolyfill("mediaelement-yt",{test:!p,d:["dom-support"]});f.mimeTypes={audio:{"audio/ogg":["ogg","oga","ogm"],'audio/ogg;codecs="opus"':"opus","audio/mpeg":["mp2","mp3","mpga","mpega"],"audio/mp4":"mp4,mpg4,m4r,m4a,m4p,m4b,aac".split(","),"audio/wav":["wav"],"audio/3gpp":["3gp","3gpp"],"audio/webm":["webm"],"audio/fla":["flv","f4a","fla"],"application/x-mpegURL":["m3u8","m3u"]},video:{"video/ogg":["ogg","ogv","ogm"],"video/mpeg":["mpg",
"mpeg","mpe"],"video/mp4":["mp4","mpg4","m4v"],"video/quicktime":["mov","qt"],"video/x-msvideo":["avi"],"video/x-ms-asf":["asf","asx"],"video/flv":["flv","f4v"],"video/3gpp":["3gp","3gpp"],"video/webm":["webm"],"application/x-mpegURL":["m3u8","m3u"],"video/MP2T":["ts"]}};f.mimeTypes.source=c.extend({},f.mimeTypes.audio,f.mimeTypes.video);f.getTypeForSrc=function(a,b){if(-1!=a.indexOf("youtube.com/watch?")||-1!=a.indexOf("youtube.com/v/"))return"video/youtube";var a=a.split("?")[0].split("."),a=a[a.length-
1],h;c.each(f.mimeTypes[b],function(b,c){if(-1!==c.indexOf(a))return h=b,!1});return h};f.srces=function(a,b){a=c(a);if(b)a.removeAttr("src").removeAttr("type").find("source").remove(),c.isArray(b)||(b=[b]),b.forEach(function(b){var c=i.createElement("source");"string"==typeof b&&(b={src:b});c.setAttribute("src",b.src);b.type&&c.setAttribute("type",b.type);b.media&&c.setAttribute("media",b.media);a.append(c)});else{var b=[],h=a[0].nodeName.toLowerCase(),e=o(a,h);e.src?b.push(e):c("source",a).each(function(){e=
o(this,h);e.src&&b.push(e)});return b}};c.fn.loadMediaSrc=function(a,b){return this.each(function(){b!==m&&(c(this).removeAttr("poster"),b&&c.attr(this,"poster",b));f.srces(this,a);c(this).mediaLoad()})};f.swfMimeTypes="video/3gpp,video/x-msvideo,video/quicktime,video/x-m4v,video/mp4,video/m4p,video/x-flv,video/flv,audio/mpeg,audio/aac,audio/mp4,audio/x-m4a,audio/m4a,audio/mp3,audio/x-fla,audio/fla,youtube/flv,jwplayer/jwplayer,video/youtube".split(",");f.canThirdPlaySrces=function(a,b){var h="";
if(k||p)a=c(a),b=b||f.srces(a),c.each(b,function(a,b){if(b.container&&b.src&&(k&&-1!=f.swfMimeTypes.indexOf(b.container)||p&&"video/youtube"==b.container))return h=b,!1});return h};var q={};f.canNativePlaySrces=function(a,b){var h="";if(j){var a=c(a),e=(a[0].nodeName||"").toLowerCase();if(!q[e])return h;b=b||f.srces(a);c.each(b,function(b,c){if(c.type&&q[e].prop._supvalue.call(a[0],c.type))return h=c,!1})}return h};f.setError=function(a,b){b||(b="can't play sources");c(a).pause().data("mediaerror",
b);d.warn("mediaelementError: "+b);setTimeout(function(){c(a).data("mediaerror")&&c(a).trigger("mediaerror")},1)};var w=function(){var a;return function(b,c,e){d.ready(k?"mediaelement-swf":"mediaelement-yt",function(){f.createSWF?f.createSWF(b,c,e):a||(a=!0,v(),w(b,c,e))});!a&&p&&!f.createSWF&&u()}}(),s=function(a,b,c,e,d){c||!1!==c&&b&&"third"==b.isActive?(c=f.canThirdPlaySrces(a,e))?w(a,c,b):d?f.setError(a,!1):s(a,b,!1,e,!0):(c=f.canNativePlaySrces(a,e))?b&&"third"==b.isActive&&f.setActive(a,"html5",
b):d?(f.setError(a,!1),b&&"third"==b.isActive&&f.setActive(a,"html5",b)):s(a,b,!0,e,!0)},y=/^(?:embed|object|datalist)$/i,t=function(a,b){var h=d.data(a,"mediaelementBase")||d.data(a,"mediaelementBase",{}),e=f.srces(a),g=a.parentNode;clearTimeout(h.loadTimer);c.data(a,"mediaerror",!1);if(e.length&&g&&!(1!=g.nodeType||y.test(g.nodeName||"")))b=b||d.data(a,"mediaelement"),s(a,b,n.preferFlash||m,e)};c(i).bind("ended",function(a){var b=d.data(a.target,"mediaelement");(!r||b&&"html5"!=b.isActive||c.prop(a.target,
"loop"))&&setTimeout(function(){!c.prop(a.target,"paused")&&c.prop(a.target,"loop")&&c(a.target).prop("currentTime",0).play()},1)});r||d.defineNodeNamesBooleanProperty(["audio","video"],"loop");["audio","video"].forEach(function(a){var b=d.defineNodeNameProperty(a,"load",{prop:{value:function(){var a=d.data(this,"mediaelement");t(this,a);j&&(!a||"html5"==a.isActive)&&b.prop._supvalue&&b.prop._supvalue.apply(this,arguments)}}});q[a]=d.defineNodeNameProperty(a,"canPlayType",{prop:{value:function(b){var e=
"";j&&q[a].prop._supvalue&&(e=q[a].prop._supvalue.call(this,b),"no"==e&&(e=""));!e&&k&&(b=c.trim((b||"").split(";")[0]),-1!=f.swfMimeTypes.indexOf(b)&&(e="maybe"));return e}}})});d.onNodeNamesPropertyModify(["audio","video"],["src","poster"],{set:function(){var a=this,b=d.data(a,"mediaelementBase")||d.data(a,"mediaelementBase",{});clearTimeout(b.loadTimer);b.loadTimer=setTimeout(function(){t(a);a=null},9)}});g=function(){d.addReady(function(a,b){c("video, audio",a).add(b.filter("video, audio")).each(function(){c.browser.msie&&
8<d.browserVersion&&c.prop(this,"paused")&&!c.prop(this,"readyState")&&c(this).is('audio[preload="none"][controls]:not([autoplay])')?c(this).prop("preload","metadata").mediaLoad():t(this);if(j){var a,b,f=this,g=function(){var a=c.prop(f,"buffered");if(a){for(var b="",d=0,e=a.length;d<e;d++)b+=a.end(d);return b}},i=function(){var a=g();a!=b&&(b=a,c(f).triggerHandler("progress"))};c(this).bind("play loadstart progress",function(c){"progress"==c.type&&(b=g());clearTimeout(a);a=setTimeout(i,999)}).bind("emptied stalled mediaerror abort suspend",
function(c){"emptied"==c.type&&(b=!1);clearTimeout(a)})}})})};l.track?(d.defineProperty(TextTrack.prototype,"shimActiveCues",{get:function(){return this._shimActiveCues||this.activeCues}}),c(function(){d.polyfill("track")})):c(function(){d.loader.loadList(["track-ui"])});j?(d.isReady("mediaelement-core",!0),g(),d.ready("WINDOWLOAD mediaelement",v)):d.ready("mediaelement-swf",g)})})(jQuery,Modernizr,jQuery.webshims);
