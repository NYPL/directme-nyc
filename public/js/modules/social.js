define(['jquery'], function($) {

	var callback_url =  window.location;


	function _init() {
		fbSetup();
	}

	function fbSetup() {
		$('#fb-submit').on('click', function(e) {
			e.preventDefault();
			$('#conn_social').modal('hide');
			auth_url = encodeURI('/auth/facebook?display=popup&origin=' + callback_url);

			auth_window = popupCenter(auth_url, 600, 400, "authPopup");

			auth_window.unload(function(){
				updateStory();
			});

			e.stopPropagation(); 
			return false;
		});

	}

	function twitterSetup() {
		$('#tw-submit').on('click', function(e) {
			e.preventDefault();
			$('#conn_social').modal('hide');
			auth_url = encodeURI('/auth/twitter?display=popup&origin=' + callback_url);

			auth_window = popupCenter(auth_url, 600, 400, "authPopup");

			auth_window.unload(function(){
				updateStories();
			});

			e.stopPropagation(); 
			return false;
		});

	}

	function googleSetup() {
		$('#g-submit').on('click', function(e) {
			e.preventDefault();
			$('#conn_social').modal('hide');
			auth_url = encodeURI('/auth/google?display=popup&origin=' + callback_url);

			auth_window = popupCenter(auth_url, 600, 400, "authPopup");

			auth_window.unload(function(){
				updateStories();
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

	function updateStory() {
		
	}

	function prependStory(content, author, time_dist) {
		$("<div class='annotation'><p class='content'>" + content + "</p><p class='author'>Posted by <strong>" + author + "</strong> " + time_dist + "</p></div>").prependTo('div.annotation:first')
	}

	function checkSession() {

	}

	return {
		init: _init,
		checkSession: checkSession,
		updateStory: updateStory
	};

});