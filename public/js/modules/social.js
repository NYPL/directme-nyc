define(['jquery'], function($) {

	function _init() {

	}

	function fbSetup() {
		(function(d) {
			var js, id = 'facebook-jssdk', ref = d.getElementsByTagName('script')[0];
			if (d.getElementById(id)) {return;}
			js = d.createElement('script'); js.id = id; js.async = true;
			js.src = "//connect.facebook.net/en_US/all.js";
			ref.parentNode.insertBefore(js, ref);
		}(document));

		window.fbAsyncInit = function() {
		FB.init({
			appId      : 'YOUR_APP_ID', // App ID
			status     : true, // check login status
			cookie     : true, // enable cookies to allow the server to access the session
			xfbml      : true  // parse XFBML
		});
	}

	function tweetSetup() {

	}

	function gplusSetup() {

	}

	function fbCallback() {
		log(response);
	}

	return {
		init: _init()
	};

});