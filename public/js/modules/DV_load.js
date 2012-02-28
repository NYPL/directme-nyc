define(['jquery'], function($) {

	//anon globals
	var loaded = "";

	function _init(borough) {

		var DVloader = {
			brooklyn: {
				url: "https://www.documentcloud.org/documents/19864-goldman-sachs-internal-emails.json",
				selector: "DV-bk"
			},
			manhattan: {
				url: "https://www.documentcloud.org/documents/19864-goldman-sachs-internal-emails.json",
				selector: "DV-man"
			}
		};

		loader(DVloader[borough])
		onWindowChange();
	}

	function DVloaded() {
		return loaded;
	}

	function onWindowChange() {
		$(window).resize(function() {
			$('#DV-bk').width(modWidth());
		});
	}

	function modWidth() {
		return $('#main').width();
	}

	function loader(borough) {
		$.when(createDiv(borough.selector)).done(function() {
			var docURrl = borough.url;
			DV.load(docURrl, { 
				container: '#' + borough.selector,
				height: 1200,
				width: parseInt(modWidth()),
				sidebar: false
			});
		});
	}

	function createDiv(selector) {
		var query_sel = '#' + selector;
		loaded = query_sel;
		var setPlace = 0;
		if ($('.DV > *').length > 0) {
			setPlace = $('.active').height() + 'px';
			$.when($('.active').remove()).done(function() {
				$('.DV').append('<div id=' + selector + ' class="span12 active"></div>');
				$(query_sel).css('margin-top', setPlace);
			});
		}
		else {
			setPlace = $('#main').height() + 'px';
			$('.DV').append('<div id=' + selector + ' class="span12 active"></div>');
			$(query_sel).css('margin-top', setPlace);
		}
	}

	/** Return instantiated function */
	return {
		init: _init,
		loaded: DVloaded
	};
});