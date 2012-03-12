define(['require', 'jquery', 'modules/pubsub'], function(require, $, pubsub) {

	function _init() {
		$.subscribe('pages', recFunc)
		$.subscribe('clickSpot', funModal);
	}

	function recFunc(e) {
		require(['libs/jquery.jloupe'], function() {
			setupMag('.DV-pageImage');
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

	function funModal(e, left_pos, right_pos) {
		log(left_pos + ", " + right_pos)
		$('#loc_add').modal('show')
		$('#loc_add').on('hide', function () {
			reInitMag();
		});
	}

	function reInitMag() {
		$('.thejloupe').remove().promise().done(function() {
			$('.thejloupeview').remove().promise().done(function () {
				$.publish('pages', []);
			});
		});
	}

	/** Return instantiated function */
	return {
		init: _init(),
	};
});