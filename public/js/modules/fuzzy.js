define(['jquery'], function($) {

	function _init() {
		var streets = [];
		//loadContent();
	}

	function matchStreets(input) {
		var trimmed = input.replace(/\s/,'');
		var reg = new RegExp(trimmed.split('').join('[^\\n]*'), 'i');
		return streets.filter(function(st) {
			if (st.match(reg)) {
				return st;
			}
		});
	}

	function callback(req, resp) {
		var filtered = matchStreets(req.term);
		resp(filtered);
	}

	function loadContent() {
		$.get("streets.csv", function (content) {
			streets = content.split(new RegExp(/\n/))
				.map(function (element) {
				//Do whatever tidy up here
				return $.trim(element);
			});
			$( "#streets-field" ).autocomplete({
				source: callback
			});
		});
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});