/**	For `Youtube Embed`, reload `iframe` with random video_id from set of census youtube ids */
(function($) {
	var vids = ['cImIlPSuyR8', 'OwZk6rASC8k', 'dXY1pHEf5hU', 'xEIO4mWgS2E'];
	$('<iframe />', {
		name: 'ytplayer',
		id: 'ytplayer',
		src: 'http://www.youtube.com/embed/' + vids[Math.floor(Math.random() * vids.length)] + '?wmode=opaque',
		frameborder: '0'
	}).appendTo('.embed');
}(jQuery));