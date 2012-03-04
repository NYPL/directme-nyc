define(['jquery', 'modules/DV_load'], function($, loadDV) {

	function _init() {
		return mapLink();
	}

	function mapLink() {
		$('.borough').on('click', function(event) {
			$.when(loadDV.init(event.target.id)).done(function() {
				log("loaded!");
				$('html, body').animate({
					scrollTop: $(loadDV.loaded()).offset().top
				}, 500);
			});
			return false;
		});
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});