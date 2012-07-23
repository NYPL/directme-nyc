(function($) {

	function _init() {
		pubsub();
	}
	//publish-subscribe implementation
	function pubsub() {
		var o = $({});
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

	/** Return instantiated function */
	return {
		init: _init()
	};
}(jQuery));