(function($) {

	var urlpath = window.location.protocol + "//" + window.location.host;
	var tickerDOM = $("marquee");
	var headlines = [];
	var currenthl = 0;
	var currentchar = 0;
	var t;
	var dataloaded = false;
	var islocalIP = false;

	//init method for module
	function _init() {
		getHeadlines();
	}

	//get headlines frm api call and call startTicker method
	function getHeadlines() {
		$.getJSON(urlpath + '/api/headlines.json?callback=?', function(data) {
			var i, l=data.length;

			if (l > 0) {
				for (i=0;i<l;++i) {
					headlines.push(
						{
							'pq_id': data[i].pq_id,
							'hdl': data[i].hdl,
							'nyt_url': data[i].ny_url
						}
					);
				}
				dataloaded = true;

				if (headlines.length>0) {
					startTicker();
				} else {
					showError();
				}
			}
			else {
				showError();
			}
		});
	}
	
	//ticker method for showcasing headlines in horz-scroll-like mode
	function startTicker() {
		// combine link/headline
		var i, l=headlines.length, hl;
		var tickercontent = "";
		headlines = _.shuffle(headlines);
		var islocalIP = environment.onSite == "true";
		for (i=0;i<l;++i) {
			hl = headlines[i];
			var url;
			if (islocalIP) {
				// proquest search url
				url = "http://search.proquest.com/results/135C45E5A5F4B1EE9E0/1/$5bqueryType$3dbasic:OS$3b+sortType$3dDateAsc$3b+searchTerms$3d$5b$3cAND$7ccitationBodyTags:"+hl.pq_id+"$3e$5d$3b+searchParameters$3d$7bNAVIGATORS$3dsourcetypenav,pubtitlenav,objecttypenav,languagenav$28filter$3d200$2f0$2f*$29,decadenav$28filter$3d110$2f0$2f*,sort$3dname$2fascending$29,yearnav$28filter$3d1100$2f0$2f*,sort$3dname$2fascending$29,yearmonthnav$28filter$3d120$2f0$2f*,sort$3dname$2fascending$29,monthnav$28sort$3dname$2fascending$29,daynav$28sort$3dname$2fascending$29,+RS$3dOP,+jstorMuseCollections$3dMUSEALL,+chunkSize$3d20,+instance$3dprod.academic,+ftblock$3d194000+7+194007,+removeDuplicates$3dtrue$7d$3b+metaData$3d$7bUsageSearchMode$3dQuickSearch,+dbselections$3dallAvailable$7d$5d?accountid=35635";
			} else {
				// NYTimes.com url
				url = hl.nyt_url;
			}
			tickercontent += ' <a href="' +  url + '" title="Times Headline" target="_blank">' + hl.hdl + '</a> &middot; &middot; &middot;';
		}
		tickerDOM.empty();
		tickerDOM.append(tickercontent);
		if (typeof tickerDOM !== 'undefined') {
			tickerDOM.marquee('pointer').mouseover(function () {
	            $(this).trigger('stop');
	        }).mouseout(function () {
	            $(this).trigger('start');
	        });
	    }

	    $('#nytimes a').click(function() {
	    	var classy = toLocation($(this).prop('href')).hostname;
	    	analytics.recordOutboundLink($(this).prop('href'), 'headlines', 'click', classy);
	    });
	}

	function toLocation(url) {
	    var a = document.createElement('a');
	    a.href = url;
	    return a;
	};

	function showError() {
		tickerDOM.empty();
		tickerDOM.append('... No headlines for this day ... No headlines for this day ... No headlines for this day ... No headlines for this day ... No headlines for this day ...');
	}

	/** Return instantiated function */
	return {
		init: _init()
	};
}(jQuery));
