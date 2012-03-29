define(['require', 'jquery', 'modules/fuzzy', 'modules/jloupe'], function(require, $, fuzzy, magView) {

	//globals
	var page_idx = 0;

	function _init() {
		//defined module inits
		magView.init();
		magView.tab_init();

		$.subscribe('clickSpot', funModal);

		hide_Modal();
	}

	function hide_Modal() {
		$('#loc_add').on('hidden', function () {
			resetForm();
			reInitMag();
		});
	}

	function show_Modal(callback) {
		$('#loc_add').on('show', function() {
			if (environment.hasOwnProperty('streets')) {
				window_Modal(this);
			}
			else {
				fuzzy.init();
				fuzzy.search(page_idx);
				window_Modal(this);
				$('.popovers').popover();
			}
		});

		if (typeof callback !=='undefined') {
			callback();
		}

	}

	function window_Modal(elem) {
		var _modal = $('.modal');
		_modal.css('left',($(window).width()/2) - ($(elem).width()/2) + 'px');
		var _modal_top = $(window).height()/6 + 120;
		if ($(window).height() < _modal_top + _modal.height()) {
			_modal_top = 0;
		}
		_modal.css('top',(_modal_top + 'px'));
	}

	function resetForm() {
		$('#frm-modal input').each(function() {
			$(this).val('');
		});
	}

	function funModal(e, page) {
		page_idx = page;
		show_Modal(function() {
			$('#loc_add').modal({
				'show': true,
				'keyboard': false,
				'backdrop': 'static'
			});
		});
	}

	function reInitMag() {
		$('.modal').hide();
		magView.init();
		$.publish('pages', []);
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});