jQuery.webshims.register("track",function(f,e,q,r){var h=e.mediaelement;(new Date).getTime();var t={subtitles:1,captions:1},s=function(){e.error("not implemented yet")},j=function(a){var b={};a.addEventListener=function(a,d){b[a]&&e.error("always use $.bind to the shimed event: "+a+" already bound fn was: "+b[a]+" your fn was: "+d);b[a]=d};a.removeEventListener=function(a,d){b[a]&&b[a]!=d&&e.error("always use $.bind/$.unbind to the shimed event: "+a+" already bound fn was: "+b[a]+" your fn was: "+
d);b[a]&&delete b[a]};return a},u={getCueById:s},v={shimActiveCues:null,_shimActiveCues:null,activeCues:null,cues:null,kind:"subtitles",label:"",language:"",mode:0,readyState:0,oncuechange:null,toString:function(){return"[object TextTrack]"},addCue:function(a){if(this.cues){var b=this.cues[this.cues.length-1];b&&b.startTime>a.startTime&&e.error("cue startTime higher than previous cue's startTime")}else this.cues=h.createCueList();a.track&&e.error("cue already part of a track element");a.track=this;
this.cues.push(a)},removeCue:s,DISABLED:0,OFF:0,HIDDEN:1,SHOWING:2,ERROR:3,LOADED:2,LOADING:1,NONE:0},w=["kind","label","srclang"],x=Function.prototype.call.bind(Object.prototype.hasOwnProperty),m=function(){var a=f.prop(this,"textTracks"),b=e.data(this,"mediaelementBase"),g=a.splice(0),d,c;f("track",this).each(function(){a.push(f.prop(this,"track"))});if(b.scriptedTextTracks)for(d=0,c=b.scriptedTextTracks.length;d<c;d++)a.push(b.scriptedTextTracks[d]);for(d=0,c=g.length;d<c;d++)if(-1==a.indexOf(g[d]))g[d].mode=
0;g=null},n=function(a,b){var g,d;b||(b=e.data(a,"trackData"));if(b&&!b.isTriggering)b.isTriggering=!0,g=(b.track||{}).mode,d=(b.track||{}).kind,setTimeout(function(){if(g!==(b.track||{}).mode||d!=(b.track||{}).kind)(b.track||{}).readyState?f(a).parent().triggerHandler("updatetrackdisplay"):f(a).triggerHandler("checktrackmode");b.isTriggering=!1},9)},o=f("<div />")[0];q.TextTrackCue=function(a,b,g){3!=arguments.length&&e.error("wrong arguments.length for TextTrackCue.constructor");this.startTime=
a;this.endTime=b;this.text=g;this.id="";this.pauseOnExit=!1;j(this)};q.TextTrackCue.prototype={onenter:null,onexit:null,pauseOnExit:!1,getCueAsHTML:function(){var a="",b="",g=r.createDocumentFragment(),d;if(!x(this,"getCueAsHTML"))d=this.getCueAsHTML=function(){var c,d;if(a!=this.text){a=this.text;b=h.parseCueTextToHTML(a);o.innerHTML=b;for(c=0,d=o.childNodes.length;c<d;c++)g.appendChild(o.childNodes[c].cloneNode(!0))}return g.cloneNode(!0)};return d?d.apply(this,arguments):g.cloneNode(!0)},track:null,
id:""};h.createCueList=function(){return f.extend([],u)};h.parseCueTextToHTML=function(){var a=/(<\/?[^>]+>)/ig,b=/^(?:c|v|ruby|rt|b|i|u)/,g=/\<\s*\//,d=function(a,b,c,d){g.test(d)?a="</"+a+">":(c.splice(0,1),a="<"+a+" "+b+'="'+c.join(" ").replace(/\"/g,"&quot;")+'">');return a},c=function(a){var c=a.replace(/[<\/>]+/ig,"").split(/[\s\.]+/);c[0]&&(c[0]=c[0].toLowerCase(),b.test(c[0])?"c"==c[0]?(c.splice(0,1),a=d("span","class",c,a)):"v"==c[0]&&(a=d("q","title",c,a)):a="");return a};return function(b){return b.replace(a,
c)}}();h.loadTextTrack=function(a,b,g,d){var c=g.track,k=function(){var d=f.prop(b,"src"),g,i;if(c.mode&&d&&f.attr(b,"src")&&(f(a).unbind("play playing timeupdate updatetrackdisplay",k),f(b).unbind("checktrackmode",k),!c.readyState)){g=function(){c.readyState=3;f(b).triggerHandler("error")};c.readyState=1;try{c.cues=h.createCueList(),c.activeCues=c.shimActiveCues=c._shimActiveCues=h.createCueList(),i=f.ajax({dataType:"text",url:d,success:function(d){"text/vtt"!=i.getResponseHeader("content-type")&&
e.warn("set the mime-type of your WebVTT files to text/vtt. see: http://dev.w3.org/html5/webvtt/#text/vtt");h.parseCaptions(d,c,function(d){d&&"length"in d?(c.readyState=2,f(b).triggerHandler("load"),f(a).triggerHandler("updatetrackdisplay")):g()})},error:g})}catch(l){g(),e.warn(l)}}};c.readyState=0;c.shimActiveCues=null;c._shimActiveCues=null;c.activeCues=null;c.cues=null;f(a).unbind("play playing timeupdate updatetrackdisplay",k);f(b).unbind("checktrackmode",k);f(a).bind("play playing timeupdate updatetrackdisplay",
k);f(b).bind("checktrackmode",k);if(d)c.mode=t[c.kind]?2:1,k()};h.createTextTrack=function(a,b){var g,d;if(b.nodeName&&(d=e.data(b,"trackData")))n(b,d),g=d.track;if(!g)g=j(e.objectCreate(v)),w.forEach(function(a){var d=f.prop(b,a);d&&("srclang"==a&&(a="language"),g[a]=d)}),b.nodeName?(d=e.data(b,"trackData",{track:g}),h.loadTextTrack(a,b,d,f.prop(b,"default"))):(g.cues=h.createCueList(),g.activeCues=g._shimActiveCues=g.shimActiveCues=h.createCueList(),g.mode=1,g.readyState=2);return g};h.parseCaptionChunk=
function(){var a=/^(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s+\-\-\>\s+(\d{2})?:?(\d{2}):(\d{2})\.(\d+)\s*(.*)/,b=/^(DEFAULTS|DEFAULT)\s+\-\-\>\s+(.*)/g,g=/^(STYLE|STYLES)\s+\-\-\>\s*\n([\s\S]*)/g,d=/^(COMMENT|COMMENTS)\s+\-\-\>\s+(.*)/g;return function(c){var f,e,h,i;if(b.exec(c)||g.exec(c)||d.exec(c))return null;for(c=c.split(/\n/g);!c[0].replace(/\s+/ig,"").length&&0<c.length;)c.shift();for(c[0].match(/^\s*[a-z0-9]+\s*$/ig)&&(h=""+c.shift().replace(/\s*/ig,""));0<c.length;){if(i=a.exec(c[0]))e=i.slice(1),
f=parseInt(3600*(e[0]||0),10)+parseInt(60*(e[1]||0),10)+parseInt(e[2]||0,10)+parseFloat("0."+(e[3]||0)),e=parseInt(3600*(e[4]||0),10)+parseInt(60*(e[5]||0),10)+parseInt(e[6]||0,10)+parseFloat("0."+(e[7]||0));c=c.slice(0,0).concat(c.slice(1));break}if(!f&&!e)return null;c=c.join("\n");f=new TextTrackCue(f,e,c);if(h)f.id=h;return f}}();h.parseCaptions=function(a,b,g){h.createCueList();var d,c,f,p,j;if(a)f=/^WEBVTT(\s*FILE)?/ig,c=function(i,l){for(;i<l;i++){d=a[i];if(f.test(d))j=!0;else if(d.replace(/\s*/ig,
"").length){if(!j){e.error("please use WebVTT format. This is the standard");g(null);break}(d=h.parseCaptionChunk(d,i))&&b.addCue(d)}if(p<(new Date).getTime()-9){i++;setTimeout(function(){p=(new Date).getTime();c(i,l)},90);break}}i>=l&&(j||e.error("please use WebVTT format. This is the standard"),g(b.cues))},a=a.replace(/\r\n/g,"\n"),setTimeout(function(){a=a.replace(/\r/g,"\n");setTimeout(function(){p=(new Date).getTime();a=a.split(/\n\n+/g);c(0,a.length)},9)},9);else throw Error("Required parameter captionData not supplied.");
};h.createTrackList=function(a){a=e.data(a,"mediaelementBase")||e.data(a,"mediaelementBase",{});if(!a.textTracks)a.textTracks=[],e.defineProperties(a.textTracks,{onaddtrack:{value:null}}),j(a.textTracks);return a.textTracks};Modernizr.track||(e.defineNodeNamesBooleanProperty(["track"],"default"),e.reflectProperties(["track"],["srclang","label"]),e.defineNodeNameProperties("track",{src:{reflect:!0,propType:"src"}}));e.defineNodeNameProperties("track",{kind:{attr:Modernizr.track?{set:function(a){var b=
e.data(this,"trackData");this.setAttribute("data-kind",a);if(b)b.attrKind=a},get:function(){var a=e.data(this,"trackData");return a&&"attrKind"in a?a.attrKind:this.getAttribute("kind")}}:{},reflect:!0,propType:"enumarated",defaultValue:"subtitles",limitedTo:["subtitles","captions","descriptions","chapters","metadata"]}});e.onNodeNamesPropertyModify("track","kind",function(){var a=e.data(this,"trackData");if(a)a.track.kind=f.prop(this,"kind"),n(this,a)});e.onNodeNamesPropertyModify("track","src",function(a){if(a){var a=
e.data(this,"trackData"),b;a&&(b=f(this).closest("video, audio"),b[0]&&h.loadTextTrack(b,this,a))}});e.defineNodeNamesProperties(["track"],{ERROR:{value:3},LOADED:{value:2},LOADING:{value:1},NONE:{value:0},readyState:{get:function(){return(f.prop(this,"track")||{readyState:0}).readyState},writeable:!1},track:{get:function(){return h.createTextTrack(f(this).closest("audio, video")[0],this)},writeable:!1}},"prop");e.defineNodeNamesProperties(["audio","video"],{textTracks:{get:function(){f("track",this).each(function(){n(this)});
return h.createTrackList(this)},writeable:!1},addTextTrack:{value:function(a,b,f){a=h.createTextTrack(this,{kind:a||"",label:b||"",srclang:f||""});b=e.data(this,"mediaelementBase")||e.data(this,"mediaelementBase",{});if(!b.scriptedTextTracks)b.scriptedTextTracks=[];b.scriptedTextTracks.push(a);m.call(this);return a}}},"prop");f(r).bind("emptied",function(a){f(a.target).is("audio, video")&&setTimeout(function(){m.call(a.target)},9)});f("<span />");e.addReady(function(a,b){f("video, audio",a).add(b.filter("video, audio, track").closest("audio, video")).each(m).each(function(){if(Modernizr.track){var a=
this.textTracks;f.prop(this,"textTracks").length!=a.length&&e.error("textTracks couldn't be copied");f("track",this).each(function(){var a=f.prop(this,"track"),b=this.track,e,g;if(b){e=f.prop(this,"kind");g=b.readyState||this.readyState;if(b.mode||g)a.mode=b.mode;if("descriptions"!=e)b.mode=0,this.kind="metadata",f(this).attr({kind:e})}}).bind("load error",function(a){a.originalEvent&&a.stopImmediatePropagation()})}})});Modernizr.track&&f("video, audio").trigger("trackapichange")});
