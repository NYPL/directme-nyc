import json
import argparse
import datetime
import csv

parser = argparse.ArgumentParser(description='Mongo Census INIT')
parser.add_argument('-path', action='store', dest='path', help='File path for HTM Street files', default="")

opts = parser.parse_args()


b_dict = {
	'%s/bronx.csv' % opts.path: 'bronx',
	'%s/staten.csv' % opts.path: 'staten' 
}

def init_json(file, borough):
	idxs = {}
	sections = {}
	data = open(file).read()
	count = 0;
	try:
		reader = csv.reader(data.split('\n'), dialect=csv.excel)
		reader.next()
		check_row = lambda s: s or None
		for row in reader:
			if len(row) >= 4:
				count += 1
				idxs[count] = {
					'idx1': check_row(row[1]),
					'idx2': check_row(row[2]),
				}
				section_check = check_row(row[3])
				if section_check:
					for letter in row[3].split(','):
						sections[letter] = count
			if len(row) < 4:
				print "bad juju"
	finally:
		print "done"

	init_json = {
		"created_at": datetime.datetime.utcnow().isoformat(),
		"borough": borough,
		"idxs": idxs,
		"sections": sections
	}

	sections = sorted(init_json['idxs'].items())
	sections =  json.dumps(init_json)

	f = open('../public/idx_%s.json' % borough,'w')
	print >> f, sections
	f.close()


if __name__ == "__main__":
	for k, v in b_dict.iteritems():
		init_json(k, v)
