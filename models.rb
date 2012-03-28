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

class Resource
	include Mongoid::Document
	cache
	embedded_in :loaders

	field :page, :type => Hash
end

class Locations
	include Mongoid::Document
	include Mongoid::Timestamps

	index :token

	field :token, :type => String
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

	validates_presence_of :token
	validates_presence_of :street
	validates_presence_of :borough
	validates_presence_of :address
	validates_presence_of :main_string
	validates_presence_of :cutout
	validates_presence_of :coordinates
	validates_presence_of :name, :message => 'suck it'
end

class Stories
	include Mongoid::Document
	include Mongoid::Timestamps

	index :result_token

	validates_presence_of :result_token
	validates_presence_of :location
	validates_presence_of :content
	validates_presence_of :page_idx

	field :result_token, :type => String
	field :content, :type => String
	field :connection, :type => String
	field :location, :type => Hash
	field :page_idx, :type => String
end

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


