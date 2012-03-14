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
	has_many :annotations
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
	index :borough

	field :fullcity, :type => String
	field :state, :type => String
	field :borough, :type => String
	field :created_at, :type => String

end

class Locations
	include Mongoid::Document
	include Mongoid::Timestamps

	field :number, :type => String
	field :street, :type => String
	field :borough, :type => String
end

class Annotations
	include Mongoid::Document
	include Mongoid::Timestamps

	belongs_to :loaders
end

