define(['require', 'jquery', 'modules/pubsub'], function(require, $, pubsub) {

	function _init() {
		require(['libs/jquery.jloupe'], function() { log('require loupe'); });
		$.subscribe('pages', recFunc)
		$.subscribe('clickSpot', funModal);

		//setup modal
		$('.modal').css('left', ($(window).width()/2) - ($(this).width/2))
		$('#loc_add').on('show', function() {
			$('.popovers').popover();
		});
		$('#loc_add').on('hidden', function () {
			reInitMag();
		});

	}

	function recFunc(e) {
		$('.thejloupe').remove().promise().done(function() {
			$('.thejloupeview').remove().promise().done(function () {
				$('.DV-pageImage').off('mousemove');
				setupMag('#DV-pageImage-p0');
				setupMag('#DV-pageImage-p1');
				setupMag('#DV-pageImage-p2');
			});
		});
	}

	function setupMag(magClass) {
		$(magClass).jloupe ({
			width: 480,
			height: 108,
			fade: true,
			cursorOffsetX:parseInt(-480/2),
			cursorOffsetY:-128,
			borderColor:'#333',
			locked: false
		})
	}

	function funModal(e, curr_left, curr_right, large_left, large_right) {
		$('#loc_add').modal({
			'show': true,
			'keyboard': false
		});
	}

	function reInitMag() {
		$.publish('pages', []);
	}

	/** Return instantiated function */
	return {
		init: _init(),
	};
});