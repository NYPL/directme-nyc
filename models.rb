class Loaders
	include Mongoid::Document

	identity :type => String

	embeds_one :dv
end

class DV
	include Mongoid::Document
	cache
	embedded_in :loaders

	field :canonical_url, :type => String
	field :created_at, :type => DateTime
	field :description, :type => String
	field :id, :type => String
	field :pages, :type => Integer
	field :pdf, :type => String
	field :thumbnail, :type => String
	field :title, :type => String

	embeds_one :resources
	has_many :annotations
end

class Resources
	include Mongoid::Document
	cache
	embedded_in :dv

	field :page, :type => Hash
	attr_protected :page
end

class Locations
	include Mongoid::Document
	include Mongoid::Timestamps

	identity :type => String

	field :address, :type => String
	field :borough, :type => String
end

class Annotations
	include Mongoid::Document
	include Mongoid::Timestamps

	identity :type => String

	belongs_to :dv
end

