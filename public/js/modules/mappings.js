define(['jquery', 'modules/DV_load'], function($, loadDV) {

	function _init() {
		//load jsons
		var urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname;

		$.getJSON(urlpath + 'dvs?callback=?', function(data) {
			for (var i = 0; i < data.length; i++) {
				environment[data[i].DV.borough] = data[i].DV 
			}
		});

		return mapLink()
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