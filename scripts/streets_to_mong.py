from BeautifulSoup import BeautifulSoup as BS
import pymongo
import argparse
import datetime

parser = argparse.ArgumentParser(description='Mongo Census INIT')
parser.add_argument('-c', action='store', dest='mongo_conn', help='Mongo DB Connection', default="")
parser.add_argument('-p', action='store', dest='mongo_port', help='Mongo DB Port', default="27017")
parser.add_argument('-db', action='store', dest='mongo_dbname', help='Mongo DB Name', default="")
parser.add_argument('-path', action='store', dest='path', help='File path for HTM Street files', default="")

opts = parser.parse_args()

connection = pymongo.Connection(opts.mongo_conn, int(opts.mongo_port))                                                                                              
db = connection[opts.mongo_dbname]

b_dict = {
	'%s/bkny.htm' % opts.path: 'brooklyn',
	'%s/bxny.htm' % opts.path: 'bronx',
	'%s/many.htm' % opts.path: 'manhattan',
	'%s/quny.htm' % opts.path: 'queens',
	'%s/riny.htm' % opts.path: {'staten' : 'richmond'} 
}


def init_json(file, borough):
	data = open(file).read()
	soup = BS(data)
	options = soup.findAll('option')
	streets = {}

	fullcity_id = options[0]['value']
	for option in options[1:]:
		values = option['value'].split(',')
		streets[option.contents[0]] =  values

	if isinstance(borough, str):
		ED_city = borough.title()
	else:
		_borough = borough.keys()[0]
		ED_city = borough[_borough].title()
		borough = _borough

	db.streets.ensure_index("borough")
	init_json = {
		"created_at": datetime.datetime.utcnow().isoformat(),
		"borough": borough,
		"streets": streets,
		"fullcity": ED_city,
		"state": "NY",
		"fullcity_id": fullcity_id
	}

	db.streets.save(init_json)

if __name__ == "__main__":
	db.streets.remove()
	for k, v in b_dict.iteritems():
		init_json(k, v)