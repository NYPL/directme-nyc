/**	For `Youtube Embed`, reload `iframe` with random video_id from set of census youtube ids */

define(['jquery'], function($) {

	(function() {
		var vids = ['cImIlPSuyR8']
		$('<iframe />', {
    		name: 'ytplayer',
    		id: 'ytplayer',
    		src: 'http://www.youtube.com/embed/' + vids[Math.floor(Math.random() * vids.length)] + '?wmode=opaque',
    		frameborder: '0',
		}).appendTo('.embed');
	})();
	
});