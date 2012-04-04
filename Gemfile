source :rubygems

# = All =
gem 'rake'
gem 'rack'
gem 'dalli'

gem 'thin'

#if mongo
gem 'bson_ext'
gem 'mongoid'

gem 'typhoeus'
gem 'json'

gem 'sinatra', :require => 'sinatra/base'                
gem 'sinatra-flash', :require => 'sinatra/flash'
gem 'sinatra_more', :require => 'sinatra_more/markup_plugin'
gem 'omniauth'
gem 'omniauth-facebook'
gem 'omniauth-twitter'
gem 'omniauth-google-oauth2'

#rack gems here	
gem 'rack-cache', :require => 'rack/cache'  
gem 'rack_csrf', :require => 'rack/csrf'

gem 'slim'
gem 'sass'

#id-y things
gem 'base32'
gem 'uuidtools'
gem 'agent_orange'

#geothings
gem 'geocoder'

#backups
gem "heroku-mongo-backup", :require => 'heroku_mongo_backup'


group :test do
	gem 'rack-test', :require => 'rack/test'
	gem 'webmock'
end

group :development do
	gem 'heroku'
	gem 'fl-rocco'
	gem 'jammit'
	gem 'foreman'
	gem 'rerun' #yesness => https://github.com/alexch/rerun
end

group :production do
	gem 'newrelic_rpm'
	gem 'airbrake'
end
