/*
 jQuery Loupe v1.3.2
 https://github.com/iufer/jLoupe
 w/ edits/changes/additions by Zeeshan Lakhani
*/

var locked_mode = null;
var drag_mode = null;

var curr_loupe = null;
var curr_view = null;
var curr_options = null;

define(['jquery'], function($) {
	function _init() {
		$.subscribe('pages', reFunc)
		$.subscribe('dragging', dragEvent)
		locked_mode = false;
		drag_mode = false;
	}

	function _tab_init() {
		$.subscribe('tabletTouch', tabletTouch);
	}

	function dragEvent(e, on_off) {
		if (on_off == true) {
			drag_mode = true;

		}
		else {
			setTimeout(function() {
				drag_mode = false;
			}, 375);
		}
	}

	function reFunc(e) {
		$('.thejloupe').remove().promise().done(function() {
			$('.thejloupeview').remove().promise().done(function () {
				setupMag('#DV-pageImage-p0');
				setupMag('#DV-pageImage-p1');
				setupMag('#DV-pageImage-p2');
			});
		});
	}
	function setupMag(elem) {
		var options = {		
			margin:0,
			backgroundColor:'transparent',
			image: false,
			repeat: false,
			_offset: 35,
			width: 480,
			height: 108,
			cursorOffsetX:parseInt(-480/2),
			cursorOffsetY:-150,
			borderColor:'#333'
		};

		var ua = navigator.userAgent;
		var isiPad = /iPad/i.test(ua) || /iPhone OS 3_1_2/i.test(ua) || /iPhone OS 3_2_2/i.test(ua);
		
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
		
		if (!isiPad) {
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
		}

		if(options.backgroundColor) view.css('backgroundColor', options.backgroundColor);

		var h = $(elem).parent('a').attr('href');
		var s = $(elem).attr('src');
		s = (h) ? h : s;
		var i = $('<img />').attr('src', s);	
		
		$(elem).data('zoom',i);

		if (!isiPad) {
			browserEvents(elem, loupe, view, options)
		}
		else {
			tabletSets(loupe, view, options);
		}

	}

	function tabletSets(loupe, view, options) {
		if (!!loupe && !!view && !!options) {
			curr_loupe = loupe;
			curr_view = view;
			curr_options = options;
		}
		else {
			return [curr_loupe, curr_view, curr_options]
		}
	}
	
	function tabletTouch(e, num, page, touch) {
		loupe_vars = tabletSets();
		loupe = loupe_vars[0];
		view = loupe_vars[1];
		options = loupe_vars[2];

		if ($('.modal-backdrop').length == 0) {
			// background stuff
			var o = $(loupe).offset();
			var i = $('<img />').attr('src', page.magImageEl[0]);
			$(loupe).data('zoom',i);
			$(loupe).addClass('active-loupe');	

			var posx = touch.clientX;
			var posy = touch.clientY;
			
			w = $(i).prop ? $(i).prop('width') : $(i).attr('width');
			h = $(i).prop ? $(i).prop('height') : $(i).attr('height');
			
			zlo = (((posx - touch.target.x) / touch.target.width) * w *-1) + options._offset;
			zto = (((posy - touch.target.y) / touch.target.height) * h *-1) + (options.height/2);
			
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

	function browserEvents(elem, loupe, view, options) {
		var clickRun = _.debounce(function(elem) {
			if ($('.modal-backdrop').length == 0 && locked_mode !== true && drag_mode !== true) {
				if ($(loupe).hasClass('active-loupe')) {
					locked_mode = true;
					var page_idx = $(elem).attr('data-page') || $(elem).data('page');
					$('.active-loupe').animate({
						top: $(window).height()/6,
						left: ($(window).width()/2) - ($('.active-loupe').width()/2)
						}, 200, function() {
							$.publish('clickSpot', [page_idx]);
					});

					$(this).die('mousemove');
					$.unsubscribe("pages");
				}
			}
		}, 200);

		$(elem)
		.on({
			mousemove: function(e){
				if (drag_mode == true) {
					loupe.hide();
					return true;
				}
				if (locked_mode !== true) {
					$(loupe).hide().promise().done(function() {
						$(loupe).show();
					});

					if ($(view).css('background-image')) {
						$(loupe).addClass('active-loupe');	
					}
					else {
						$(loupe).removeClass('active-loupe');
					}

					var o = $(this).offset();
					var i = $(this).data('zoom');
					
					var posx = 0, posy = 0;

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
						_top = $('#wrapper').height() + $('.DV-header').height() + 175;
					}
					else {
						_top = posy+options.cursorOffsetY;
					}

						
					$(loupe).offset({top:_top, left:_left});


					w = $(i).prop ? $(i).prop('width') : $(i).attr('width');
					h = $(i).prop ? $(i).prop('height') : $(i).attr('height');
					zlo = (((posx - o.left) / this.width) * w *-1) + options._offset;
					zto = (((posy - o.top) / this.height) * h *-1) + (options.height/2);
					$(view).css('backgroundImage', 'url('+ $(i).attr('src') +')').css('backgroundPosition', zlo+'px ' + zto+'px');
				}
			},

			mouseleave: function(){
				if (locked_mode !== true) {
					$(loupe).removeClass('active-loupe');
					$(loupe).stop(true, true);
					$(loupe).hide();
				}
				
			},

			mouseenter: function(){
				if (locked_mode !== true) {
					$(loupe).stop(true, true);
					$(loupe).show();
				}
				
			},

			click: function(e) {
				e.preventDefault();
				clickRun(elem);
			},

			dblclick: function(e) {
				e.preventDefault();
			} 
		});
	}

	return {
		init: _init,
		tab_init : _tab_init
	}
});