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


	return {
		init: _init()
	};
});