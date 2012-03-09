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
			radiusLT: 0,
			radiusRT: 10,
			radiusRB: 0, 
			radiusLB: 10,
			width: 350,
			height: 250,
			fade: false,
			cursorOffsetX:parseInt(-355/2),
			cursorOffsetY:-270,
			borderColor:'#f2730b'
		})
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});