/*
 jQuery Loupe v1.3.2
 https://github.com/iufer/jLoupe
 w/ edits/changes/additions by Zeeshan Lakhani
*/

jQuery.fn.jloupe = function(o){
	var version = '1.3.2';
	var options = {		
		width:200,
		height:200,
		margin:0,
		cursorOffsetX:0,
		cursorOffsetY:0,
		borderColor:'#999',
		backgroundColor:'#fff',
		image: false,
		repeat: false,
		fade: false,
		_offset: 35,
		locked: false
	};
	if(o) {
		jQuery.extend(options, o);
		if(o.hasOwnProperty('color')) {
			options.borderColor = options.backgroundColor = o.color;
		}
	}
	var loupe = $('<div />').addClass('thejloupe')
		.css('position','absolute')
		.css('z-index', '20003')
		.css('width',options.width +'px')
		.css('height',options.height +'px')
		.css('backgroundColor', options.borderColor)
		.css('overflow', 'hidden')
		.hide()
		.appendTo('body');
	if(!options.borderColor) loupe.css('backgroundColor', 'none')
	if(options.repeat) loupe.css('backgroundRepeat', 'repeat');	
	else loupe.css('backgroundRepeat', 'no-repeat');	
			
	var view = $('<div />').addClass('thejloupeview')
		.css('width',options.width-options.margin*2 +'px')
		.css('height',options.height-options.margin*2 +'px')
		.css('backgroundRepeat','no-repeat')
		.css('marginLeft', options.margin +'px')
		.css('marginTop', options.margin +'px')
		.appendTo(loupe);
	
	var help = $('<div>Line up arrow with name. Click to freeze frame.</div>').addClass('thejloupehelp')
		.css('width',options.width-options.margin*2 +'px')
		.css('paddingTop','4px')
		.css('height','20px')
		.css('textAlign','center')
		.css('backgroundColor','#000')
		.css('color','#fff')
		.css('position','absolute')
		.css('bottom', '0')
		.appendTo(view);

	var posx = 0; 
	var posy = 0;

	if(options.backgroundColor) view.css('backgroundColor', options.backgroundColor);

	if(options.locked) {
		var locked_mode = options.locked
	};
	var drag_mode = false;

	var h = $(this).parent('a').attr('href');
	var s = $(this).attr('src');
	s = (h) ? h : s;
	var i = $('<img />').attr('src', s);	
	
	var lastdown = 0;
	var isdown = false;
	var cancelClick = false;
	var isMoving = false;
	
	var ua = navigator.userAgent;
	var isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
	
	$(this).data('zoom',i);	

	$.subscribe('tabletTouch', tabletTouch);
	
	function tabletTouch(e, num, page, touch) {
		if ($('.modal-backdrop').length == 0) {
			// background stuff
			var o = $(loupe).offset();
			var i = $('<img />').attr('src', page.magImageEl[0]);
			$(loupe).data('zoom',i);
			$(loupe).addClass('active-loupe');	

			posx = touch.clientX;
			posy = touch.clientY;
			
			w = $(i).prop ? $(i).prop('width') : $(i).attr('width');
			h = $(i).prop ? $(i).prop('height') : $(i).attr('height');
			
			zlo = parseInt((((posx - touch.target.x) / touch.target.width) * w *-1) + options._offset);
			zto = parseInt((((posy - touch.target.y) / touch.target.height) * h *-1) + (options.height/2));
			
			/*
			log(touch.clientX + "," + touch.clientY + "," + w + "," + h + "," + zlo + "," + zto + "," + options._offset + "," + options.height);
			
			var str = "touch.target:";
			for (var k in touch.target) {
				str += "[" + k + "]=>" + touch.target[k] + ",";
			}
			log(str);
			*/
			
			$(view).css('backgroundImage', 'url('+ $(i).attr('src') +')').css('backgroundPosition', zlo+'px ' + zto+'px');
			
			// show loupe
			$(loupe).show();
			// animation + modal
			$(loupe).animate({
				top: $(window).height()/6,
				left: ($(window).width()/2) - ($(loupe).width()/2)
				}, 300, function() {
					$.publish('clickSpot', [num]);
			});
		}
	}

	$(document).on('mouseup', function() {
		clearTimeout(this.downTimer);
		$(document).off('mousemove')
		drag_mode = false;
	});

	$(this)
	.on({
		mousemove: function(e){
			if (!isiPad) {
				if (isdown) {
					// user is dragging
				    drag_mode = true;
				    $(loupe).stop(true, true);
				    if(options.fade) $(loupe).fadeOut(10);
				    else $(loupe).hide();
				    cancelClick = true
				}
				if (locked_mode !== true && drag_mode !== true && !isMoving) {
					$(loupe).hide();
					$(loupe).show();

					if ($(view).css('background-image')) {
						$(loupe).addClass('active-loupe');	
					}
					else {
						$(loupe).removeClass('active-loupe');
					}

					var o = $(this).offset();
					var i = $(this).data('zoom');
					

					if(e.pageX || e.pageY){
						posx = e.pageX;
						posy = e.pageY;
					}
					else if(e.clientX || e.clientY){
						posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
						posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
					}


					if ((posx + options.cursorOffsetX) > ($('.DV').width() - options.width)) {
						_left = $('.DV').width()-options.width;
					}
					else if ((posx + options.cursorOffsetX) <= 0) {
						_left = 0;
					}
					else {
						_left = posx+options.cursorOffsetX;
					}

					if ((posy+options.cursorOffsetY) <= $('#wrapper').height() + $('.DV-header').height()) {
						_top = $('#wrapper').height() + $('.DV-header').height();
					}
					else {
						_top = posy+options.cursorOffsetY;
					}

						
					$(loupe).offset({top:posy+options.cursorOffsetY, left:_left});


					w = $(i).prop ? $(i).prop('width') : $(i).attr('width');
					h = $(i).prop ? $(i).prop('height') : $(i).attr('height');
					zlo = (((posx - o.left) / this.width) * w *-1) + options._offset;
					zto = (((posy - o.top) / this.height) * h *-1) + (options.height/2);
					$(view).css('backgroundImage', 'url('+ $(i).attr('src') +')').css('backgroundPosition', zlo+'px ' + zto+'px');
				}
			} else {
				$(loupe).hide();
			}
		},

		mouseleave: function(){
			if (locked_mode !== true) {
				$(loupe).stop(true, true);
				if(options.fade) $(loupe).fadeOut(75);
				else $(loupe).hide();
			}
		},

		mouseenter: function(){
			if (locked_mode !== true) {
				$(loupe).stop(true, true);
				if(options.fade) $(loupe).fadeIn();
				else $(loupe).show();
			}
		},

		mousedown: function(e) {
			e.preventDefault();
			cancelClick = false;
			lastdown = new Date().getTime();
			isdown = true;
		},
		
		mouseup: function(e) {
			isdown = false;
			var t = new Date().getTime();
			if (t - lastdown < 50) {
				// user was NOT dragging
			    drag_mode = false;
			}
		},

		click: function(e) {
			if ($('.modal-backdrop').length == 0 && locked_mode !== true && cancelClick !== true && typeof $('.active-loupe').css('top') !== 'undefined' && isMoving !== true) {
				locked_mode = true;
				var page_idx = $(this).attr('data-page');
				isMoving = true;
				$('.active-loupe').animate({
					top: $(window).height()/6,
					left: ($(window).width()/2) - ($('.active-loupe').width()/2)
					}, 200, function() {
						isMoving = false;
						isdown = false;
						drag_mode = false;
						$.publish('clickSpot', [page_idx]);
				});
			}
		}
	})
	return this;
};
	

$.support.cssProperty = (function() {
  function cssProperty(p, rp) {
    var b = document.body || document.documentElement;
    var s = b.style;
    if(typeof s == 'undefined') { return false; }
    if(typeof s[p] == 'string') { return rp ? p : true; }
    var v = ['Moz', 'Webkit', 'Khtml', 'O', 'Ms'];
    p = p.charAt(0).toUpperCase() + p.substr(1);
    for(var i=0; i<v.length; i++) {if(typeof s[v[i] + p] == 'string') { return rp ? (v[i] + p) : true; }}
  }
  return cssProperty;
})();