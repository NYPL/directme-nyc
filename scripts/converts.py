import subprocess
import boto
import cStringIO
import os
import fnmatch

from pgmagic import Image, Blob

"""k.set_metadata('Content-Type', mime)
k.set_contents_from_file(data, policy='public-read')
k.set_acl('public-read')"""


#amazon configs

#globals
indir = "/Users/zeeshanlakhani/Dropbox/zeeshan/nypl_labs/census/testset/testintest/"
outdir = "/Users/zeeshanlakhani/Dropbox/zeeshan/nypl_labs/census/testset/testintest/"

s3 = boto.connect_s3()
bucket = s3.lookup('')

def convert(filename):
	subprocess.call('gm convert -size 1000x %s%s -resize 3000x %slarge.jpg' % (indir, filename, outdir), shell=True)
	subprocess.call('gm convert -size 1000x %s%s -resize 1000x %snormal.jpg' % (indir, filename, outdir), shell=True)
	subprocess.call('gm convert -size 180x %s%s -resize 180x %ssmall.jpg' % (indir, filename, outdir), shell=True)

def loop_to_zon():
	for filename in fnmatch.filter(os.listdir(indir), '*.jp2'):
		convert(filename)


if __name__ == "__main__":
	loop_to_zon()
