define(['jquery'], function($) {

	var callback_url =  window.location;


	function _init(content, time_ago) {
		fbSetup();
	}

	function fbSetup() {
		$('#fb-submit').on('click', function(e) {
			e.preventDefault();
			auth_url = encodeURI('/auth/facebook?display=popup');

			auth_window = popupCenter(auth_url, 600, 400, "authPopup");

			auth_window.load(function() { 
				auth_window.unload(function(){
					updateStories();
				});
			});

			e.stopPropagation(); 
			return false;
		});

	}

	function popupCenter(url, width, height, name) {
		var left = (screen.width/2)-(width/2);
		var top = (screen.height/2)-(height/2);
		return $(window.open(url, name, "menubar=no,toolbar=no,status=no,scrollbars=no,resizable=no,width="+width+",height="+height+",toolbar=no,left="+left+",top="+top));
	}

	function updateStories() {
		log("fuck")
	}

	return {
		init: _init
	};

});