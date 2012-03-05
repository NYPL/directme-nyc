import pymongo
import argparse
import json
import datetime

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

boroughs = {
	'manhattan': 0, 
	'brooklyn': 0, 
	'queens': 0, 
	'bronx': 0, 
	'staten': 0,
	'testset': 281
}

def init_json(borough, num_pages):
	init_json = {
		"annotations": [],
		"canonical_url": "",
		"contributor": "",
		"contributor_organization": "",
		"created_at": datetime.datetime.utcnow().isoformat(),
		"description": "",
		"id": "1940-%s-telephone-directory" % (borough),
		"pages": num_pages,
		"resources": {
			"page": {
				"image": "http://1940census.nypl.org.s3.amazonaws.com/%s/p{page}-{size}.jpg" % (borough)
			}
		}, 
		"pdf": "",
		"thumbnail": "http://1940census.nypl.org.s3.amazonaws.com/%s/p1--small.jpg" % (borough),
		"sections": [],
		"source": None,
		"title": "1940-%s-telephone-directory" % (borough)
	}

if __name__ == "__main__":
	for borough, pages in boroughs.iteritems():
		init_json(borough, pages)


