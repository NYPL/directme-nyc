define(['require', 'jquery', 'modules/DV_load'], function(require, $, loadDV) {

	function _init() {
		//load jsons
		var urlpath = window.location.protocol + "//" + window.location.host + window.location.pathname;

		$.getJSON(urlpath + 'dvs?callback=?', function(data) {
			for (var i = 0; i < data.length; i++) {
				environment[data[i].borough] = data[i]
			}
		});

		return mapLink()
	}

	function mapLink() {
		$('.borough').on('click', function(event) {
			$.when(loadDV.init(event.target.id)).done(function() {
				log("loaded!");
				$('.reheader').show();
				$('html, body').animate({
					scrollTop: $('.DV').offset().top
				}, 500)
			});
			return false;
		});
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});