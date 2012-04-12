!function(l){var i=function(a,b){this.options=b;this.$element=l(a).delegate('[data-dismiss="modal"]',"click.dismiss.modal",l.proxy(this.hide,this))};i.prototype={constructor:i,toggle:function(){return this[!this.isShown?"show":"hide"]()},show:function(){var a=this;if(this.isShown){return}l("body").addClass("modal-open");this.isShown=true;this.$element.trigger("show");m.call(this);n.call(this,function(){var b=l.support.transition&&a.$element.hasClass("fade");!a.$element.parent().length&&a.$element.appendTo(document.body);a.$element.show();if(b){a.$element[0].offsetWidth}a.$element.addClass("in");b?a.$element.one(l.support.transition.end,function(){a.$element.trigger("shown")}):a.$element.trigger("shown")})},hide:function(a){a&&a.preventDefault();if(!this.isShown){return}var b=this;this.isShown=false;l("body").removeClass("modal-open");m.call(this);this.$element.trigger("hide").removeClass("in");l.support.transition&&this.$element.hasClass("fade")?j.call(this):k.call(this)}};function j(){var b=this,a=setTimeout(function(){b.$element.off(l.support.transition.end);k.call(b)},500);this.$element.one(l.support.transition.end,function(){clearTimeout(a);k.call(b)})}function k(a){this.$element.hide().trigger("hidden");n.call(this)}function n(a){var b=this,c=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var d=l.support.transition&&c;this.$backdrop=l('<div class="modal-backdrop '+c+'" />').appendTo(document.body);if(this.options.backdrop!="static"){this.$backdrop.click(l.proxy(this.hide,this))}if(d){this.$backdrop[0].offsetWidth}this.$backdrop.addClass("in");d?this.$backdrop.one(l.support.transition.end,a):a()}else{if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");l.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(l.support.transition.end,l.proxy(h,this)):h.call(this)}else{if(a){a()}}}}function h(){this.$backdrop.remove();this.$backdrop=null}function m(){var a=this;if(this.isShown&&this.options.keyboard){l(document).on("keyup.dismiss.modal",function(b){b.which==27&&a.hide()})}else{if(!this.isShown){l(document).off("keyup.dismiss.modal")}}}l.fn.modal=function(a){return this.each(function(){var b=l(this),c=b.data("modal"),d=l.extend({},l.fn.modal.defaults,b.data(),typeof a=="object"&&a);if(!c){b.data("modal",(c=new i(this,d)))}if(typeof a=="string"){c[a]()}else{if(d.show){c.show()}}})};l.fn.modal.defaults={backdrop:true,keyboard:true,show:true};l.fn.modal.Constructor=i;l(function(){l("body").on("click.modal.data-api",'[data-toggle="modal"]',function(a){var b=l(this),d,e=l(b.attr("data-target")||(d=b.attr("href"))&&d.replace(/.*(?=#[^\s]+$)/,"")),c=e.data("modal")?"toggle":l.extend({},e.data(),b.data());a.preventDefault();e.modal(c)})})}(window.jQuery);!function(b){b(function(){b.support.transition=(function(){var f=document.body||document.documentElement,e=f.style,a=e.transition!==undefined||e.WebkitTransition!==undefined||e.MozTransition!==undefined||e.MsTransition!==undefined||e.OTransition!==undefined;return a&&{end:(function(){var c="TransitionEnd";if(b.browser.webkit){c="webkitTransitionEnd"}else{if(b.browser.mozilla){c="transitionend"}else{if(b.browser.opera){c="oTransitionEnd"}}}return c}())}})()})}(window.jQuery);!function(c){var d=function(a,b){this.init("tooltip",a,b)};d.prototype={constructor:d,init:function(b,h,i){var a,j;this.type=b;this.$element=c(h);this.options=this.getOptions(i);this.enabled=true;if(this.options.trigger!="manual"){a=this.options.trigger=="hover"?"mouseenter":"focus";j=this.options.trigger=="hover"?"mouseleave":"blur";this.$element.on(a,this.options.selector,c.proxy(this.enter,this));this.$element.on(j,this.options.selector,c.proxy(this.leave,this))}this.options.selector?(this._options=c.extend({},this.options,{trigger:"manual",selector:""})):this.fixTitle()},getOptions:function(a){a=c.extend({},c.fn[this.type].defaults,a,this.$element.data());if(a.delay&&typeof a.delay=="number"){a.delay={show:a.delay,hide:a.delay}}return a},enter:function(a){var b=c(a.currentTarget)[this.type](this._options).data(this.type);if(!b.options.delay||!b.options.delay.show){b.show()}else{b.hoverState="in";setTimeout(function(){if(b.hoverState=="in"){b.show()}},b.options.delay.show)}},leave:function(a){var b=c(a.currentTarget)[this.type](this._options).data(this.type);if(!b.options.delay||!b.options.delay.hide){b.hide()}else{b.hoverState="out";setTimeout(function(){if(b.hoverState=="out"){b.hide()}},b.options.delay.hide)}},show:function(){var j,n,a,l,b,m,k;if(this.hasContent()&&this.enabled){j=this.tip();this.setContent();if(this.options.animation){j.addClass("fade")}m=typeof this.options.placement=="function"?this.options.placement.call(this,j[0],this.$element[0]):this.options.placement;n=/in/.test(m);j.remove().css({top:0,left:0,display:"block"}).appendTo(n?this.$element:document.body);a=this.getPosition(n);l=j[0].offsetWidth;b=j[0].offsetHeight;switch(n?m.split(" ")[1]:m){case"bottom":k={top:a.top+a.height,left:a.left+a.width/2-l/2};break;case"top":k={top:a.top-b,left:a.left+a.width/2-l/2};break;case"left":k={top:a.top+a.height/2-b/2,left:a.left-l};break;case"right":k={top:a.top+a.height/2-b/2,left:a.left+a.width};break}j.css(k).addClass(m).addClass("in")}},setContent:function(){var a=this.tip();a.find(".tooltip-inner").html(this.getTitle());a.removeClass("fade in top bottom left right")},hide:function(){var f=this,b=this.tip();b.removeClass("in");function a(){var e=setTimeout(function(){b.off(c.support.transition.end).remove()},500);b.one(c.support.transition.end,function(){clearTimeout(e);b.remove()})}c.support.transition&&this.$tip.hasClass("fade")?a():b.remove()},fixTitle:function(){var a=this.$element;if(a.attr("title")||typeof(a.attr("data-original-title"))!="string"){a.attr("data-original-title",a.attr("title")||"").removeAttr("title")}},hasContent:function(){return this.getTitle()},getPosition:function(a){return c.extend({},(a?{top:0,left:0}:this.$element.offset()),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var a,f=this.$element,b=this.options;a=f.attr("data-original-title")||(typeof b.title=="function"?b.title.call(f[0]):b.title);a=a.toString().replace(/(^\s*|\s*$)/,"");return a},tip:function(){return this.$tip=this.$tip||c(this.options.template)},validate:function(){if(!this.$element[0].parentNode){this.hide();this.$element=null;this.options=null}},enable:function(){this.enabled=true},disable:function(){this.enabled=false},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}};c.fn.tooltip=function(a){return this.each(function(){var b=c(this),g=b.data("tooltip"),h=typeof a=="object"&&a;if(!g){b.data("tooltip",(g=new d(this,h)))}if(typeof a=="string"){g[a]()}})};c.fn.tooltip.Constructor=d;c.fn.tooltip.defaults={animation:true,delay:0,selector:false,placement:"top",trigger:"hover",title:"",template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}}(window.jQuery);!function(c){var d=function(a,b){this.init("popover",a,b)};d.prototype=c.extend({},c.fn.tooltip.Constructor.prototype,{constructor:d,setContent:function(){var a=this.tip(),b=this.getTitle(),f=this.getContent();a.find(".popover-title")[c.type(b)=="object"?"append":"html"](b);a.find(".popover-content > *")[c.type(f)=="object"?"append":"html"](f);a.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var b,f=this.$element,a=this.options;b=f.attr("data-content")||(typeof a.content=="function"?a.content.call(f[0]):a.content);b=b.toString().replace(/(^\s*|\s*$)/,"");return b},tip:function(){if(!this.$tip){this.$tip=c(this.options.template)}return this.$tip}});c.fn.popover=function(a){return this.each(function(){var b=c(this),g=b.data("popover"),h=typeof a=="object"&&a;if(!g){b.data("popover",(g=new d(this,h)))}if(typeof a=="string"){g[a]()}})};c.fn.popover.Constructor=d;c.fn.popover.defaults=c.extend({},c.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery);(function(i){var o=window.location.protocol+"//"+window.location.host;var f="http://1940census.archives.gov/search/";var n=new L.LatLng(41.0053,-74.4234),g=new L.LatLng(40.3984,-73.5212),b=new L.LatLngBounds(g,n);function l(){a(getUrlVar("token"));m();d()}function d(){i.getScript("/assets/social.js",function(p,r,q){social().checkSession();i("#frm-content").on("keyup",function(){i("#submit").removeClass("disabled")});i("#submit").on("click",function(t){t.preventDefault();i("#conn_social").on("show",function(){var u=i(".modal");u.css("left",(i("#main").width()/2)-(i(this).width()/2)+"px");social().init()});var s=i("#frm-content").val()||null;if(s!==null){e()}})})}function e(){i("#conn_social").modal({show:true,keyboard:false,backdrop:false})}function a(q,p,r){i.getJSON(o+"/api/locations/"+q+".json?callback=?",function(v){if(typeof v!=="undefined"){environment.borough=v.borough;i("a#newsearch").prop("href","/directory/"+v.borough);if(v.hasOwnProperty("eds")&&v.eds.length>1){i("#results .EDmore1").show()}else{if(v.hasOwnProperty("eds")&&v.eds.length==1){i("#results .EDonly1").show()}else{i("#results .EDnone").show()}}if(v.hasOwnProperty("cross_streets")&&v.hasOwnProperty("cross_vals")){var u="";u="";for(var t=0;t<v.cross_streets.length;t++){u+="<option value='"+v.cross_vals[t]+"'>"+v.cross_streets[t]+"</option>"}i(".crossstreets").append(u)}if(v.hasOwnProperty("eds")&&v.hasOwnProperty("fullcity_id")&&v.hasOwnProperty("state")){var s="";for(t=0;t<v.eds.length;t++){s+="<a target='_blank' class='EDcontent' href='"+f+"?search.result_type=description&search.state="+v.state+"&search.enumeration_district="+v.fullcity_id+"-"+v.eds[t]+"#searchby=enumeration&searchmode=search&year=1940'>"+v.fullcity_id+"-"+v.eds[t]+"</a>"}i("#EDlist").append(s);k(v.eds,v.fullcity_id,v.state,s,u)}if(v.hasOwnProperty("coordinates")&&v.hasOwnProperty("map_urls")){j(v.coordinates.lat,v.coordinates.lng,"gmap",v.map_urls[1],undefined,function(){if(b.contains(new L.LatLng(v.coordinates.lat,v.coordinates.lng))){j(v.coordinates.lat,v.coordinates.lng,"nyplmap",v.map_urls[0],"Map © USGS. <a href='http://www.nypl.org/locations/schwarzman/map-division/fire-insurance-topographic-zoning-property-maps-nyc' title='open in new window' target='_blank'>Find more maps in the Lionel Pincus & Princess Firyal Map Division</a>")}else{i("#nyplmap").html('<div style="margin:60px 12px;font-size:13px;line-height:1.4em;color:#666;text-align:center;">This address appears to be outside of the New York City metropolitan area. 1940s maps beyond this area are not currently available.</div>')}},true)}else{i("#geo").hide()}if(v.hasOwnProperty("cutout")){var w=o+"/directory/"+v.borough+"#document/p"+v.cutout.page_idx;h(parseInt(v.cutout.x),parseInt(v.cutout.y),v.cutout.href,w)}else{i("#cutout").hide()}if(v.hasOwnProperty("stories")){for(t=0;t<v.stories.length;t++){c("annotation",v.stories[t].content,v.stories[t].author,v.stories[t].time_ago)}}}})}function h(p,s,q,r){i("#cutout .cutoutlink").prop("href",r);i("#cutout .page").css("background","url("+q+") "+(p-20)+"px "+s+"px")}function k(u,q,r,t,x){var y="";var v=i("#EDlist").text().split(q+"-");v.remove(0);var p=[t];var s=[x];var w=0;i(".crossstreets").change(function(G){if(v.length===1){return false}var A=i("select.crossstreets option:selected").val();var F=i("select.crossstreets option:selected").text();var z=_.intersection(A.split(","),u,v);var E="";var B=[];var D="";y=F;i("select.crossstreets option").each(function(){B=_.intersection(z,i(this).val().split(","));if(_.isEmpty(B)||y===i(this).text()){return true}else{D+="<option value='"+i(this).val()+"'>"+i(this).text()+"</option>"}});fin_string='<option selected="selected" value="_">Select another cross/back street</option>'+D;for(var C=0;C<z.length;C++){E+="<a target='_blank' class='EDcontent' href='"+f+"?search.result_type=description&search.state="+r+"&search.enumeration_district="+q+"-"+z[C]+"#searchby=enumeration&searchmode=search&year=1940'>"+q+"-"+z[C]+"</a>"}i("a","#EDlist").remove();i("#EDlist").append(E);i("option",i(this)).remove();i(this).append(fin_string);v=i("#EDlist").text().split(q+"-");v.remove(0);i(".streetchoices").append("<p class='crosscheck'><a href='#'>x </a>"+F+"</p>");p.push(E);s.push(fin_string);if(z.length==1){i("select.crossstreets").hide()}});i(".streetchoices").on("click",".crosscheck a",function(B){i("select.crossstreets").show();w=i(this).parent().index();var z=p[w];var A=s[w];i("a","#EDlist").remove();i("#EDlist").append(z);i("option",i("select.crossstreets")).remove();i(".crossstreets").append(A);if(w===0){i(".crossstreets").prepend("<option selected=selected>Select cross/back street</option>")}i(".streetchoices p").each(function(C){if(C>=w){p.pop();s.pop();i(this).remove()}});v=i("#EDlist").text().split(q+"-");v.remove(0);y=i("select.crossstreets option:selected").text()})}function j(s,t,v,r,q,u,p){if(typeof q==="undefined"){q=""}if(typeof p==="undefined"){p=false}wax.tilejson(r,function(A){var z=new L.Map(v,{zoomControl:p,trackResize:false}).addLayer(new wax.leaf.connector(A)).setView(new L.LatLng(s,t),16);var y;if(q!=""){z.attributionControl.addAttribution(q);var x=L.Icon.extend({iconUrl:"images/marker.png",shadowUrl:"images/marker-shadow.png",iconSize:new L.Point(43,35),shadowSize:new L.Point(43,35),iconAnchor:new L.Point(11,35),popupAnchor:new L.Point(-3,-76)});var w=new x();y=new L.Marker(new L.LatLng(s,t),{icon:w})}else{y=new L.Marker(new L.LatLng(s,t))}z.addLayer(y);z.touchZoom.disable();if(!p){z.scrollWheelZoom.disable()}z.doubleClickZoom.disable();if(typeof u!=="undefined"){u()}})}function m(){i("a#printpage").on("click",function(){window.print()})}function c(p,r,q,s){i(prepareStoryHTML(p,r,q,s)).appendTo(".texts")}return{init:l()}}(jQuery));(function(a){a.fn.marquee=function(b){var e=[],d=this.length;function c(m,k,l){var j=l.behavior,h=l.width,g=l.dir;var i=0;if(j=="alternate"){i=m==1?k[l.widthAxis]-(h*2):h}else{if(j=="slide"){if(m==-1){i=g==-1?k[l.widthAxis]:h}else{i=g==-1?k[l.widthAxis]-(h*2):0}}else{i=m==-1?k[l.widthAxis]:0}}return i}function f(){var h=e.length,j=null,m=null,l={},k=[],g=false;while(h--){j=e[h];m=a(j);l=m.data("marqueeState");if(m.data("paused")!==true){j[l.axis]+=(l.scrollamount*l.dir);g=l.dir==-1?j[l.axis]<=c(l.dir*-1,j,l):j[l.axis]>=c(l.dir*-1,j,l);if((l.behavior=="scroll"&&l.last==j[l.axis])||(l.behavior=="alternate"&&g&&l.last!=-1)||(l.behavior=="slide"&&g&&l.last!=-1)){if(l.behavior=="alternate"){l.dir*=-1}l.last=-1;m.trigger("stop");l.loops--;if(l.loops===0){if(l.behavior!="slide"){j[l.axis]=c(l.dir,j,l)}else{j[l.axis]=c(l.dir*-1,j,l)}m.trigger("end")}else{k.push(j);m.trigger("start");j[l.axis]=c(l.dir,j,l)}}else{k.push(j)}l.last=j[l.axis];m.data("marqueeState",l)}else{k.push(j)}}e=k;if(e.length){setTimeout(f,25)}}this.each(function(j){var n=a(this),g=n.attr("width")||n.width(),o=n.attr("height")||n.height(),p=n.after("<div "+(b?'class="'+b+'" ':"")+'style="display: block-inline; width: '+g+"px; height: "+o+'px; overflow: hidden;"><div style="float: left; white-space: nowrap;">'+n.html()+"</div></div>").next(),m=p.get(0),k=0,l=(n.attr("direction")||"left").toLowerCase(),h={dir:/down|right/.test(l)?-1:1,axis:/left|right/.test(l)?"scrollLeft":"scrollTop",widthAxis:/left|right/.test(l)?"scrollWidth":"scrollHeight",last:-1,loops:n.attr("loop")||-1,scrollamount:n.attr("scrollamount")||this.scrollAmount||2,behavior:(n.attr("behavior")||"scroll").toLowerCase(),width:/left|right/.test(l)?g:o};if(n.attr("loop")==-1&&h.behavior=="slide"){h.loops=1}n.remove();if(/left|right/.test(l)){p.find("> div").css("padding","0 "+g+"px")}else{p.find("> div").css("padding",o+"px 0")}p.bind("stop",function(){p.data("paused",true)}).bind("pause",function(){p.data("paused",true)}).bind("start",function(){p.data("paused",false)}).bind("unpause",function(){p.data("paused",false)}).data("marqueeState",h);e.push(m);m[h.axis]=c(h.dir,m,h);p.trigger("start");if(j+1==d){f()}});return a(e)}}(jQuery));(function(g){var l=window.location.protocol+"//"+window.location.host;var c=g("marquee");var b=[];var h=0;var j=0;var m;var d=false;var e=false;function k(){i()}function i(){g.getJSON(l+"/api/headlines.json?callback=?",function(p){var o,n=p.length;if(n>0){for(o=0;o<n;++o){b.push({pq_id:p[o].pq_id,hdl:p[o].hdl,nyt_url:p[o].ny_url})}d=true;if(b.length>0){a()}else{f()}}else{f()}})}function a(){var q,o=b.length,n;var r="";b=_.shuffle(b);var s=environment.onSite=="true";for(q=0;q<o;++q){n=b[q];var p;if(s){p="http://search.proquest.com/results/135C45E5A5F4B1EE9E0/1/$5bqueryType$3dbasic:OS$3b+sortType$3dDateAsc$3b+searchTerms$3d$5b$3cAND$7ccitationBodyTags:"+n.pq_id+"$3e$5d$3b+searchParameters$3d$7bNAVIGATORS$3dsourcetypenav,pubtitlenav,objecttypenav,languagenav$28filter$3d200$2f0$2f*$29,decadenav$28filter$3d110$2f0$2f*,sort$3dname$2fascending$29,yearnav$28filter$3d1100$2f0$2f*,sort$3dname$2fascending$29,yearmonthnav$28filter$3d120$2f0$2f*,sort$3dname$2fascending$29,monthnav$28sort$3dname$2fascending$29,daynav$28sort$3dname$2fascending$29,+RS$3dOP,+jstorMuseCollections$3dMUSEALL,+chunkSize$3d20,+instance$3dprod.academic,+ftblock$3d194000+7+194007,+removeDuplicates$3dtrue$7d$3b+metaData$3d$7bUsageSearchMode$3dQuickSearch,+dbselections$3dallAvailable$7d$5d?accountid=35635"}else{p=n.nyt_url}r+=' <a href="'+p+'" target="blank" title="open link in new window">'+n.hdl+"</a> &middot; &middot; &middot;"}c.empty();c.append(r);if(typeof c!=="undefined"){c.marquee("pointer").mouseover(function(){g(this).trigger("stop")}).mouseout(function(){g(this).trigger("start")})}g("#nytimes a").click(function(){analytics.recordOutboundLink(this,"Outbound Links",g(this).prop("href"));return false})}function f(){c.empty();c.append("... No headlines for this day ... No headlines for this day ... No headlines for this day ... No headlines for this day ... No headlines for this day ...")}return{init:k()}}(jQuery));