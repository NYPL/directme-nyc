define(['jquery'], function($) {

	var callback_url =  window.location;


	function _init(content, time_ago) {
		fbSetup();
	}

	function fbSetup() {
		$('#fb-submit').on('click', function(e) {
			e.preventDefault();
			auth_url = encodeURI('/auth/facebook?display=popup&goto=' + callback_url);
			window.location.href = auth_url
		});

	}

	return {
		init: _init
	};

});