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

class UserSessions
	include Mongoid::Document
	include Mongoid::Timestamps

	#store_in :usersessions, capped:true, size:100000

	index :session
	index :connection

	field :session, :type => String, :required => true
	field :user_name, :type => String
	field :user_token, :type => String
	field :connection, :type => Hash

	validates :session, :presence => true
	validates :user_token, :presence => true
	validates :connection, :presence => true

end

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


