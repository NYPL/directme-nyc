(function(b){var a=["cImIlPSuyR8","OwZk6rASC8k","dXY1pHEf5hU","xEIO4mWgS2E"];b("<iframe />",{name:"ytplayer",id:"ytplayer",src:"http://www.youtube.com/embed/"+a[Math.floor(Math.random()*a.length)]+"?wmode=opaque",frameborder:"0"}).appendTo(".embed")}(jQuery));(function(d){var b=window.location.protocol+"//"+window.location.host;function c(){a()}function a(){return d.getJSON(b+"/api/stories.json?limit=8&include_loc=true&callback=?",function(f){if(f.hasOwnProperty("stories")){e(f.stories,f.addresses)}})}function e(h,k){var j="";for(var g=0;g<h.length;++g){var f=h[g];if(d.isEmptyObject(k)){address_token=null}else{address_token=k[f.result_token]}if(g%2==0){j+=prepareStoryHTML("story",f.content,f.author,f.time_ago,b,f.result_token,address_token,true)}else{j+=prepareStoryHTML("story even",f.content,f.author,f.time_ago,b,f.result_token,address_token,true)}}d("#stories h2").after(j)}return{init:c()}}(jQuery));(function(a){a.fn.marquee=function(b){var e=[],d=this.length;function c(m,k,l){var j=l.behavior,h=l.width,g=l.dir;var i=0;if(j=="alternate"){i=m==1?k[l.widthAxis]-(h*2):h}else{if(j=="slide"){if(m==-1){i=g==-1?k[l.widthAxis]:h}else{i=g==-1?k[l.widthAxis]-(h*2):0}}else{i=m==-1?k[l.widthAxis]:0}}return i}function f(){var h=e.length,j=null,m=null,l={},k=[],g=false;while(h--){j=e[h];m=a(j);l=m.data("marqueeState");if(m.data("paused")!==true){j[l.axis]+=(l.scrollamount*l.dir);g=l.dir==-1?j[l.axis]<=c(l.dir*-1,j,l):j[l.axis]>=c(l.dir*-1,j,l);if((l.behavior=="scroll"&&l.last==j[l.axis])||(l.behavior=="alternate"&&g&&l.last!=-1)||(l.behavior=="slide"&&g&&l.last!=-1)){if(l.behavior=="alternate"){l.dir*=-1}l.last=-1;m.trigger("stop");l.loops--;if(l.loops===0){if(l.behavior!="slide"){j[l.axis]=c(l.dir,j,l)}else{j[l.axis]=c(l.dir*-1,j,l)}m.trigger("end")}else{k.push(j);m.trigger("start");j[l.axis]=c(l.dir,j,l)}}else{k.push(j)}l.last=j[l.axis];m.data("marqueeState",l)}else{k.push(j)}}e=k;if(e.length){setTimeout(f,25)}}this.each(function(j){var n=a(this),g=n.attr("width")||n.width(),o=n.attr("height")||n.height(),p=n.after("<div "+(b?'class="'+b+'" ':"")+'style="display: block-inline; width: '+g+"px; height: "+o+'px; overflow: hidden;"><div style="float: left; white-space: nowrap;">'+n.html()+"</div></div>").next(),m=p.get(0),k=0,l=(n.attr("direction")||"left").toLowerCase(),h={dir:/down|right/.test(l)?-1:1,axis:/left|right/.test(l)?"scrollLeft":"scrollTop",widthAxis:/left|right/.test(l)?"scrollWidth":"scrollHeight",last:-1,loops:n.attr("loop")||-1,scrollamount:n.attr("scrollamount")||this.scrollAmount||2,behavior:(n.attr("behavior")||"scroll").toLowerCase(),width:/left|right/.test(l)?g:o};if(n.attr("loop")==-1&&h.behavior=="slide"){h.loops=1}n.remove();if(/left|right/.test(l)){p.find("> div").css("padding","0 "+g+"px")}else{p.find("> div").css("padding",o+"px 0")}p.bind("stop",function(){p.data("paused",true)}).bind("pause",function(){p.data("paused",true)}).bind("start",function(){p.data("paused",false)}).bind("unpause",function(){p.data("paused",false)}).data("marqueeState",h);e.push(m);m[h.axis]=c(h.dir,m,h);p.trigger("start");if(j+1==d){f()}});return a(e)}}(jQuery));(function(h){var m=window.location.protocol+"//"+window.location.host;var c=h("marquee");var b=[];var i=0;var k=0;var n;var d=false;var e=false;function l(){j()}function j(){h.getJSON(m+"/api/headlines.json?callback=?",function(q){var p,o=q.length;if(o>0){for(p=0;p<o;++p){b.push({pq_id:q[p].pq_id,hdl:q[p].hdl,nyt_url:q[p].ny_url})}d=true;if(b.length>0){a()}else{g()}}else{g()}})}function a(){var r,p=b.length,o;var s="";b=_.shuffle(b);var t=environment.onSite=="true";for(r=0;r<p;++r){o=b[r];var q;if(t){q="http://search.proquest.com/results/135C45E5A5F4B1EE9E0/1/$5bqueryType$3dbasic:OS$3b+sortType$3dDateAsc$3b+searchTerms$3d$5b$3cAND$7ccitationBodyTags:"+o.pq_id+"$3e$5d$3b+searchParameters$3d$7bNAVIGATORS$3dsourcetypenav,pubtitlenav,objecttypenav,languagenav$28filter$3d200$2f0$2f*$29,decadenav$28filter$3d110$2f0$2f*,sort$3dname$2fascending$29,yearnav$28filter$3d1100$2f0$2f*,sort$3dname$2fascending$29,yearmonthnav$28filter$3d120$2f0$2f*,sort$3dname$2fascending$29,monthnav$28sort$3dname$2fascending$29,daynav$28sort$3dname$2fascending$29,+RS$3dOP,+jstorMuseCollections$3dMUSEALL,+chunkSize$3d20,+instance$3dprod.academic,+ftblock$3d194000+7+194007,+removeDuplicates$3dtrue$7d$3b+metaData$3d$7bUsageSearchMode$3dQuickSearch,+dbselections$3dallAvailable$7d$5d?accountid=35635"}else{q=o.nyt_url}s+=' <a href="'+q+'" target="_blank" title="open link in new window">'+o.hdl+"</a> &middot; &middot; &middot;"}c.empty();c.append(s);if(typeof c!=="undefined"){c.marquee("pointer").mouseover(function(){h(this).trigger("stop")}).mouseout(function(){h(this).trigger("start")})}}function f(p){var o=document.createElement("a");o.href=p;return o}function g(){c.empty();c.append("... No headlines for this day ... No headlines for this day ... No headlines for this day ... No headlines for this day ... No headlines for this day ...")}return{init:l()}}(jQuery));