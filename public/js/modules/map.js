define(['jquery'], function($) {
	function _init() {

		var DVmap = (function() {
			var brooklyn = function() {
				return $('#DV-bk');
			}
			var manhattan = function() {
				return $('#DV-man');
			}
			var queens = function() {
				return $('#DV-queens');
			}
			var staten = function() {
				return $('#DV-staten');
			}
			var bronx = function() {
				return $('#DV-bronx');
			}
			return {
				brooklyn: brooklyn(),
				manhattan: manhattan(),
				queens: queens(),
				staten: staten(), 
				bronx: bronx()
			};
		})();

		return mapLink(DVmap);
	}

	function mapLink(DVmap) {
		log(DVmap)
		$('.borough').on('click', function(event) {
			$('html, body').animate({
				scrollTop: DVmap[event.target.id].offset().top - $('.navbar').height()
			}, 300);
			return false;
		});
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});