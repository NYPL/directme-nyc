define(['jquery'], function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;
	var tickerDOM = $("#marquee");
	var headlines = [];
	var currenthl = 0;
	var currentchar = 0;
	var t;
	var dataloaded = false;

	function _init() {
		//defined module inits
		getHeadlines();
	}

	function getHeadlines() {
		$.getJSON(urlpath + '/headlines.json?callback=?', function(data) {
			var i, l=data.length;
			for (i=0;i<l;++i) {
				headlines.push(
					{
						'pq_id': data[i].pq_id,
						'hdl': data[i].hdl,
						//'lead': data[i].lead,
						'nyt_url': data[i].ny_url
					}
				);
			}
			dataloaded = true;
			log(headlines);
			if (headlines.length>0) {
				startTicker();
			} else {
				showError();
			}
		});
	}
	
	function startTicker() {
		// combine link/headline
		var i, l=headlines.length, hl;
		var tickercontent = "";
		for (i=0;i<l;++i) {
			hl = headlines[i];
			// only NYTimes urls for now
			tickercontent += ' <a href="' +  hl.nyt_url + '" target="blank" title="open link in new window">' + hl.hdl + '</a> &middot; &middot; &middot;';
		}
		tickerDOM.empty();
		tickerDOM.append(tickercontent);
		log(tickercontent);
		log(tickerDOM);
		tickerDOM.marquee()
		tickerDOM.marquee('pointer').mouseover(function () {
            $(this).trigger('stop');
        }).mouseout(function () {
            $(this).trigger('start');
        });
	}

	function showError() {
		tickerDOM.empty();
		tickerDOM.append('... No headlines for this day ... No headlines for this day ... No headlines for this day ... No headlines for this day ... No headlines for this day ...');
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
});