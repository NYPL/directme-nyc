define(['jquery'], function($) {

	function _init() {
		fbSetup();
	}

	function _status() {
		//fbStatus();
	}

	function fbSetup() {
		window.fbAsyncInit = function() {
			FB.init({
				appId      : '383762241655543',
				status     : true, 
				cookie     : true,
				xfbml      : true,
				oauth      : true,
			});
		}

		(function(d){
		var js, id = 'facebook-jssdk'; if (d.getElementById(id)) {return;}
		js = d.createElement('script'); js.id = id; js.async = true;
		js.src = "//connect.facebook.net/en_US/all.js";
		d.getElementsByTagName('head')[0].appendChild(js);
		}(document));

	}

	function fbStatus() {
		FB.Event.subscribe('auth.login', function(response) {

		});
	}

	function tweetSetup() {

	}

	function gplusSetup() {

	}

	return {
		init: _init,
		status: _status
	};

});