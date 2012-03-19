class Loaders
	include Mongoid::Document
	cache
	index :borough, unique: true

	field :canonical_url, :type => String
	field :created_at, :type => String
	field :description, :type => String
	field :pages, :type => Integer
	field :pdf, :type => String
	field :thumbnail, :type => String
	field :title, :type => String
	field :borough, :type => String

	embeds_one :resources
	has_many :stories
end

class Resource
	include Mongoid::Document
	cache
	embedded_in :loaders

	field :page, :type => Hash
end

class Streets
	include Mongoid::Document

	cache
	index :borough, unique: true

	field :fullcity, :type => String
	field :state, :type => String
	field :borough, :type => String
	field :created_at, :type => String
	field :streets, :type => Array

end

class Locations
	include Mongoid::Document
	include Mongoid::Timestamps

	index :token, unique: true

	field :token, :type => String
	field :number, :type => String
	field :street, :type => String
	field :borough, :type => String
	field :name, :type => String
	field :fullcity, :type => String
	field :state, :type => String
end

class Stories
	include Mongoid::Document
	include Mongoid::Timestamps

	belongs_to :loaders

	field :result_token, :type => String
	field :story, :type => String
	field :connection, :type => String
	#add connection image/id
end

class Headlines
	include Mongoid::Document
	include Mongoid::Timestamps

	cache

	field :hdl, :type => String
	field :lead, :type => String
	field :ny_url, :type => String
	field :pq_id, :type => String
end


