#encodings working in rubinius with ruby 1.9, still being developed though
Encoding.default_internal = 'UTF-8'
# ==========================
# = Requirement - *bundler =
# ==========================
require 'rubygems'
require 'bundler/setup'

Bundler.require

%w(base64 digest/md5 timeout date logger yaml optparse time).each do |requirement|
	require requirement
end

# further requires (models, helpers, extensions etc)
Dir.glob('./*.rb') do |file|
	require file.gsub(/\.rb/, '')
end

class Application < Sinatra::Base
	# ==============
	# = Middleware =
	# ==============
	use Rack::ShowExceptions
	use Rack::Mongoid::Middleware::IdentityMap
	use Rack::Deflater
	use Rack::Session::Cookie, :secret => ENV['COOKIESECRET'], :expire_after => 14400, :key => 'directmenyc'
	use Rack::Csrf, :raise => true

	use OmniAuth::Builder do
		provider :facebook, ENV['FBKEY'], ENV['FBSECRET']
		provider :twitter, ENV['TWKEY'], ENV['TWSECRET']
		provider :google_oauth2, ENV['GOOGLE_KEY'], ENV['GOOGLE_SECRET'], {access_type: 'online', approval_prompt: ''} 
	end

	#set this when ready
	#===========================================================
	#$memcache = Dalli::Client.new
	#set :cache_var, ENV['MEMCACHE_SERVERS']|| "localhost:11211"
	#use Rack::Cache,
	#	:verbose => true,
	#	:metastore => "memcached://#{cache_var}",
	#	:entitystore => "memcached://#{cache_var}"
	#===========================================================

	# =========================================
	# = Registrations and global Helpers here =
	# =========================================
	register Sinatra::Flash
	register Sinatra::Loader
	register SinatraMore::MarkupPlugin
	configure do
		load_helpers MyHelpers
	end

	# ======================
	# = Sinatra - Settings =
	# ======================
	#server settings
	disable :run
	set :server, %w[thin mongrel webrick]

	root_dir = File.dirname(__FILE__)

	#options
	set :raise_errors,    false
  	set :show_exceptions, false
  	set :db_config, ENV["db_config"] || 'mongo'
  	set :protection, :except => [:remote_token, :frame_options] 

  	#db/offload settings
  	if settings.db_config.eql?('mongo')
	  	Mongoid.load!("config/mongoid.yml")
  	end

	#directory settings
	set :static_cache_control, [:public, :max_age => 1]
	set :root, root_dir
	set :public_folder, 'public'
	set :views, 'views'

	#slim settings
	set :slim, :pretty => true
	set :slim, :sections => false

	#app based configurations
	configure :development do
		puts "fun_times_had_by_all"
		if defined?(Mongoid)
			Mongoid.logger = Logger.new(STDOUT)
		end
	end

	configure :test do
	end

	configure :production do
		require 'newrelic_rpm'
		if defined?(Mongoid)
			Mongoid.logger=Logger.new('/dev/null')
		end
	end
end

require File.join('.', 'app.rb')
