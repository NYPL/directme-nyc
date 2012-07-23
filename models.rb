#------------------------------------NOTES--------------------------------------
# The Models use Mongoid v2, not v3 -> http://two.mongoid.org/, which is built
# on ActiveRecord
# This app would need some modifications made for Mongoid v3. Don't upgrade unless you care
#-------------------------------------------------------------------------------

# Desc: Loader for each Borough, which DocumentViewer Looks for in order to get Assets from S3
#
# Embeds an object called Resource (Each loader contains 1 resource)
#
# Example Mongo Object
#
# {
#	{
#		"_id" : ObjectId("4f6bdd25af9ffb44c3000000"),
#		"borough" : "bronx",
#		"canonical_url" : "http://directme-assets.nypl.org/bronx/1940-bronx-telephone-directory.html",
#		"created_at" : "2012-04-01T18:31:41.675590",
#		"description" : "",
#		"pages" : 372,
#		"pdf" : "http://directme-assets.nypl.org/bronx/1940-bronx-telephone-directory.pdf",
#		"pdf_mb" : 100,
#		"resources" : {
#			"page" : {
#				"image" : "http://directme-assets.nypl.org/bronx/p{page}--{size}.jpg"
#			}
#		},
#		"thumbnail" : "http://directme-assets.nypl.org/bronx/p1--small.jpg",
#		"title" : "1940-bronx-telephone-directory"
#	}	
# }
# Example Call within App
#
# json = Loaders.where(:borough => params['borough']).first().to_json on GET /api/dvs/{borough}.json
class Loaders
	include Mongoid::Document
	cache
	index :borough

	field :canonical_url, :type => String
	field :created_at, :type => String
	field :description, :type => String
	field :pages, :type => Integer
	field :pdf, :type => String
	field :thumbnail, :type => String
	field :title, :type => String
	field :borough, :type => String

	embeds_one :resources
end

# Desc: Resource for each Borough, within a Loader, matching the S3 url for the image
#
# Embedded in Loaders (each loader has a resource)
#
# Example Mongo Object
#	"resources" : {
#		"page" : {
#			"image" : "http://directme-assets.nypl.org/bronx/p{page}--{size}.jpg"
#		}
#	}
class Resource
	include Mongoid::Document
	cache
	embedded_in :loaders

	field :page, :type => Hash
end

# Desc: Locations are Addresses searched by users
#
# Example Mongo Object
#
# {
#	"_id" : ObjectId("4f799f20a688e40001000001"),
#	"name" : "Paul Davis",
#	"number" : "156",
#	"street" : "beach 134th",
#	"borough" : "queens",
#	"state" : "NY",
#	"fullcity" : "Queens",
#	"cutout" : {
#		"x" : "0",
#		"y" : "-842",
#		"href" : "http://1940census.nypl.org.s3.amazonaws.com/queens/p115--large.jpg",
#		"page_idx" : "115"
#	},
#	"noSearch" : "false",
#	"token" : "p3uyguwjccqemr6wy3tbcfucsm",
#	"url" : "http://directme.nypl.org/results?token=p3uyguwjccqemr6wy3tbcfucsm",
#	"address" : "156 Beach 134th, Queens, NY",
#	"main_string" : "Paul Davis, 156 Beach 134th, Queens, NY",
#	"coordinates" : {
#		"lat" : 40.5731837,
#		"lng" : -73.8513372
#	},
#	"updated_at" : ISODate("2012-04-02T12:44:16Z"),
#	"created_at" : ISODate("2012-04-02T12:44:16Z")
# }
# Example Call within App
#
# obj = Locations.where(:token => params['token']).first() on GET /results
class Locations
	include Mongoid::Document
	include Mongoid::Timestamps

	index :token

	field :token, :type => String, :required => true
	field :number, :type => String
	field :street, :type => String
	field :borough, :type => String
	field :name, :type => String
	field :fullcity, :type => String
	field :state, :type => String
	field :coordinates, :type => Hash
	field :address, :type => String
	field :main_string, :type => String
	field :cutout, :type => Hash
	field :url, :type => String

	validates :token, :presence => true, :uniqueness => true
	validates :coordinates, :presence => true
	validates :street, :presence => true
	validates :main_string, :presence => true	
end

# Desc: UserSessions stored... stored in a Mongo capped collection => http://www.mongodb.org/display/DOCS/Capped+Collections
#
# Example Mongo Object
#
# {
# 	"_id" : ObjectId("4f79a300912c670001000001"),
#	"session" : "827b8e25a594b897b664e9e2647adf44766fe386542bed196a23c693e6402bab",
#	"user_name" : "David Riordan",
#	"user_token" : "AAACzjdTnYigBAMjYGLF3jpzF0n8l1u1BYmOWou5X5RP1eDNuI9Brh27Y3I6KSQI61IA7NZByL4NmsCMxlPjmDbmHcnqYZD",
#	"connection" : "facebook",
#	"updated_at" : ISODate("2012-04-02T13:00:48Z"),
#	"created_at" : ISODate("2012-04-02T13:00:48Z")
# }
# Example Call within App
#
# obj = UserSessions.where(:session => session['session_id']).first() on GET /auth/{name}/callback
class UserSessions
	include Mongoid::Document
	include Mongoid::Timestamps

	store_in :user_sessions, capped:true, size:100000

	index :session

	field :session, :type => String, :required => true
	field :user_name, :type => String
	field :user_token, :type => String
	field :connection, :type => Hash
	field :sess, :type => Boolean

	validates :session, :presence => true
	validates :user_token, :presence => true
	validates :connection, :presence => true

end

# Desc: Stories refer to the text input entered on a results page
#
# Example Mongo Object
#
# {
# 	"_id" : ObjectId("4f79a304775e700001000001"),
#	"connection" : "facebook",
#	"content" : "Paul Davis was my great grandfather. He raised two children, Sue Davis, and Richard Davis. Richard Davis fought in World War II and did not return.",
#	"author" : "David Riordan",
#	"result_token" : "p3uyguwjccqemr6wy3tbcfucsm",
#	"updated_at" : ISODate("2012-04-02T13:00:52Z"),
#	"created_at" : ISODate("2012-04-02T13:00:52Z")	
# }
# Example Call within App
#
# story = Stories.safely.create(hash) on POST /api/stories.json
class Stories
	include Mongoid::Document
	include Mongoid::Timestamps

	index :result_token

	field :result_token, :type => String, :required => true
	field :content, :type => String
	field :connection, :type => String
	field :author, :type => String

	validates :result_token, :presence => true
	validates :content, :presence => true
	validates :connection, :presence => true
end

# Desc: NY Times Headlines, new set inserted every day
#
# Example Mongo Object
# {
#	"_id" : ObjectId("4f8654aa64a2420001000001"),
#	"hdl" : "INQUIRY INFORMED $233,000 WAS PAID FOR PRINTING BIDS; Burland Head Says Albany Rival Got Him to Submit High Figures to State POLITICAL LEADERS NAMED William Solomon of Tammany and E. J. O'Connell of Albany Mentioned as Getting Funds",
#	"lead" : "ALBANY, April 11--Testimony that a system of collusive bidding on State printing contracts was in existence from 1932 to 1939, and that under it the J. B. Lyon Company, largest company in the field, ...",
#	"date" : "April 12, 1940",
#	"ny_url" : "http://query.nytimes.com/gst/abstract.html?res=9D03E4D81F3CEE3ABC4A52DFB266838B659EDE",
#	"pq_id" : "98597361",
#	"updated_at" : ISODate("2012-04-12T04:06:02Z"),
#	"created_at" : ISODate("2012-04-12T04:06:02Z")
# }
# Example Call within App
# json = Headlines.all().to_json on GET /api/headlines.json
class Headlines
	include Mongoid::Document
	include Mongoid::Timestamps

	cache

	field :hdl, :type => String
	field :lead, :type => String
	field :ny_url, :type => String
	field :pq_id, :type => String
	field :date, :type => String
end


