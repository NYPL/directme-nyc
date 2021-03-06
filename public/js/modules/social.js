
function social() {

	var urlpath = window.location.protocol + "//" + window.location.host;
	var callback_url =  window.location;

	//init method for module
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
		});

	}

	function twitterSetup() {
		$('#tw-submit').off('click').on('click', function(e) {
			e.preventDefault();

			howwedo('twitter');

			e.stopPropagation(); 
		});

	}

	function googleSetup() {
		$('#g-submit').off('click').on('click', function(e) {
			e.preventDefault();

			howwedo('google_oauth2');

			e.stopPropagation(); 
		});

	}

	function logout() {
		//$('a.logout').prop('href', callback_url);
		$('a.logout').off('click').on('click', function(e) {
			e.preventDefault();
			$.post(urlpath + '/api/session.json?callback=?', {}, function(data) {
			}, "json");

			setTimeout(function() {
				window.location.reload(callback_url);
			}, 100);
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
			    	var stopback = true;   
					checkSession(stopback); 
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
				$('#submit').addClass('disabled');

				if ($('.annotation').length > 0) {
					prependStory('.annotation', data.content, data.author, time_dist);
				}
				else {
					appendStory('.annotation', data.content, data.author, time_dist);
				}
			}
		}, "json")
		.error(function() { 
			 appendError();
		});
	}


	function checkSession(stopback) {
		$.getJSON(urlpath + '/api/session.json?callback=?', function(data) {
			if (typeof data !== 'undefined' && data.hasOwnProperty('sess') && data.sess !== false) {
				environment.login = true;

				$.when($('a.logout').show()).done(function() {
					logout();
				});

				$('#conn_social').remove();
				$('#submit').html('Post');
				$('div.logout').show();
				$('.frm-connection').html(data.conn[0].toUpperCase() + data.conn.substring(1));

				$('#frm-content').on('keyup', function() {
					$('#submit').removeClass('disabled');			
				});

				$('#submit.post').off('click').on('click', function() {
					var content = $('#frm-content').val();

					if (!content) {
						return false;
					}

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

			else if (typeof stopback !== 'undefined') {
				environment.login = false;
				var false_auth = true
				appendError(false_auth);
			}

			else {
				environment.login = false;
			}
		});
	}

	function appendStory(css, content, author, time_dist) {
		$(prepareStoryHTML(css, content, author, time_dist)).appendTo('.texts')
	}

	function prependStory(css, content, author, time_dist) {
		$(prepareStoryHTML(css, content, author, time_dist)).prependTo('div.annotation:first')
	}


	function appendError(false_auth, false_logout) {
		if (typeof false_auth !== 'undefined') {
			$("<div class='post_error'><p>Unable to Log You In.</p>").prependTo('#frm-annotate .buttons')
			setTimeout(function() {
				$('.post_error').fadeOut().empty();
			}, 5000);
		}

		else if (typeof false_logout !== 'undefined') {
			$("<div class='post_error'><p>Unable to Log You Out</p>").prependTo('#frm-annotate .buttons')
			setTimeout(function() {
				$('.post_error').fadeOut().empty();
			}, 5000);
		}

		else {
			$("<div class='post_error'><p>Post Unsuccessful. Try Again Later.</p>").prependTo('#frm-annotate .buttons')
			setTimeout(function() {
				$('.post_error').fadeOut().empty();
			}, 30000)
		}
	}

	/** Return instantiated function **/
	return {
		init: _init,
		appendStory: appendStory,
		checkSession: checkSession
	}
}