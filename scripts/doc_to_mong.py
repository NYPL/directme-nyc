import pymongo
import argparse
import datetime
import base64
import hashlib
import uuid

# ~ mongohq => mongo_conn is os.environ.get("MONGOHQ_URL")
# ~ mongohq => mongo_dbname is app****
# ~ mongohq => mongo_port is 10015

parser = argparse.ArgumentParser(description='Mongo Census INIT')
parser.add_argument('-c', action='store', dest='mongo_conn', help='Mongo DB Connection', default="")
parser.add_argument('-p', action='store', dest='mongo_port', help='Mongo DB Port', default="")
parser.add_argument('-db', action='store', dest='mongo_dbname', help='Mongo DB Name', default="")

opts = parser.parse_args()

connection = pymongo.Connection(opts.mongo_conn, int(opts.mongo_port))                                                                                              
db = connection[opts.mongo_dbname]

def gen_random_id():
	k = base64.b32encode(hashlib.md5(uuid.uuid1().bytes).digest())
	return k.lower().rstrip('=')

borough_pages = {
	'manhattan': 0, 
	'brooklyn': 0, 
	'queens': 0, 
	'bronx': 0, 
	'staten': 0,
	'testset': 281
}

def init_json(borough, num_pages):
	_check = db.loaders.find_one({'DV.borough': borough})
	if _check is None:
		_id = gen_random_id()
	else:
		db.loaders.ensure_index("DV.borough")
		_id = _check['_id']

	init_json = {
		"annotations": [],
		"canonical_url": "http://1940census.nypl.org.s3.amazonaws.com/%s/1940-%s-telephone-directory.html" % (borough, borough),
		"created_at": datetime.datetime.utcnow().isoformat(),
		"description": "",
		"id": _id,
		"pages": num_pages,
		"resources": {
			"page": {
				"image": "http://1940census.nypl.org.s3.amazonaws.com/%s/p{page}--{size}.jpg" % (borough)
			}
		}, 
		"pdf": "http://1940census.nypl.org.s3.amazonaws.com/%s/1940-%s-telephone-directory.pdf" % (borough, borough),
		"thumbnail": "http://1940census.nypl.org.s3.amazonaws.com/%s/p1--small.jpg" % (borough),
		"title": "1940-%s-telephone-directory" % (borough),
		"borough": borough,
	}

	db.loaders.update({'_id':init_json['id']}, {'$set' : {'DV':init_json}}, upsert=True)

if __name__ == "__main__":
	for borough, pages in borough_pages.iteritems():
		init_json(borough, pages)


