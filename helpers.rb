# Public: sinatra module to tie Loader in with main modular application, enabling the load of all modules + mixins
module Sinatra
	#lifted from https://gist.github.com/1331854/c1946a64ea9b166216f8821271952ddfdf388163
	module Loader
		def load_helpers(namespace)
			namespace.constants.each do |m|
				mod = namespace::const_get(m)
				if mod.is_a?(Module)
	  				load_helpers(mod)
	  				helpers mod
				end
			end
		end
	end
end

#Public: Methods that tie into Faraday's http restful requests, simplifying the naming convention (at later date => add put), extended into the Faracon Module
module Methods
	def get(url)
		return Faraday.get url
	end

	def post(url, data)
		return Faraday.post url, data
	end
end

#Public: The Helpers that are loaded by the Sinatra Loader above
#All modules are executed by calling their set methods

#Examples
#
#log.info "information returns nil"
#log.warning "bad move zeeshan"

#Conn.get("https://api.twitter.com/1/statuses...")

#error_json(404, 'bad news bears').to_json
module MyHelpers
	module Logging
		extend self
		attr_reader :log
		def log
			@log = Logger.new(STDERR)
			@log = Logger.new(STDOUT)
			@log.level = Logger::DEBUG
			return @log
		end
	end

	module Faraconn
		extend self
		module Conn
			extend Methods
		end
	end

	module ErrorJson
		extend self
		attr_reader :error_json
		def error_json(status, errtxt)
			log.info status
			@error_json = {'error' => "#{errtxt}", 'status' => "#{status}"}
		end
	end

	module RandGen
		extend self
		def gen_random_id()
			@rand_id = Base64.encode64(Digest::MD5.digest(UUIDTools::UUID.random_create)).downcase!.split('=')[0]
		end
	end
end