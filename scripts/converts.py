import subprocess
from boto.s3.connection import S3Connection as S3
from boto.s3.key import Key
import os
import fnmatch
import argparse

#parser stuff
parser = argparse.ArgumentParser(description='Doc Viewer Conversions for Census/Directories Project')
parser.add_argument('-aws_key', action='store', dest='aws_key', help='AWS S3 Key')
parser.add_argument('-aws_secret', action='store', dest='aws_secret', help='AWS S3 Secret')
parser.add_argument('-aws_bucket', action='store', dest='aws_bucket', help='AWS S3 Bucket')
parser.add_argument('-input', action='store', dest='indir', help='Store the input folder of jp2s')
parser.add_argument('-output', action='store', dest='outdir', help='Store the output folder of converted images')
parser.add_argument('-in_ext', action='store', dest='in_ext', help='Convert from which exstention', default='jp2')
parser.add_argument('-out_ext', action='store', dest='out_ext', help='Convert to which exstention', default='jpg')
parser.add_argument('-large', action='store', dest='large', help='large image size', default='3000')
parser.add_argument('-normal', action='store', dest='normal', help='normal image size', default='1000')
parser.add_argument('-small', action='store', dest='small', help='small image size', default='180')

#special arg for census, borough
parser.add_argument('-borough', action='store', dest='borough', help='which borough for S3 key', default='manhattan')

opts = parser.parse_args()

#amazon setup
conn = S3(opts.aws_key, opts.aws_secret)
bucket = conn.get_bucket(opts.aws_bucket)

if opts.outdir is None:
	opts.outdir = opts.indir

def convert(filename, idx):
	subprocess.call('gm convert -size 1000x %s/%s -resize %sx %s/p%s--large.%s' % (opts.indir, filename, opts.large, opts.outdir, idx, opts.out_ext), shell=True)
	subprocess.call('gm convert -size 1000x %s/%s -resize %sx %s/p%s--normal.%s' % (opts.indir, filename, opts.normal, opts.outdir, idx, opts.out_ext), shell=True)
	subprocess.call('gm convert -size 180x %s/%s -resize %sx %s/p%s--small.%s' % (opts.indir, filename, opts.small, opts.outdir, idx, opts.out_ext), shell=True)

def loop_to_zon():
	index = 0
	print "going through conversion batch"
	for filename in fnmatch.filter(os.listdir(opts.indir), '*.%s' % (opts.in_ext)):
		index += 1
		convert(filename, index)
	for imagename in fnmatch.filter(os.listdir(opts.outdir), '*.%s' % opts.out_ext):
		k = Key(bucket)
		k.key = '%s/%s' % (opts.borough, imagename)
		k.set_metadata("Content-Type", 'image/jpeg')
		k.set_contents_from_filename('%s/%s' % (opts.outdir, imagename), policy='public-read')
		k.set_acl('public-read')

	#delete conversions once on amazon
	print "delete converted files... which are now on amazon"
	subprocess.call('rm %s/*.%s' % (opts.outdir, opts.out_ext), shell=True)


if __name__ == "__main__":
	loop_to_zon()
