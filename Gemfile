source :rubygems

# = All =
gem 'rake'
gem 'rack'
gem 'dalli'

gem 'thin'

#if mongo
gem 'bson_ext'
gem 'mongoid'

gem 'faraday'
gem 'faraday_middleware'
gem 'typhoeus'
gem 'json'

gem 'sinatra', :require => 'sinatra/base'                
gem 'sinatra-authentication'
gem 'sinatra-flash', :require => 'sinatra/flash'

#rack gems here	
gem 'rack-cache', :require => 'rack/cache'  

gem 'slim'
gem 'sass'

#id-y things
gem 'base32', :require => 'Base32'
gem 'uuidtools'

group :test do
      gem 'rack-test', :require => 'rack/test'
      gem 'webmock'
end

group :development do
      gem 'fl-rocco'
      gem 'jammit'
      gem 'foreman'
      gem 'rerun' #yesness => https://github.com/alexch/rerun
end

group :production do
end
