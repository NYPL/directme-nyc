define(['jquery'], function($) {
	function _init() {

		var DVmap = (function() {
			var brooklyn = function() {
				return $('#DV-bk');
			}
			return {
				brooklyn: brooklyn()
			};
		})();

		return mapLink(DVmap);
	}

	function mapLink(DVmap) {
		log(DVmap)
		$('.borough').on('click', function(event) {
			$('html, body').animate({
				scrollTop: DVmap[event.target.id].offset().top
			}, 2000);
			return false;
		});
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});