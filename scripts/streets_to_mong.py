from BeautifulSoup import BeautifulSoup as BS
import pymongo
import argparse
import datetime

parser = argparse.ArgumentParser(description='Mongo Census INIT')
parser.add_argument('-c', action='store', dest='mongo_conn', help='Mongo DB Connection', default="")
parser.add_argument('-p', action='store', dest='mongo_port', help='Mongo DB Port', default="")
parser.add_argument('-db', action='store', dest='mongo_dbname', help='Mongo DB Name', default="")
parser.add_argument('-path', action='store', dest='path', help='File path for HTM Street files', default="")

opts = parser.parse_args()

connection = pymongo.Connection(opts.mongo_conn, int(opts.mongo_port))                                                                                              
db = connection[opts.mongo_dbname]

b_dict = {
	'%s/brooklyn' % opts.path: 'brooklyn',
	'%s/bxny.html' % opts.path: 'bronx',
	'%s/many.htm' % opts.path: 'manhattan',
	'%s/quny.htm' % opts.path: 'queens',
	'%s/riny.htm' % opts.path: {'staten' : 'richmond'} 
}


def init_json(file, borough):
	data = open(file).read()
	soup = BS(data)
	options = soup.findAll('option')
	streets = []

	for option in options[1:]:
		streets.append(option.contents[0])

	if isinstance(borough, str):
		ED_city = borough.title()
	else:
		borough = borough.keys()[0]
		ED_city = borough[borough].title()

	elem_id = None
	_check = db.streets.find_one({'borough': borough})
	if _check is None:
		_id = borough
	else:
		db.streets.ensure_index("borough")
		_id = _check['borough']
		elem_id = _check['_id']

	init_json = {
		"created_at": datetime.datetime.utcnow().isoformat(),
		"borough": _id,
		"streets": streets,
		"fullcity": ED_city,
		"state": "NY"
	}

	if elem_id:
		db.streets.update({'_id': elem_id}, init_json)
	else: 
		db.streets.save(init_json)

if __name__ == "__main__":
	for k, v in b_dict.iteritems():
		init_json(k, v)