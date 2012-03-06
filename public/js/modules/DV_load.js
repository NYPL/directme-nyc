define(['jquery'], function($) {

	function _init(borough) {
		var DVloader = {
			testset: {
				json_obj: environment.testset,
				selector: "DV-testset"
			},
			brooklyn: {
				json_obj: environment.testset,
				selector: "DV-brooklyn"
			}
		};

		var res_dfd = loader(DVloader[borough]);
		return res_dfd.promise();
	}

	function onWindowChange(selector) {
		$(window).resize(function() {
			$(selector).width(modWidth());
		});
	}

	function modWidth() {
		return $('body').width();
	}

	function loader(borough) {
		var dfd = $.Deferred();
		$.when(createDiv(borough.selector)).done(function() {
			var docURrl = borough.json_obj;
			offset = $(window).width() - $('.DV').width();
		 	setTimeout(function() {
				dfd.resolve(
					DV.load(docURrl, { 
						container: '#' + borough.selector,
						height: 1200,
						width: parseInt(modWidth()),
						sidebar: false
					})
				);
		 	}, 700);
			onWindowChange('#' + borough.selector);
		});

		return dfd;
	}

	function createDiv(selector) {
			var query_sel = '#' + selector;
			var setPlace = 0;
			if ($('.DV > .active').length > 0) {
				$('.active').remove().promise().done(function() {
					log("removed!");
					$('.DV').append('<div id=' + selector + ' class="active"></div>');
				});
			}
			else {
				setPlace = $('#mainwrapper').height() + 'px';
				$('.DV').append('<div id=' + selector + ' class="active"></div>');
				$('.DV').css('margin-top', setPlace);
			}
		}

	/** Return instantiated function */
	return {
		init: _init
	};
});