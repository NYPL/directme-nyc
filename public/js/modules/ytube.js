/**	For `Youtube Embed`, reload `iframe` with random video_id from set of census youtube ids */

define(['jquery'], function($) {
	function _init() {
		var vids = ['cImIlPSuyR8']
		$('<iframe />', {
    		name: 'ytplayer',
    		id: 'ytplayer',
    		src: 'http://www.youtube.com/embed/' + vids[Math.floor(Math.random() * vids.length)],
    		frameborder: '0',
    		height: '200',
    		width: '470'
		}).appendTo('#youtube');
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});