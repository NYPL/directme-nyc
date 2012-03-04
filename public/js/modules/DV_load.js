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

		var res_dfd = loader(DVloader[borough]);
		return res_dfd.promise();
	}

	function DVloaded() {
		return loaded;
	}

	function onWindowChange(selector) {
		$(window).resize(function() {
			$(selector).width(modWidth());
		});
	}

	function modWidth() {
		return $('#main').width();
	}

	function modHeight(selector) {
		return $(window).height();
	}

	function loader(borough) {
		var dfd = $.Deferred();
		$.when(createDiv(borough.selector)).done(function() {
			var docURrl = borough.url;
		 	setTimeout(function() {
				dfd.resolve(
					DV.load(docURrl, { 
						container: '#' + borough.selector,
						height: 1200,
						width: parseInt(modWidth()),
						sidebar: false
					})
				);
		 	}, 1000);
			onWindowChange('#' + borough.selector);
		});

		return dfd;
	}

	function createDiv(selector) {
		var query_sel = '#' + selector;
		loaded = query_sel;
		var setPlace = 0;
		if ($('.DV > *').length > 0) {
			setPlace = $('.active').height() + 'px';
			$('.active').remove().promise().done(function() {
				log("removed!");
				$('.DV').append('<div id=' + selector + ' class="active"></div>');
				$(query_sel).css('margin-top', setPlace);
			});
		}
		else {
			setPlace = $('#main').height() + 'px';
			$('.DV').append('<div id=' + selector + ' class="active"></div>');
			$(query_sel).css('margin-top', setPlace);
		}
	}

	/** Return instantiated function */
	return {
		init: _init,
		loaded: DVloaded
	};
});