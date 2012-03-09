define(['require', 'jquery', 'modules/DV_load'], function(require, $, loadDV) {

	function _init() {
		pubsub();
		$.subscribe('pages', recFunc);
	}

	function pubsub() {
		var o = $({}),
		s = 'subscribe';
		$.each({
			on: s,
			off: 'un' + s,
			trigger: 'publish'
		}, 
		function(k, v) {
			$[v] = function() {
				o[k].apply(o, arguments)
			};
		});
	}

	function recFunc(e) {
		require(['libs/jquery.jloupe'], function(loupe) {
			setupMag('.DV-pageImage');
		});
	}

	function setupMag(magClass) {
		$(magClass).jloupe ({
			width: 480,
			height: 108,
			fade: true,
			cursorOffsetX:parseInt(-480/2),
			cursorOffsetY:-130,
			borderColor:'#333'
		})
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});