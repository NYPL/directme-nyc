(function($) {

	//globals
	var page_idx = 0;

	//init method for module
	function _init() {
		//defined module inits
		jloupe().init();
		jloupe().tab_init();

		//subscribe to when a person clicks on an area... referenced publish in DV/helpers/helpers.js
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

	//hide and show events for the modal
	function show_Modal(callback) {
		$('#loc_add').on('show', function() {
			resetForm();
			window_Modal(this);
		});

		if (typeof callback !=='undefined') {
			callback();
		}
	}

	//set where on the screen the modal shows up
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

	//changes page global to the proper page index (what page we're on) and if streets hasn't been set in the environment
	//then load fuzzy.js and initialize it
	function funModal(e, page) {
		page_idx = page;
		if (environment.hasOwnProperty('streets')) {
			return false;
		}
		else {
			$.getScript('/assets/fuzzy.js', function(script, textStatus, jqxhr) {
				fuzzy().init();
				fuzzy().autoCompleteO(page_idx);
				$('.popovers').popover();
			});
		}
		//twitter bootstrap, typical setup of how to call modal
		show_Modal(function() {
			$('#loc_add').modal({
				'show': true,
				'keyboard': false,
				'backdrop': 'static'
			});
		});
	}

	//re-initialize the magnifier and call publish on the pages event
	function reInitMag() {
		jloupe().init();
		$.publish('pages', []);
	}

	/** Return instantiated function */
	return {
		init: _init()
	}
}(jQuery));