(function($) {

	//globals
	var page_idx = 0;

	function _init() {
		//defined module inits
		jloupe_init();
		tab_init();

		$.subscribe('clickSpot', funModal);
		hide_Modal();
	}

	function hide_Modal() {
		$('#loc_add').on('hide', function () {
			resetForm();
			$('.thejloupe').remove();
			reInitMag();
		});
	}

	function show_Modal(callback) {
		$('#loc_add').on('show', function() {
			resetForm();
			window_Modal(this);
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
		if (environment.hasOwnProperty('streets')) {
		}
		else {
			$.getScript('/js/modules/fuzzy.js', function(script, textStatus, jqxhr) {
				fuzzy_init();
				autoCompleteO(page_idx);
				$('.popovers').popover();
			});
		}

		show_Modal(function() {
			$('#loc_add').modal({
				'show': true,
				'keyboard': false,
				'backdrop': 'static'
			});
		});
	}

	function reInitMag() {
		jloupe_init();
		$.publish('pages', []);
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
}(jQuery));