from boto.s3.connection import S3Connection as S3
from boto.s3.key import Key
import argparse

parser = argparse.ArgumentParser(description='Backups to s3')
parser.add_argument('-aws_key', action='store', dest='aws_key', help='AWS S3 Key')
parser.add_argument('-aws_secret', action='store', dest='aws_secret', help='AWS S3 Secret')
parser.add_argument('-aws_bucket', action='store', dest='aws_bucket', help='AWS S3 Bucket')
parser.add_argument('-project', action='store', dest='project', help='Project Name')
parser.add_argument('-file', action='store', dest='filename', help='Backup File')

opts = parser.parse_args()

ACCESS_KEY = opts.aws_key
SECRET = opts.aws_secret
BUCKET_NAME = opts.aws_bucket
PROJECT_NAME = opts.project

FILENAME = opts.filename

#from https://gist.github.com/387235
def save_file_in_s3(filename):
    conn = S3(ACCESS_KEY, SECRET)
    bucket = conn.get_bucket(BUCKET_NAME)
    k = Key(bucket)
    k.key = "%s/%s" % (PROJECT_NAME, filename)
    k.set_contents_from_filename(filename, policy='public-read')

def get_file_from_s3(filename):
    conn = S3(ACCESS_KEY, SECRET)
    bucket = conn.get_bucket(BUCKET_NAME)
    k = Key(bucket)
    k.key = "%s/%s" % (PROJECT_NAME, filename)
    k.get_contents_to_filename(filename, policy='public-read')

def list_backup_in_s3():
    conn = S3(ACCESS_KEY, SECRET)
    bucket = conn.get_bucket(BUCKET_NAME)
    for i, key in enumerate(bucket.get_all_keys()):
        print "[%s] %s" % (i, key.name)

def delete_all_backups():
    #FIXME: validate filename exists
    conn = S3(ACCESS_KEY, SECRET)
    bucket = conn.get_bucket(BUCKET_NAME)
    for i, key in enumerate(bucket.get_all_keys()):
        print "deleting %s" % (key.name)
        key.delete()

if __name__ == '__main__':
    save_file_in_s3(FILENAME)
