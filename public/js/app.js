/** ## App Initialization for all handlers */
(function($) {

	function _init() {
		//log('init app');
		$(document).ready(function() {
			ajaxSetup();
			//typical header bar
			setCurrent('#nav_bar a');
			//track analytics
			analytics.track('UA-1420324-103');
		});
	}

	 function ajaxSetup() {
		/*
		* Set the CSRF token for each AJAX request, Rack::Csrf handle the rest.
		* Assumes your layout has a metatag with name of "_csrf" and you're
		* using the default Rack:Csrf header setup.
		*/
		$.ajaxSetup({
			cache: true,
			
			beforeSend: function(xhr) {
				var token = $('meta[name="_csrf"]').attr('content');
				xhr.setRequestHeader('X_CSRF_TOKEN', token);
			}
		});
	}

	function setCurrent(elem) {
		$(elem).each(function() {
			if ($(this).attr('href') === location.pathname) {
				$(this).addClass('current');
			}
		});

		$(elem).hover(function() {
			$(this).addClass('current');
		}, 
		function() {
			if ($(this).attr('href') !== location.pathname) {
				$(this).removeClass('current');
			}
		});		
	}

	return {
		init: _init()
	};

}(jQuery));