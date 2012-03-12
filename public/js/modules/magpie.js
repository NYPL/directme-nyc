define(['require', 'jquery', 'modules/pubsub'], function(require, $, pubsub) {

	function _init() {
		$.subscribe('pages', recFunc)
		$.subscribe('clickSpot', funModal);
		require(['libs/jquery.jloupe'], function() {});
	}

	function recFunc(e) {
		$('.thejloupe').remove().promise().done(function() {
			$('.thejloupeview').remove().promise().done(function () {
				setupMag('.DV-pageImage');
			});
		});
	}

	function setupMag(magClass) {
		$(magClass).jloupe ({
			width: 480,
			height: 108,
			fade: true,
			cursorOffsetX:parseInt(-480/2),
			cursorOffsetY:-123,
			borderColor:'#333',
			locked: false
		})
	}

	function funModal(e, curr_left, curr_right, large_left, large_right) {
		$('#loc_add').on('show', function() {
			//$('.modal').css('top', ); 
			$('.popovers').popover();
		});
		$('#loc_add').on('hide', function () {
			reInitMag();
		});
		$('#loc_add').modal('show');
	}

	function reInitMag() {
		$.publish('pages', []);
	}

	/** Return instantiated function */
	return {
		init: _init(),
	};
});