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

	var posx = 0; 
	var posy = 0;
	var scrolling = false;

	if(options.backgroundColor) view.css('backgroundColor', options.backgroundColor);

	if(options.locked) var locked_mode = options.locked;

	$(this).each(function(){
		var h = $(this).parent('a').attr('href');
		var s = $(this).attr('src');
		s = (h) ? h : s;
		var i = $('<img />').attr('src', s);	
		$(this).data('zoom',i);	
	})
	.on({
		mousemove: function(e){
			if (locked_mode !== true && scrolling === false) {
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
		},

		mouseleave: function(){
			log("jlj")
			if (locked_mode !== true) {
				$(loupe).stop(true, true);
				if(options.fade) $(loupe).fadeOut(100);
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

		click: function(e) {
			e.preventDefault();
			locked_mode = true;

			$('.thejloupe').animate({
				top: $(window).height()/2,
				left: ($(window).width()/2) - ($('.thejloupe').width()/2)
				}, 500, function() {
					$.publish('clickSpot', [posx, posy, parseInt(-zlo + options._offset), parseInt(-zto + (options.height/2))]);
			});
		}
	});
	
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