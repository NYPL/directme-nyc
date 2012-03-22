define(['require', 'jquery', 'modules/fuzzy'], function(require, $, fuzzy) {

	//globals
	var page_idx = 0;

	function _init() {
		//defined module inits

		$.subscribe('pages', recFunc)
		$.subscribe('clickSpot', funModal);

		//setup modal
		resetForm();
		$('#loc_add').on('show', function() {
			if (environment.hasOwnProperty('streets')) {
				log('loaded')
			}
			else {
				fuzzy.init();
			}
			
			fuzzy.search(page_idx);

			var _modal = $('.modal');
			_modal.css('left',($(window).width()/2) - ($(this).width()/2) + 'px');
			var _modal_top = $(window).height()/6 + 120;
			if ($(window).height() < _modal_top + _modal.height()) {
				_modal_top = 0;
			}
			_modal.css('top',(_modal_top + 'px'));
			$('.popovers').popover();
		});
		$('#loc_add').on('hidden', function () {
			resetForm();
			reInitMag();
		});

	}

	function resetForm() {
		$('#frm-modal input').each(function() {
			$(this).val('');
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
			fade: false,
			cursorOffsetX:parseInt(-480/2),
			cursorOffsetY:-128,
			borderColor:'#333',
			locked: false
		});
	}

	function funModal(e, page) {
		page_idx = page;
		$('#loc_add').modal({
			'show': true,
			'keyboard': false
		});
	}

	function reInitMag() {
		$('.modal').hide();
		$.publish('pages', []);
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});