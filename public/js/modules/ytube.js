define(function() {
	function _init() {
		embedYTVideo();
	}

	function embedYTVideo()
	{
		// embed youtube
		var params		= {allowScriptAccess: "always", "allowFullScreen": false};
		var atts 		= {id: "ytplayer"};
		var flashvars	= {};

		swfobject.embedSWF("http://www.youtube.com/v/8UVNT4wvIGY?version=3&enablejsapi=1&playerapiid=ytplayer", 
			"ytapiplayer", "470", "200", "9", null, flashvars, params, atts);
	}

	function onYouTubePlayerReady(playerId) {
		console.log("fjlj")
		ytplayer = document.getElementById(playerId);
		ytplayer.addEventListener("onError", "onPlayerError");
		ytplayer.addEventListener("onStateChange", "onytplayerStateChange");
	}

	function onPlayerError(errorCode) {
		alert("An error occured of type:" + errorCode);
	}

	function onytplayerStateChange(newState) {
		alert("Player's new state: " + newState);
	}

	return {
		init:(function() {
			_init();
		})()
	};
});