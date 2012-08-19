jQuery.webshims.register("track-ui",function(f,h,l){var i=h.cfg.track,k={subtitles:1,captions:1},j={update:function(a,d){if(a.activeCues.length){if(!this.compareArray(a.displayedActiveCues,a.activeCues)){a.displayedActiveCues=a.activeCues;if(!a.trackDisplay)a.trackDisplay=f('<div class="cue-display"></div>').insertAfter(d),this.addEvents(a,d);a.hasDirtyTrackDisplay&&d.triggerHandler("forceupdatetrackdisplay");this.showCues(a)}}else this.hide(a)},showCues:function(a){var d=f('<span class="cue-wrapper" />');
f.each(a.displayedActiveCues,function(a,b){d.append(f('<span class="cue" />').html(b.getCueAsHTML()))});a.trackDisplay.html(d)},compareArray:function(a,d){var g=!0,b=0,c=a.length;if(c!=d.length)g=!1;else for(;b<c;b++)if(a[b]!=d[b]){g=!1;break}return g},addEvents:function(a,d){if(i.positionDisplay){var g,b=function(b){if(a.displayedActiveCues.length||!0===b){a.trackDisplay.css({display:"none"});var c=d.getShadowElement();c.offsetParent();var b=c.innerHeight(),g=c.innerWidth(),c=c.position();a.trackDisplay.css({left:c.left,
width:g,height:b-45,top:c.top,display:"block"});a.trackDisplay.css("fontSize",Math.max(Math.round(b/30),7));console.log(b/30,Math.max(Math.round(b/30),8));a.hasDirtyTrackDisplay=!1}else a.hasDirtyTrackDisplay=!0},c=function(a){clearTimeout(g);g=setTimeout(b,a&&"resize"==a.type?99:9)},e=function(){b(!0)};d.bind("playerdimensionchange mediaelementapichange updatetrackdisplay updatemediaelementdimensions swfstageresize",c);f(l).bind("resize emchange",c);d.bind("forceupdatetrackdisplay",e);e()}},hide:function(a){if(a.trackDisplay&&
a.displayedActiveCues.length)a.displayedActiveCues=[],a.trackDisplay.empty()}};h.mediaelement.trackDisplay=j;h.mediaelement.getActiveCue=function(a,d,g,b){if(!a._lastFoundCue)a._lastFoundCue={index:0,time:0};if(Modernizr.track&&!a._shimActiveCues)a._shimActiveCues=[];for(var c=0,e;c<a.shimActiveCues.length;c++)e=a.shimActiveCues[c],e.startTime>g||e.endTime<g?(a.shimActiveCues.splice(c,1),c--,e.pauseOnExit&&f(d).pause(),f(a).triggerHandler("cuechange"),f(e).triggerHandler("exit")):1<a.mode&&k[a.kind]&&
-1==f.inArray(e,b.activeCues)&&b.activeCues.push(e);d=a.cues.length;for(c=a._lastFoundCue.time<g?a._lastFoundCue.index:0;c<d;c++){e=a.cues[c];if(e.startTime<=g&&e.endTime>=g&&-1==f.inArray(e,a.shimActiveCues))a.shimActiveCues.push(e),1<a.mode&&k[a.kind]&&b.activeCues.push(e),f(a).triggerHandler("cuechange"),f(e).triggerHandler("enter"),a._lastFoundCue.time=g,a._lastFoundCue.index=c;if(e.startTime>g)break}};!i.override&&Modernizr.track&&function(){var a,d=function(b){a||setTimeout(function(){a=!0;
f(b).triggerHandler("updatetrackdisplay");a=!1},9)},g=h.defineNodeNameProperty("track","track",{prop:{get:function(){d(f(this).parent("audio, video"));return g.prop._supget.apply(this,arguments)}}});["audio","video"].forEach(function(a){var c,g;g=h.defineNodeNameProperty(a,"textTracks",{prop:{get:function(){d(this);return g.prop._supget.apply(this,arguments)}}});c=h.defineNodeNameProperty(a,"addTextTrack",{prop:{value:function(){d(this);return c.prop._supvalue.apply(this,arguments)}}})})}();h.addReady(function(a,
d){f("video",a).add(d.filter("video")).each(function(){var a,b=f(this),c,d=function(){b.unbind(".trackview").bind("play.trackview timeupdate.trackview updatetrackdisplay.trackview",function(){var d,e;if(!a||!c)if(a=b.prop("textTracks"),c=h.data(b[0],"mediaelementBase")||h.data(b[0],"mediaelementBase",{}),!c.displayedActiveCues)c.displayedActiveCues=[];if(a&&((e=b.prop("currentTime"))||0===e)){c.activeCues=[];for(var f=0,i=a.length;f<i;f++)d=a[f],0<d.mode&&d.cues&&d.cues.length&&h.mediaelement.getActiveCue(d,
b,e,c);j.update(c,b)}})};!i.override&&Modernizr.track?b.bind("mediaelementapichange trackapichange",function(){c=a=!1;if(i.override||!Modernizr.track||b.is(".nonnative-api-active"))d();else{if(!a||!c)a=b.prop("textTracks"),c=h.data(b[0],"mediaelementBase")||h.data(b[0],"mediaelementBase",{});f.each(a,function(a,b){j.hide(b,c);b._shimActiveCues&&delete b._shimActiveCues});b.unbind(".trackview")}}):d()})})});
