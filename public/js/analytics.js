//thanks to http://paceyourself.net/2011/05/14/managing-client-side-javascript-with-requirejs/
//google analytics setup
var analytics = {
	track: function(accountId) {
		var _gaq = window._gaq = _gaq || [],
			ga = document.createElement('script'),
			s = document.getElementsByTagName('script')[0];

		_gaq.push(['_setAccount', accountId]);
		_gaq.push(['_trackPageview']);

		ga.type = 'text/javascript';
		ga.async = true;
		ga.src = ('https:' == document.location.protocol ?
			'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';

		s.parentNode.insertBefore(ga, s);
	},
	recordOutboundLink: function(link, category, _event, _href) {
		try {
			_gaq.push(['_trackEvent', category, _event, _href]);
			//setTimeout('document.location = "' + link + '"', 100)
		}
		catch(err){}
	}
};
