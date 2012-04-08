!function(e){var a=function(i,h){this.options=h;this.$element=e(i).delegate('[data-dismiss="modal"]',"click.dismiss.modal",e.proxy(this.hide,this))};a.prototype={constructor:a,toggle:function(){return this[!this.isShown?"show":"hide"]()},show:function(){var h=this;if(this.isShown){return}e("body").addClass("modal-open");this.isShown=true;this.$element.trigger("show");d.call(this);c.call(this,function(){var i=e.support.transition&&h.$element.hasClass("fade");!h.$element.parent().length&&h.$element.appendTo(document.body);h.$element.show();if(i){h.$element[0].offsetWidth}h.$element.addClass("in");i?h.$element.one(e.support.transition.end,function(){h.$element.trigger("shown")}):h.$element.trigger("shown")})},hide:function(i){i&&i.preventDefault();if(!this.isShown){return}var h=this;this.isShown=false;e("body").removeClass("modal-open");d.call(this);this.$element.trigger("hide").removeClass("in");e.support.transition&&this.$element.hasClass("fade")?g.call(this):f.call(this)}};function g(){var h=this,i=setTimeout(function(){h.$element.off(e.support.transition.end);f.call(h)},500);this.$element.one(e.support.transition.end,function(){clearTimeout(i);f.call(h)})}function f(h){this.$element.hide().trigger("hidden");c.call(this)}function c(k){var j=this,i=this.$element.hasClass("fade")?"fade":"";if(this.isShown&&this.options.backdrop){var h=e.support.transition&&i;this.$backdrop=e('<div class="modal-backdrop '+i+'" />').appendTo(document.body);if(this.options.backdrop!="static"){this.$backdrop.click(e.proxy(this.hide,this))}if(h){this.$backdrop[0].offsetWidth}this.$backdrop.addClass("in");h?this.$backdrop.one(e.support.transition.end,k):k()}else{if(!this.isShown&&this.$backdrop){this.$backdrop.removeClass("in");e.support.transition&&this.$element.hasClass("fade")?this.$backdrop.one(e.support.transition.end,e.proxy(b,this)):b.call(this)}else{if(k){k()}}}}function b(){this.$backdrop.remove();this.$backdrop=null}function d(){var h=this;if(this.isShown&&this.options.keyboard){e(document).on("keyup.dismiss.modal",function(i){i.which==27&&h.hide()})}else{if(!this.isShown){e(document).off("keyup.dismiss.modal")}}}e.fn.modal=function(h){return this.each(function(){var k=e(this),j=k.data("modal"),i=e.extend({},e.fn.modal.defaults,k.data(),typeof h=="object"&&h);if(!j){k.data("modal",(j=new a(this,i)))}if(typeof h=="string"){j[h]()}else{if(i.show){j.show()}}})};e.fn.modal.defaults={backdrop:true,keyboard:true,show:true};e.fn.modal.Constructor=a;e(function(){e("body").on("click.modal.data-api",'[data-toggle="modal"]',function(l){var k=e(this),i,h=e(k.attr("data-target")||(i=k.attr("href"))&&i.replace(/.*(?=#[^\s]+$)/,"")),j=h.data("modal")?"toggle":e.extend({},h.data(),k.data());l.preventDefault();h.modal(j)})})}(window.jQuery);!function(a){a(function(){a.support.transition=(function(){var c=document.body||document.documentElement,d=c.style,b=d.transition!==undefined||d.WebkitTransition!==undefined||d.MozTransition!==undefined||d.MsTransition!==undefined||d.OTransition!==undefined;return b&&{end:(function(){var e="TransitionEnd";if(a.browser.webkit){e="webkitTransitionEnd"}else{if(a.browser.mozilla){e="transitionend"}else{if(a.browser.opera){e="oTransitionEnd"}}}return e}())}})()})}(window.jQuery);!function(b){var a=function(d,c){this.init("tooltip",d,c)};a.prototype={constructor:a,init:function(f,e,d){var g,c;this.type=f;this.$element=b(e);this.options=this.getOptions(d);this.enabled=true;if(this.options.trigger!="manual"){g=this.options.trigger=="hover"?"mouseenter":"focus";c=this.options.trigger=="hover"?"mouseleave":"blur";this.$element.on(g,this.options.selector,b.proxy(this.enter,this));this.$element.on(c,this.options.selector,b.proxy(this.leave,this))}this.options.selector?(this._options=b.extend({},this.options,{trigger:"manual",selector:""})):this.fixTitle()},getOptions:function(c){c=b.extend({},b.fn[this.type].defaults,c,this.$element.data());if(c.delay&&typeof c.delay=="number"){c.delay={show:c.delay,hide:c.delay}}return c},enter:function(d){var c=b(d.currentTarget)[this.type](this._options).data(this.type);if(!c.options.delay||!c.options.delay.show){c.show()}else{c.hoverState="in";setTimeout(function(){if(c.hoverState=="in"){c.show()}},c.options.delay.show)}},leave:function(d){var c=b(d.currentTarget)[this.type](this._options).data(this.type);if(!c.options.delay||!c.options.delay.hide){c.hide()}else{c.hoverState="out";setTimeout(function(){if(c.hoverState=="out"){c.hide()}},c.options.delay.hide)}},show:function(){var g,c,i,e,h,d,f;if(this.hasContent()&&this.enabled){g=this.tip();this.setContent();if(this.options.animation){g.addClass("fade")}d=typeof this.options.placement=="function"?this.options.placement.call(this,g[0],this.$element[0]):this.options.placement;c=/in/.test(d);g.remove().css({top:0,left:0,display:"block"}).appendTo(c?this.$element:document.body);i=this.getPosition(c);e=g[0].offsetWidth;h=g[0].offsetHeight;switch(c?d.split(" ")[1]:d){case"bottom":f={top:i.top+i.height,left:i.left+i.width/2-e/2};break;case"top":f={top:i.top-h,left:i.left+i.width/2-e/2};break;case"left":f={top:i.top+i.height/2-h/2,left:i.left-e};break;case"right":f={top:i.top+i.height/2-h/2,left:i.left+i.width};break}g.css(f).addClass(d).addClass("in")}},setContent:function(){var c=this.tip();c.find(".tooltip-inner").html(this.getTitle());c.removeClass("fade in top bottom left right")},hide:function(){var c=this,d=this.tip();d.removeClass("in");function e(){var f=setTimeout(function(){d.off(b.support.transition.end).remove()},500);d.one(b.support.transition.end,function(){clearTimeout(f);d.remove()})}b.support.transition&&this.$tip.hasClass("fade")?e():d.remove()},fixTitle:function(){var c=this.$element;if(c.attr("title")||typeof(c.attr("data-original-title"))!="string"){c.attr("data-original-title",c.attr("title")||"").removeAttr("title")}},hasContent:function(){return this.getTitle()},getPosition:function(c){return b.extend({},(c?{top:0,left:0}:this.$element.offset()),{width:this.$element[0].offsetWidth,height:this.$element[0].offsetHeight})},getTitle:function(){var e,c=this.$element,d=this.options;e=c.attr("data-original-title")||(typeof d.title=="function"?d.title.call(c[0]):d.title);e=e.toString().replace(/(^\s*|\s*$)/,"");return e},tip:function(){return this.$tip=this.$tip||b(this.options.template)},validate:function(){if(!this.$element[0].parentNode){this.hide();this.$element=null;this.options=null}},enable:function(){this.enabled=true},disable:function(){this.enabled=false},toggleEnabled:function(){this.enabled=!this.enabled},toggle:function(){this[this.tip().hasClass("in")?"hide":"show"]()}};b.fn.tooltip=function(c){return this.each(function(){var f=b(this),e=f.data("tooltip"),d=typeof c=="object"&&c;if(!e){f.data("tooltip",(e=new a(this,d)))}if(typeof c=="string"){e[c]()}})};b.fn.tooltip.Constructor=a;b.fn.tooltip.defaults={animation:true,delay:0,selector:false,placement:"top",trigger:"hover",title:"",template:'<div class="tooltip"><div class="tooltip-arrow"></div><div class="tooltip-inner"></div></div>'}}(window.jQuery);!function(b){var a=function(d,c){this.init("popover",d,c)};a.prototype=b.extend({},b.fn.tooltip.Constructor.prototype,{constructor:a,setContent:function(){var e=this.tip(),d=this.getTitle(),c=this.getContent();e.find(".popover-title")[b.type(d)=="object"?"append":"html"](d);e.find(".popover-content > *")[b.type(c)=="object"?"append":"html"](c);e.removeClass("fade top bottom left right in")},hasContent:function(){return this.getTitle()||this.getContent()},getContent:function(){var d,c=this.$element,e=this.options;d=c.attr("data-content")||(typeof e.content=="function"?e.content.call(c[0]):e.content);d=d.toString().replace(/(^\s*|\s*$)/,"");return d},tip:function(){if(!this.$tip){this.$tip=b(this.options.template)}return this.$tip}});b.fn.popover=function(c){return this.each(function(){var f=b(this),e=f.data("popover"),d=typeof c=="object"&&c;if(!e){f.data("popover",(e=new a(this,d)))}if(typeof c=="string"){e[c]()}})};b.fn.popover.Constructor=a;b.fn.popover.defaults=b.extend({},b.fn.tooltip.defaults,{placement:"right",content:"",template:'<div class="popover"><div class="arrow"></div><div class="popover-inner"><h3 class="popover-title"></h3><div class="popover-content"><p></p></div></div></div>'})}(window.jQuery);