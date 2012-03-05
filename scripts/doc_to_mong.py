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


init_json = {
	"annotations": [],
	"canonical_url": "",
	"contributor": "",
	"contributor_organization": "",
	"created_at": datetime.datetime.utcnow().isoformat(),
	"description": "",
	"id": "",
	"pages": 0,
	"resources": {
		"page": {
			"image": "https://s3.amazonaws.com/s3.documentcloud.org/documents/19864/pages/goldman-sachs-internal-emails-p{page}-{size}.gif", 
			"text": "https://www.documentcloud.org/documents/19864/pages/goldman-sachs-internal-emails-p{page}.txt"
		}
	}, 
	"pdf": "",
	"published_url": "",
	"search": "",
	"thumbnail": "",
	"sections": [],
	"source": None,
	"title": ""
}

print json.dumps(init_json)


