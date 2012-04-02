define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;
	var callback_url =  window.location;

	function _init() {
		fbSetup();
		twitterSetup();
		googleSetup();
	}

	function fbSetup() {
		$('#fb-submit').off('click').on('click', function(e) {
			e.preventDefault();

			howwedo('facebook');

			e.stopPropagation(); 
			return false;
		});

	}

	function twitterSetup() {
		$('#tw-submit').off('click').on('click', function(e) {
			e.preventDefault();

			howwedo('twitter');

			e.stopPropagation(); 
			return false;
		});

	}

	function googleSetup() {
		$('#g-submit').off('click').on('click', function(e) {
			e.preventDefault();

			howwedo('google_oauth2');

			e.stopPropagation(); 
			return false;
		});

	}

	function popupCenter(url, width, height, name) {
		var left = (screen.width/2)-(width/2);
		var top = (screen.height/2)-(height/2);
		return window.open(url, name, "menubar=no,toolbar=no,status=no,scrollbars=no,resizable=no,width="+width+",height="+height+",toolbar=no,left="+left+",top="+top);
	}

	function howwedo(service) {
		if (environment.hasOwnProperty('login') && environment.login == false) {
			$('#conn_social').modal('hide');

			auth_url = encodeURI('/auth/' + service + '?display=popup');				
			auth_window = popupCenter(auth_url, 600, 400, "authPopup");

			var timer = setInterval(function() {   
			    if(auth_window.closed) {
			    	clearInterval(timer);   
					checkSession(); 
			    }  
			}, 200);
		}
	}

	function updateStory(_conn, author, session) {
		var content = $('#frm-content').val();
		$.post(urlpath + '/api/stories.json?callback=?', {connection: _conn, content: content, token: getUrlVar('token'), author: author, session: session}, function(data) {
			if (data.hasOwnProperty('content')) {
				var time_dist = 'just now';
				$('#frm-content').val('');
	
				if ($('.annotation').length > 0) {
					prependStory(data.content, data.author, time_dist);
				}
				else {
					appendStory(data.content, data.author, time_dist);
				}
			}
		}, "json")
		.error(function() { 
			 appendError();
		});
	}


	function checkSession() {
		$.getJSON(urlpath + '/api/session.json?callback=?', function(data) {
			if (typeof data !== 'undefined' && data.hasOwnProperty('sess') && data.sess !== false) {
				environment.login = true;
				$('#conn_social').remove();
				$('#submit').addClass('post');
				$('#submit').html('Post');

				//anon stuff ehre and check
				$('#submit.post').off('click').on('click', function() {
					var checked = $("input#frm-anonymous-check:checked");
					if (checked.length == 1) {
						var author = 'Anonymous'
					}
					else {
						var author = data.user;
					}
					
					updateStory(data.conn, author, data.sess);
				});
			}
			else {
				environment.login = false;
			}
		});
	}

	function appendStory(content, author, time_dist) {
		$("<div class='annotation'><p class='content'>" + content + "</p><p class='author'>Posted by <strong>" + author + "</strong> " + time_dist + "</p></div>").appendTo('.texts')
	}

	function appendError(false_auth) {
		if (typeof false_auth !== 'undefined') {
			$("<div class='post_error'><p> Not Authenticated. </p>").prependTo('#frm-annotate .buttons')
			setTimeout(function() {
				$('.post_error').fadeOut().empty();
			}, 5000);
		}
		else {
			$("<div class='post_error'><p> Error in Attempt to Post Story. Try Again Later </p>").prependTo('#frm-annotate .buttons')
			setTimeout(function() {
				$('.post_error').fadeOut().empty();
			}, 30000)
		}
	}

	function prependStory(content, author, time_dist) {
		$("<div class='annotation'><p class='content'>" + content + "</p><p class='author'>Posted by <strong>" + author + "</strong> " + time_dist + "</p></div>").prependTo('div.annotation:first')
	}

	return {
		init: _init,
		appendStory: appendStory,
		checkSession: checkSession
	};

});