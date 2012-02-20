define(function() {
	function _init() {
		embedYTVideo();
	}

	function embedYTVideo()
	{
		// embed youtube
		var params		= {allowScriptAccess: "always"};
		var atts 		= {id: "myytplayer"};
		var flashvars	= {};

		swfobject.embedSWF("http://www.youtube.com/apiplayer?version=3&enablejsapi=1&playerapiid=ytplayer", 
			"ytapiplayer", "470", "200", "9", null, flashvars, params, atts);
	}

	function onYouTubePlayerReady(playerId) {
		console.log("check event");
		ytplayer = document.getElementById(playerId);
		ytplayer.addEventListener("onError", "onPlayerError");
	}

	function onPlayerError(errorCode) {
		alert("An error occured of type:" + errorCode);
	}

	return {
		init:(function() {
			_init();
		})()
	};
});