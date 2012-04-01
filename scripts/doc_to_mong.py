import pymongo
import argparse
import datetime

# ~ mongohq => mongo_conn is os.environ.get("MONGOHQ_URL")
# ~ mongohq => mongo_dbname is app****
# ~ mongohq => mongo_port is 10015

parser = argparse.ArgumentParser(description='Mongo Census INIT')
parser.add_argument('-c', action='store', dest='mongo_conn', help='Mongo DB Connection', default="")
parser.add_argument('-p', action='store', dest='mongo_port', help='Mongo DB Port', default="27017")
parser.add_argument('-db', action='store', dest='mongo_dbname', help='Mongo DB Name', default="")

opts = parser.parse_args()

connection = pymongo.Connection(opts.mongo_conn, int(opts.mongo_port))                                                                                              
db = connection[opts.mongo_dbname]

borough_pages = {
	'manhattan': 1136, 
	'brooklyn': 716, 
	'queens': 546, 
	'bronx': 372, 
	'staten': 90
}

def init_json(borough, num_pages):

	pdf_sizes = {
		'manhattan': 379, 
		'brooklyn': 199, 
		'queens': 156, 
		'bronx': 100, 
		'staten': 25
	}

	elem_id = None
	_check = db.loaders.find_one({'borough': borough})
	if _check is None:
		_id = borough
	else:
		db.loaders.ensure_index("borough")
		_id = _check['borough']
		elem_id = _check['_id']

	init_json = {
		"canonical_url": "http://1940census.nypl.org.s3.amazonaws.com/%s/1940-%s-telephone-directory.html" % (borough, borough),
		"created_at": datetime.datetime.utcnow().isoformat(),
		"description": "",
		"borough": _id,
		"pages": num_pages,
		"resources": {
			"page": {
				"image": "http://1940census.nypl.org.s3.amazonaws.com/%s/p{page}--{size}.jpg" % (borough)
			}
		}, 
		"pdf": "http://1940census.nypl.org.s3.amazonaws.com/%s/1940-%s-telephone-directory.pdf" % (borough, borough),
		"pdf_mb": pdf_sizes[borough],
		"thumbnail": "http://1940census.nypl.org.s3.amazonaws.com/%s/p1--small.jpg" % (borough),
		"title": "1940-%s-telephone-directory" % (borough)
	}

	if elem_id:
		db.loaders.update({'_id': elem_id}, init_json)
	else: 
		db.loaders.save(init_json)

if __name__ == "__main__":
	for borough, pages in borough_pages.iteritems():
		init_json(borough, pages)


