from BeautifulSoup import BeautifulSoup as BS
import json
import argparse
import datetime

parser = argparse.ArgumentParser(description='Mongo Census INIT')
parser.add_argument('-path', action='store', dest='path', help='File path for HTM Street files', default="")

opts = parser.parse_args()


b_dict = {
	'%s/bkny.htm' % opts.path: 'brooklyn',
	'%s/bxny.htm' % opts.path: 'bronx',
	'%s/many.htm' % opts.path: 'manhattan',
	'%s/quny.htm' % opts.path: 'queens',
	'%s/riny.htm' % opts.path: {'staten' : 'richmond'} 
}

def cross_streets(soup, values):
	vals = [{option.contents[0]: option.get('value')} for option in soup.findAll('option') if 
		filter(set(values).__contains__, option.get('value').split(','))]
	return vals

def init_json(file, borough):
	data = open(file).read()
	soup = BS(data)
	options = soup.findAll('option')
	streets = {}

	fullcity_id = options[0]['value']
	for option in options[1:]:
		values = option['value'].split(',')
		streets[option.contents[0].lower()] = {
			'cross': cross_streets(soup, values),
			'eds': values
		}

	if isinstance(borough, str):
		ED_city = borough.title()
	else:
		_borough = borough.keys()[0]
		ED_city = borough[_borough].title()
		borough = _borough

	init_json = {
		"created_at": datetime.datetime.utcnow().isoformat(),
		"borough": borough,
		"streets": streets,
		"fullcity": ED_city,
		"state": "NY",
		"fullcity_id": fullcity_id
	}

	streets =  json.dumps(init_json)

	f = open('../public/%s.json' % borough,'w')
	print >> f, streets


if __name__ == "__main__":
	for k, v in b_dict.iteritems():
		init_json(k, v)
