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


#Public: The Helpers that are loaded by the Sinatra Loader above
#All modules are executed by calling their set methods

#Examples
#
#log.info "information returns nil"
#log.warning "bad move zeeshan"

#error_json(404, 'bad news bears').to_json
module MyHelpers
	module Logging
		extend self
		attr_reader :log
		def log
			@log = Logger.new(STDERR)
			@log = Logger.new(STDOUT)
			@log.level = Logger::INFO
			return @log
		end
	end

	module Timestamp
		extend self
		attr_reader :timestamp
		def timestamp
			@time = Time.now.utc.iso8601
			return @time
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
		attr_reader :rand_id
		def gen_random_id()
			@rand_id = Base32.encode(Digest::MD5.digest(UUIDTools::UUID.random_create)).downcase!.split('=')[0]
		end
	end

	module TimeAgo
		extend self
		attr_reader :changed_objs
		def time_ago(objs)
			@changed_objs = []
			objs.each { |obj|
				obj['time_ago'] = relative_time_ago(obj.created_at)
				@changed_objs.push(obj)
			}

			return @changed_objs
		end
	end

	module RandString
		extend self
		attr_reader :rand_string
		def randstring(length)
			chars = ('0'..'9').to_a + ('A'..'Z').to_a + ('a'..'z').to_a
			@rand_string = chars.sort_by { rand }.join[0...length]
		end
	end

	module IsNumeric
		def is_numeric?(obj) 
		   obj.to_s.match(/\A[+-]?\d+?(\.\d+)?\Z/) == nil ? false : true
		end
	end

	module UserAgentMobileCheck
		extend self
		attr_reader :ua

		def isMobile(req_agent)
			puts req_agent
			@ua = AgentOrange::UserAgent.new(req_agent)
			plat = @ua.device.platform.to_s.downcase
			if @ua.is_mobile? and plat.index('ipad').nil? and !req_agent.downcase.index('mobile').nil? and req_agent.downcase.index('tablet').nil?
				return true
			else
				return false
			end
		end
	end

	module NYPLipRange
		def checkIP(req_ip)
			#hardcoded range into this value... for the library
			("65.88.88.0".split(".").inject(0) { |s, p| (s << 8) + p.to_i }..
				"65.255.255.255".split(".").inject(0) { |s, p| (s << 8) + p.to_i }).include?(req_ip)
		end
	end

	module CSRF
		def csrf_token()
			Rack::Csrf.csrf_token(env)
		end

		def csrf_tag()
			Rack::Csrf.csrf_tag(env)
		end
	end
end

