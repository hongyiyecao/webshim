jQuery.webshims.register("dom-extend",function(e,t,n,r,i){"use strict";var s=t.modules,o=/\s*,\s*/,u={},a={},f={},l={},c={},h=e.fn.val,p=function(t,n,r,i,s){return s?h.call(e(t)):h.call(e(t),r)};e.fn.val=function(t){var n=this[0];arguments.length&&t==null&&(t="");if(!arguments.length)return!n||n.nodeType!==1?h.call(this):e.prop(n,"value",t,"val",!0);if(e.isArray(t))return h.apply(this,arguments);var r=e.isFunction(t);return this.each(function(s){n=this;if(n.nodeType===1)if(r){var o=t.call(n,s,e.prop(n,"value",i,"val",!0));o==null&&(o=""),e.prop(n,"value",o,"val")}else e.prop(n,"value",t,"val")})};var d="_webshimsLib"+Math.round(Math.random()*1e3),v=function(t,n,r){t=t.jquery?t[0]:t;if(!t)return r||{};var s=e.data(t,d);return r!==i&&(s||(s=e.data(t,d,{})),n&&(s[n]=r)),n?s&&s[n]:s};[{name:"getNativeElement",prop:"nativeElement"},{name:"getShadowElement",prop:"shadowElement"},{name:"getShadowFocusElement",prop:"shadowFocusElement"}].forEach(function(t){e.fn[t.name]=function(){return this.map(function(){var e=v(this,"shadowData");return e&&e[t.prop]||this})}}),["removeAttr","prop","attr"].forEach(function(n){u[n]=e[n],e[n]=function(t,r,s,o,l){var h=o=="val",d=h?p:u[n];if(!t||!a[r]||t.nodeType!==1||!h&&o&&n=="attr"&&e.attrFn[r])return d(t,r,s,o,l);var v=(t.nodeName||"").toLowerCase(),m=f[v],g=n!="attr"||s!==!1&&s!==null?n:"removeAttr",y,b,w;m||(m=f["*"]),m&&(m=m[r]),m&&(y=m[g]);if(y){r=="value"&&(b=y.isVal,y.isVal=h);if(g==="removeAttr")return y.value.call(t);if(s===i)return y.get?y.get.call(t):y.value;y.set&&(n=="attr"&&s===!0&&(s=r),w=y.set.call(t,s)),r=="value"&&(y.isVal=b)}else w=d(t,r,s,o,l);if((s!==i||g==="removeAttr")&&c[v]&&c[v][r]){var E;g=="removeAttr"?E=!1:g=="prop"?E=!!s:E=!0,c[v][r].forEach(function(e){(!e.only||(e.only=n=="prop")||e.only=="attr"&&n!="prop")&&e.call(t,s,E,h?"val":g,n)})}return w},l[n]=function(r,s,o){f[r]||(f[r]={}),f[r][s]||(f[r][s]={});var a=f[r][s][n],l=function(e,t,r){return t&&t[e]?t[e]:r&&r[e]?r[e]:n=="prop"&&s=="value"?function(e){var t=this;return o.isVal?p(t,s,e,!1,arguments.length===0):u[n](t,s,e)}:n=="prop"&&e=="value"&&o.value.apply?function(e){var t=u[n](this,s);return t&&t.apply&&(t=t.apply(this,arguments)),t}:function(e){return u[n](this,s,e)}};f[r][s][n]=o,o.value===i&&(o.set||(o.set=o.writeable?l("set",o,a):t.cfg.useStrict&&s=="prop"?function(){throw s+" is readonly on "+r}:e.noop),o.get||(o.get=l("get",o,a))),["value","get","set"].forEach(function(e){o[e]&&(o["_sup"+e]=l(e,a))})}});var m=!e.browser.msie||parseInt(e.browser.version,10)>8,g=function(){var e=t.getPrototypeOf(r.createElement("foobar")),n=Object.prototype.hasOwnProperty;return function(i,s,o){var u=r.createElement(i),a=t.getPrototypeOf(u);if(m&&a&&e!==a&&(!u[s]||!n.call(u,s))){var f=u[s];o._supvalue=function(){return f&&f.apply?f.apply(this,arguments):f},a[s]=o.value}else o._supvalue=function(){var e=v(this,"propValue");return e&&e[s]&&e[s].apply?e[s].apply(this,arguments):e&&e[s]},y.extendValue(i,s,o.value);o.value._supvalue=o._supvalue}}(),y=function(){var n={};t.addReady(function(r,i){var s={},o=function(t){s[t]||(s[t]=e(r.getElementsByTagName(t)),i[0]&&e.nodeName(i[0],t)&&(s[t]=s[t].add(i)))};e.each(n,function(e,n){o(e);if(!n||!n.forEach){t.warn("Error: with "+e+"-property. methods: "+n);return}n.forEach(function(t){s[e].each(t)})}),s=null});var i,s=e([]),o=function(t,s){n[t]?n[t].push(s):n[t]=[s],e.isDOMReady&&(i||e(r.getElementsByTagName(t))).each(s)},u={};return{createTmpCache:function(t){return e.isDOMReady&&(i=i||e(r.getElementsByTagName(t))),i||s},flushTmpCache:function(){i=null},content:function(t,n){o(t,function(){var t=e.attr(this,n);t!=null&&e.attr(this,n,t)})},createElement:function(e,t){o(e,t)},extendValue:function(t,n,r){o(t,function(){e(this).each(function(){var e=v(this,"propValue",{});e[n]=this[n],this[n]=r})})}}}(),b=function(e,t){e.defaultValue===i&&(e.defaultValue=""),e.removeAttr||(e.removeAttr={value:function(){e[t||"prop"].set.call(this,e.defaultValue),e.removeAttr._supvalue.call(this)}}),e.attr||(e.attr={})};e.extend(t,{getID:function(){var t=(new Date).getTime();return function(n){n=e(n);var r=n.attr("id");return r||(t++,r="ID-"+t,n.attr("id",r)),r}}(),extendUNDEFProp:function(t,n){e.each(n,function(e,n){e in t||(t[e]=n)})},createPropDefault:b,data:v,moveToFirstEvent:function(t,n,r){var i=(e._data(t,"events")||{})[n],s;i&&i.length>1&&(s=i.pop(),r||(r="bind"),r=="bind"&&i.delegateCount?i.splice(i.delegateCount,0,s):i.unshift(s)),t=null},addShadowDom:function(){var i,s,o,u={init:!1,runs:0,test:function(){var e=u.getHeight(),t=u.getWidth();e!=u.height||t!=u.width?(u.height=e,u.width=t,u.handler({type:"docresize"}),u.runs++,u.runs<9&&setTimeout(u.test,90)):u.runs=0},handler:function(t){clearTimeout(i),i=setTimeout(function(){if(t.type=="resize"){var r=e(n).width(),i=e(n).width();if(i==s&&r==o)return;s=i,o=r,u.height=u.getHeight(),u.width=u.getWidth()}e.event.trigger("updateshadowdom")},t.type=="resize"?50:9)},_create:function(){e.each({Height:"getHeight",Width:"getWidth"},function(e,t){var n=r.body,i=r.documentElement;u[t]=function(){return Math.max(n["scroll"+e],i["scroll"+e],n["offset"+e],i["offset"+e],i["client"+e])}})},start:function(){!this.init&&r.body&&(this.init=!0,this._create(),this.height=u.getHeight(),this.width=u.getWidth(),setInterval(this.test,600),e(this.test),t.ready("WINDOWLOAD",this.test),e(n).bind("resize",this.handler),function(){var t=e.fn.animate,n;e.fn.animate=function(){return clearTimeout(n),n=setTimeout(function(){u.test()},99),t.apply(this,arguments)}}())}};return e.event.customEvent.updateshadowdom=!0,t.docObserve=function(){t.ready("DOM",function(){u.start()})},function(n,r,i){i=i||{},n.jquery&&(n=n[0]),r.jquery&&(r=r[0]);var s=e.data(n,d)||e.data(n,d,{}),o=e.data(r,d)||e.data(r,d,{}),u={};i.shadowFocusElement?i.shadowFocusElement&&(i.shadowFocusElement.jquery&&(i.shadowFocusElement=i.shadowFocusElement[0]),u=e.data(i.shadowFocusElement,d)||e.data(i.shadowFocusElement,d,u)):i.shadowFocusElement=r,s.hasShadow=r,u.nativeElement=o.nativeElement=n,u.shadowData=o.shadowData=s.shadowData={nativeElement:n,shadowElement:r,shadowFocusElement:i.shadowFocusElement},i.shadowChilds&&i.shadowChilds.each(function(){v(this,"shadowData",o.shadowData)}),i.data&&(u.shadowData.data=o.shadowData.data=s.shadowData.data=i.data),i=null,t.docObserve()}}(),propTypes:{standard:function(e,t){b(e);if(e.prop)return;e.prop={set:function(t){e.attr.set.call(this,""+t)},get:function(){return e.attr.get.call(this)||e.defaultValue}}},"boolean":function(e,t){b(e);if(e.prop)return;e.prop={set:function(t){t?e.attr.set.call(this,""):e.removeAttr.value.call(this)},get:function(){return e.attr.get.call(this)!=null}}},src:function(){var t=r.createElement("a");return t.style.display="none",function(n,r){b(n);if(n.prop)return;n.prop={set:function(e){n.attr.set.call(this,e)},get:function(){var n=this.getAttribute(r),i;if(n==null)return"";t.setAttribute("href",n+"");if(!e.support.hrefNormalized){try{e(t).insertAfter(this),i=t.getAttribute("href",4)}catch(s){i=t.getAttribute("href",4)}e(t).detach()}return i||t.href}}}}(),enumarated:function(e,t){b(e);if(e.prop)return;e.prop={set:function(t){e.attr.set.call(this,t)},get:function(){var t=(e.attr.get.call(this)||"").toLowerCase();if(!t||e.limitedTo.indexOf(t)==-1)t=e.defaultValue;return t}}}},reflectProperties:function(n,r){typeof r=="string"&&(r=r.split(o)),r.forEach(function(r){t.defineNodeNamesProperty(n,r,{prop:{set:function(t){e.attr(this,r,t)},get:function(){return e.attr(this,r)||""}}})})},defineNodeNameProperty:function(n,r,i){return a[r]=!0,i.reflect&&t.propTypes[i.propType||"standard"](i,r),["prop","attr","removeAttr"].forEach(function(s){var o=i[s];o&&(s==="prop"?o=e.extend({writeable:!0},o):o=e.extend({},o,{writeable:!0}),l[s](n,r,o),n!="*"&&t.cfg.extendNative&&s=="prop"&&o.value&&e.isFunction(o.value)&&g(n,r,o),i[s]=o)}),i.initAttr&&y.content(n,r),i},defineNodeNameProperties:function(e,n,r,i){var s;for(var o in n)!i&&n[o].initAttr&&y.createTmpCache(e),r&&(n[o][r]||(n[o][r]={},["value","set","get"].forEach(function(e){e in n[o]&&(n[o][r][e]=n[o][e],delete n[o][e])}))),n[o]=t.defineNodeNameProperty(e,o,n[o]);return i||y.flushTmpCache(),n},createElement:function(n,r,i){var s;return e.isFunction(r)&&(r={after:r}),y.createTmpCache(n),r.before&&y.createElement(n,r.before),i&&(s=t.defineNodeNameProperties(n,i,!1,!0)),r.after&&y.createElement(n,r.after),y.flushTmpCache(),s},onNodeNamesPropertyModify:function(t,n,r,i){typeof t=="string"&&(t=t.split(o)),e.isFunction(r)&&(r={set:r}),t.forEach(function(e){c[e]||(c[e]={}),typeof n=="string"&&(n=n.split(o)),r.initAttr&&y.createTmpCache(e),n.forEach(function(t){c[e][t]||(c[e][t]=[],a[t]=!0),r.set&&(i&&(r.set.only=i),c[e][t].push(r.set)),r.initAttr&&y.content(e,t)}),y.flushTmpCache()})},defineNodeNamesBooleanProperty:function(n,r,s){s||(s={}),e.isFunction(s)&&(s.set=s),t.defineNodeNamesProperty(n,r,{attr:{set:function(e){this.setAttribute(r,e),s.set&&s.set.call(this,!0)},get:function(){var e=this.getAttribute(r);return e==null?i:r}},removeAttr:{value:function(){this.removeAttribute(r),s.set&&s.set.call(this,!1)}},reflect:!0,propType:"boolean",initAttr:s.initAttr||!1})},contentAttr:function(e,t,n){if(!e.nodeName)return;var r;if(n===i)return r=e.attributes[t]||{},n=r.specified?r.value:null,n==null?i:n;typeof n=="boolean"?n?e.setAttribute(t,t):e.removeAttribute(t):e.setAttribute(t,n)},activeLang:function(){var n=[],r={},i,o,u=/:\/\/|^\.*\//,a=function(n,r,i){var s;return r&&i&&e.inArray(r,i.availabeLangs||[])!==-1?(n.loading=!0,s=i.langSrc,u.test(s)||(s=t.cfg.basePath+s),t.loader.loadScript(s+r+".js",function(){n.langObj[r]?(n.loading=!1,l(n,!0)):e(function(){n.langObj[r]&&l(n,!0),n.loading=!1})}),!0):!1},f=function(e){r[e]&&r[e].forEach(function(e){e.callback()})},l=function(e,t){if(e.activeLang!=i&&e.activeLang!==o){var n=s[e.module].options;e.langObj[i]||o&&e.langObj[o]?(e.activeLang=i,e.callback(e.langObj[i]||e.langObj[o],i),f(e.module)):!t&&!a(e,i,n)&&!a(e,o,n)&&e.langObj[""]&&e.activeLang!==""&&(e.activeLang="",e.callback(e.langObj[""],i),f(e.module))}},c=function(t){return typeof t=="string"&&t!==i?(i=t,o=i.split("-")[0],i==o&&(o=!1),e.each(n,function(e,t){l(t)})):typeof t=="object"&&(t.register?(r[t.register]||(r[t.register]=[]),r[t.register].push(t),t.callback()):(t.activeLang||(t.activeLang=""),n.push(t),l(t))),i};return c}()}),e.each({defineNodeNamesProperty:"defineNodeNameProperty",defineNodeNamesProperties:"defineNodeNameProperties",createElements:"createElement"},function(e,n){t[e]=function(e,r,i,s){typeof e=="string"&&(e=e.split(o));var u={};return e.forEach(function(e){u[e]=t[n](e,r,i,s)}),u}}),t.isReady("webshimLocalization",!0)}),function(e,t){if(!Modernizr.localstorage||"hidden"in t.createElement("a"))return;var n={article:"article",aside:"complementary",section:"region",nav:"navigation",address:"contentinfo"},r=function(e,t){var n=e.getAttribute("role");n||e.setAttribute("role",t)};e.webshims.addReady(function(i,s){e.each(n,function(t,n){var o=e(t,i).add(s.filter(t));for(var u=0,a=o.length;u<a;u++)r(o[u],n)});if(i===t){var o=t.getElementsByTagName("header")[0],u=t.getElementsByTagName("footer"),a=u.length;o&&!e(o).closest("section, article")[0]&&r(o,"banner");if(!a)return;var f=u[a-1];e(f).closest("section, article")[0]||r(f,"contentinfo")}})}(jQuery,document),jQuery.webshims.register("form-datalist",function(e,t,n,r,i){"use strict";var s=r;t.propTypes.element=function(n){t.createPropDefault(n,"attr");if(n.prop)return;n.prop={get:function(){var t=n.attr.get.call(this);return t&&(t=r.getElementById(t),t&&n.propNodeName&&!e.nodeName(t,n.propNodeName)&&(t=null)),t||null},writeable:!1}},function(){var s=e.webshims.cfg.forms,o=Modernizr.input.list;if(o&&!s.customDatalist)return;var u=function(){o||t.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var n=this,r=e("select",n),i;return r[0]?i=r[0].options:(i=e("option",n).get(),i.length&&t.warn("you should wrap your option-elements for a datalist in a select element to support IE and other old browsers.")),i}}});var n={autocomplete:{attr:{get:function(){var t=this,n=e.data(t,"datalistWidget");return n?n._autocomplete:"autocomplete"in t?t.autocomplete:t.getAttribute("autocomplete")},set:function(t){var n=this,r=e.data(n,"datalistWidget");r?(r._autocomplete=t,t=="off"&&r.hideList()):"autocomplete"in n?n.autocomplete=t:n.setAttribute("autocomplete",t)}}}};o?((e("<datalist><select><option></option></select></datalist>").prop("options")||[]).length||t.defineNodeNameProperty("datalist","options",{prop:{writeable:!1,get:function(){var t=this.options||[];if(!t.length){var n=this,r=e("select",n);r[0]&&r[0].options&&r[0].options.length&&(t=r[0].options)}return t}}}),n.list={attr:{get:function(){var n=t.contentAttr(this,"list");return n!=null?this.removeAttribute("list"):n=e.data(this,"datalistListAttr"),n==null?i:n},set:function(n){var r=this;e.data(r,"datalistListAttr",n),t.objectCreate(d,i,{input:r,id:n,datalist:e.prop(r,"list")})}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"}):n.list={attr:{get:function(){var e=t.contentAttr(this,"list");return e==null?i:e},set:function(n){var r=this;t.contentAttr(r,"list",n),t.objectCreate(d,i,{input:r,id:n,datalist:e.prop(r,"list")})}},initAttr:!0,reflect:!0,propType:"element",propNodeName:"datalist"},t.defineNodeNameProperties("input",n),e.event.customEvent&&(e.event.customEvent.updateDatalist=!0,e.event.customEvent.updateInput=!0,e.event.customEvent.datalistselect=!0),t.addReady(function(e,t){t.filter("datalist > select, datalist, datalist > option, datalist > select > option").closest("datalist").triggerHandler("updateDatalist")})},a=0,f={submit:1,button:1,reset:1,hidden:1,range:1,date:1},l={},c=function(e){if(!e)return[];if(l[e])return l[e];var t;try{t=JSON.parse(localStorage.getItem("storedDatalistOptions"+e))}catch(n){}return l[e]=t||[],t||[]},h=function(e,t){if(!e)return;t=t||[];try{localStorage.setItem("storedDatalistOptions"+e,JSON.stringify(t))}catch(n){}},p=function(t){return t.textContent||t.innerText||e.text([t])||""},d={_create:function(t){if(f[e.prop(t.input,"type")])return;var r=t.datalist,i=e.data(t.input,"datalistWidget");if(r&&i&&i.datalist!==r){i.datalist=r,i.id=t.id,i.shadowList.prop("className","datalist-polyfill "+(i.datalist.className||"")+" "+i.datalist.id+"-shadowdom"),s.positionDatalist?i.shadowList.insertAfter(t.input):i.shadowList.appendTo("body"),e(i.datalist).off("updateDatalist.datalistWidget").on("updateDatalist.datalistWidget",e.proxy(i,"_resetListCached")),i._resetListCached();return}if(!r){i&&i.destroy();return}if(i&&i.datalist===r)return;a++;var o=this;this.hideList=e.proxy(o,"hideList"),this.timedHide=function(){clearTimeout(o.hideTimer),o.hideTimer=setTimeout(o.hideList,9)},this.datalist=r,this.id=t.id,this.hasViewableData=!0,this._autocomplete=e.attr(t.input,"autocomplete"),e.data(t.input,"datalistWidget",this),this.shadowList=e('<div class="datalist-polyfill '+(this.datalist.className||"")+" "+this.datalist.id+"-shadowdom"+'" />'),s.positionDatalist||e(t.input).hasClass("position-datalist")?this.shadowList.insertAfter(t.input):this.shadowList.appendTo("body"),this.index=-1,this.input=t.input,this.arrayOptions=[],this.shadowList.delegate("li","mouseenter.datalistWidget mousedown.datalistWidget click.datalistWidget",function(n){var r=e("li:not(.hidden-item)",o.shadowList),i=n.type=="mousedown"||n.type=="click";return o.markItem(r.index(n.currentTarget),i,r),n.type=="click"&&(o.hideList(),s.customDatalist&&e(t.input).trigger("datalistselect")),n.type!="mousedown"}).on("focusout",this.timedHide),t.input.setAttribute("autocomplete","off"),e(t.input).attr({"aria-haspopup":"true"}).on({"input.datalistWidget":function(){o.triggeredByDatalist||(o.changedValue=!1,o.showHideOptions())},"keydown.datalistWidget":function(n){var r=n.keyCode,i,u;if(r==40&&!o.showList())return o.markItem(o.index+1,!0),!1;if(!o.isListVisible)return;if(r==38)return o.markItem(o.index-1,!0),!1;if(!n.shiftKey&&(r==33||r==36))return o.markItem(0,!0),!1;if(!n.shiftKey&&(r==34||r==35))return u=e("li:not(.hidden-item)",o.shadowList),o.markItem(u.length-1,!0,u),!1;if(r==13||r==27)return r==13&&(i=e("li.active-item:not(.hidden-item)",o.shadowList),o.changeValue(e("li.active-item:not(.hidden-item)",o.shadowList))),o.hideList(),s.customDatalist&&i&&i[0]&&e(t.input).trigger("datalistselect"),!1},"focus.datalistWidget":function(){e(this).hasClass("list-focus")&&o.showList()},"mousedown.datalistWidget":function(){e(this).is(":focus")&&o.showList()},"blur.datalistWidget":this.timedHide}),e(this.datalist).off("updateDatalist.datalistWidget").on("updateDatalist.datalistWidget",e.proxy(this,"_resetListCached")),this._resetListCached(),t.input.form&&(t.input.name||t.input.id)&&e(t.input.form).on("submit.datalistWidget"+t.input.id,function(){if(!e(t.input).hasClass("no-datalist-cache")&&o._autocomplete!="off"){var n=e.prop(t.input,"value"),r=(t.input.name||t.input.id)+e.prop(t.input,"type");o.storedOptions||(o.storedOptions=c(r)),n&&o.storedOptions.indexOf(n)==-1&&(o.storedOptions.push(n),h(r,o.storedOptions))}}),e(n).on("unload.datalist"+this.id+" beforeunload.datalist"+this.id,function(){o.destroy()})},destroy:function(){var t=e.attr(this.input,"autocomplete");e(this.input).off(".datalistWidget").removeData("datalistWidget"),this.shadowList.remove(),e(r).off(".datalist"+this.id),e(n).off(".datalist"+this.id),this.input.form&&this.input.id&&e(this.input.form).off("submit.datalistWidget"+this.input.id),this.input.removeAttribute("aria-haspopup"),t===i?this.input.removeAttribute("autocomplete"):e(this.input).attr("autocomplete",t)},_resetListCached:function(e){var i=this,s;this.needsUpdate=!0,this.lastUpdatedValue=!1,this.lastUnfoundValue="",this.updateTimer||(n.QUnit||(s=e&&r.activeElement==i.input)?i.updateListOptions(s):t.ready("WINDOWLOAD",function(){i.updateTimer=setTimeout(function(){i.updateListOptions(),i=null,a=1},200+100*a)}))},maskHTML:function(e){return e.replace(/</g,"&lt;").replace(/>/g,"&gt;")},updateListOptions:function(t){this.needsUpdate=!1,clearTimeout(this.updateTimer),this.updateTimer=!1,this.shadowList.css({fontSize:e.css(this.input,"fontSize"),fontFamily:e.css(this.input,"fontFamily")}),this.searchStart=s.customDatalist&&e(this.input).hasClass("search-start");var n=[],r=[],i=[],o,u,a,f,l,h;for(a=e.prop(this.datalist,"options"),f=0,l=a.length;f<l;f++){o=a[f];if(o.disabled)return;u={value:e(o).val()||"",text:e.trim(e.attr(o,"label")||p(o)),className:o.className||"",style:e.attr(o,"style")||""},u.text?u.text!=u.value&&(u.className+=" different-label-value"):u.text=u.value,r[f]=u.value,i[f]=u}this.storedOptions||(this.storedOptions=e(this.input).hasClass("no-datalist-cache")||this._autocomplete=="off"?[]:c((this.input.name||this.input.id)+e.prop(this.input,"type"))),this.storedOptions.forEach(function(e,t){r.indexOf(e)==-1&&i.push({value:e,text:e,className:"stored-suggest",style:""})});for(f=0,l=i.length;f<l;f++)h=i[f],n[f]='<li class="'+h.className+'" style="'+h.style+'" tabindex="-1" role="listitem"><span class="option-label">'+this.maskHTML(h.text)+'</span> <span class="option-value">'+this.maskHTML(h.value)+"</span></li>";this.arrayOptions=i,this.shadowList.html('<div class="datalist-outer-box"><div class="datalist-box"><ul role="list">'+n.join("\n")+"</ul></div></div>"),e.fn.bgIframe&&this.shadowList.bgIframe(),(t||this.isListVisible)&&this.showHideOptions()},showHideOptions:function(t){var n=e.prop(this.input,"value").toLowerCase();if(n===this.lastUpdatedValue||this.lastUnfoundValue&&n.indexOf(this.lastUnfoundValue)===0)return;this.lastUpdatedValue=n;var r=!1,i=this.searchStart,s=e("li",this.shadowList);n?this.arrayOptions.forEach(function(t,o){var u;"lowerText"in t||(t.text!=t.value?t.lowerText=t.value.toLowerCase()+t.text.toLowerCase():t.lowerText=t.text.toLowerCase()),u=t.lowerText.indexOf(n),u=i?!u:u!==-1,u?(e(s[o]).removeClass("hidden-item"),r=!0):e(s[o]).addClass("hidden-item")}):s.length&&(s.removeClass("hidden-item"),r=!0),this.hasViewableData=r,!t&&r&&this.showList(),r||(this.lastUnfoundValue=n,this.hideList())},setPos:function(){this.shadowList.css({marginTop:0,marginLeft:0,marginRight:0,marginBottom:0});var n=s.positionDatalist?e(this.input).position():t.getRelOffset(this.shadowList,this.input);return n.top+=e(this.input).outerHeight(),n.width=e(this.input).outerWidth()-(parseInt(this.shadowList.css("borderLeftWidth"),10)||0)-(parseInt(this.shadowList.css("borderRightWidth"),10)||0),this.shadowList.css({marginTop:"",marginLeft:"",marginRight:"",marginBottom:""}).css(n),n},showList:function(){if(this.isListVisible)return!1;this.needsUpdate&&this.updateListOptions(),this.showHideOptions(!0);if(!this.hasViewableData)return!1;this.isListVisible=!0;var t=this;return t.setPos(),t.shadowList.addClass("datalist-visible").find("li.active-item").removeClass("active-item"),e(n).unbind(".datalist"+t.id),e(r).off(".datalist"+t.id).on("mousedown.datalist"+t.id+" focusin.datalist"+t.id,function(n){n.target===t.input||t.shadowList[0]===n.target||e.contains(t.shadowList[0],n.target)?(clearTimeout(t.hideTimer),setTimeout(function(){clearTimeout(t.hideTimer)},9)):t.timedHide()}).on("updateshadowdom.datalist"+t.id,function(){t.setPos()}),!0},hideList:function(){if(!this.isListVisible)return!1;var i=this,s=function(t){i.changedValue&&e(i.input).trigger("change"),i.changedValue=!1};return i.shadowList.removeClass("datalist-visible list-item-active"),i.index=-1,i.isListVisible=!1,i.changedValue&&(i.triggeredByDatalist=!0,t.triggerInlineForm&&t.triggerInlineForm(i.input,"input"),e(i.input).is(":focus")?e(i.input).one("blur",s):s(),i.triggeredByDatalist=!1),e(r).unbind(".datalist"+i.id),e(n).off(".datalist"+i.id).one("resize.datalist"+i.id,function(){i.shadowList.css({top:0,left:0})}),!0},scrollIntoView:function(t){var n=e("ul",this.shadowList),r=e("div.datalist-box",this.shadowList),i=t.position(),s;i.top-=(parseInt(n.css("paddingTop"),10)||0)+(parseInt(n.css("marginTop"),10)||0)+(parseInt(n.css("borderTopWidth"),10)||0);if(i.top<0){r.scrollTop(r.scrollTop()+i.top-2);return}i.top+=t.outerHeight(),s=r.height(),i.top>s&&r.scrollTop(r.scrollTop()+(i.top-s)+2)},changeValue:function(t){if(!t[0])return;var n=e("span.option-value",t).text(),r=e.prop(this.input,"value");n!=r&&(e(this.input).prop("value",n).triggerHandler("updateInput"),this.changedValue=!0)},markItem:function(t,n,r){var i,s;r=r||e("li:not(.hidden-item)",this.shadowList);if(!r.length)return;t<0?t=r.length-1:t>=r.length&&(t=0),r.removeClass("active-item"),this.shadowList.addClass("list-item-active"),i=r.filter(":eq("+t+")").addClass("active-item"),n&&(this.changeValue(i),this.scrollIntoView(i)),this.index=t}};u()}()});