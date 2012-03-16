define(['jquery'], function($) {

	function _init(elem) {
		//defined module inits
		setCurrent(elem);
	}

	function setCurrent(elem) {
		$(elem).hover(function() {
			$(this).addClass('current');
		}, 
		function() {
			$(this).removeClass('current');
		});		
	}

	/** Return instantiated function */
	return {
		init: _init,
	};
});