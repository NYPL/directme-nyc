from BeautifulSoup import BeautifulSoup as BS
import json
import datetime
import collections
import requests

many = requests.get("http://stevemorse.org/census/1940cities/many.htm")
bkny = requests.get("http://stevemorse.org/census/1940cities/bkny.htm")
bxny = requests.get("http://stevemorse.org/census/1940cities/bxny.htm")
quny = requests.get("http://stevemorse.org/census/1940cities/quny.htm")
riny = requests.get("http://stevemorse.org/census/1940cities/riny.htm")


b_dict = {
	'brooklyn': bkny,
	'bronx': bxny,
	'manhattan': many,
	'queens': quny,
	'staten': riny
}

def cross_streets(soup, values, main_street):
	vals = [{option.contents[0]: option.get('value')} for option in soup.findAll('option') if 
		filter(set(values).__contains__, option.get('value').split(',')) and option.contents[0] is not main_street]
	return vals

def init_json(borough, _file):
	data = _file.text
	soup = BS(data)
	options = soup.findAll('option')
	streets = collections.OrderedDict()

	fullcity_id = options[0]['value']
	for option in options[1:]:
		values = option['value'].split(',')
		streets[option.contents[0].lower()] = {
			'cross': cross_streets(soup, values, option.contents[0]),
			'eds': values
		}

	if isinstance(borough, str):
		if borough == 'staten':
			ED_city = 'Richmond'
		else:
			ED_city = borough.title()

	init_json = {
		"created_at": datetime.datetime.utcnow().isoformat(),
		"borough": borough,
		"streets": streets,
		"fullcity": ED_city,
		"state": "NY",
		"fullcity_id": fullcity_id
	}

	streets =  json.dumps(init_json)

	f = open('public/%s.json' % borough,'w')
	print >> f, streets
	f.close()


if __name__ == "__main__":
	for k, v in b_dict.iteritems():
		init_json(k, v)
	print "done!"