define(['jquery'], function($) {

	function _init() {
		return mapLink()
	}

	function mapLink() {
		$('.borough').on('click', function(event) {
			window.location = '/DV/' + $(this).attr('id');
		});
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});