define(['jquery'], function($) {
	function _init() {
		var docURrl = "https://www.documentcloud.org/documents/19864-goldman-sachs-internal-emails.json"
		DV.load(docURrl, { 
			container: '#DV-bk',
			height: 1200,
			width: parseInt(modWidth()),
			sidebar: false
		});

		onWindowChange();
	}

	function onWindowChange() {
		$(window).resize(function() {
			$('#DV-bk').width(modWidth());
		});
	}

	function modWidth() {
		return $('#main').width();
	}

	/** Return instantiated function */
	return {
		init: _init
	};
});