# app only methods
def JsonP(json, params)
	callback = params.delete('callback') # jsonp

	if callback
		content_type :js
		response = "#{callback}(#{json})" 
	else
		content_type :json
		response = json
	end

	response
end

class Application < Sinatra::Base
	#########################main handlers###########################
	get '/' do
		@scripts = ['/js/libs/jquery.marquee.js']
		@consts = ['order!modules/ytube']
		@deps = ['order!modules/nytimes']

		@monthday = Time.now.strftime("%m/%d")
		@year = (Time.new.year - 72)

		slim :main
	end

	get '/DV/:borough' do
		@scripts = ['/js/libs/jquery-ui-1.8.18.custom.min.js']
		@consts = ['order!libs/underscore', 'order!modules/viewer', 'order!modules/templates', 
					'order!modules/DV_load']
		@deps = ['order!modules/pubsub', 'order!modules/magpie',
					'order!libs/jquery.jloupe', 'order!modules/bootstraps']
		@DV = true
		slim :DV_page, :locals => {:borough => "#{params['borough']}"}
	end

  get '/latest' do
    slim :latest
  end

  get '/help' do
		slim :help
	end

	get '/credits' do
		slim :credits
	end

	get '/results' do
		@scripts = ['/js/libs/jquery.marquee.js']
		@deps = ['order!modules/results', 'order!modules/nytimes']

		if !params['token'].blank? and !params['token'].nil?

			obj = Locations.where(:token => params['token']).first()

			if !obj.blank? and !obj.nil?
				header_string = ""
				street_string = [obj.name, obj.number, obj.street.split.map {|w| w.capitalize}.join(' '),
									obj.borough.capitalize, obj.state.upcase]

				street_string.each_with_index { |val, i|
					if val != nil
						if i == 0 or i == 3
							val += ", "
						end
						header_string += " #{val}"
					end
				}

				@monthday = Time.now.strftime("%m/%d")
				@year = (Time.new.year - 72)
				@RESULTS = true
				slim :results, :locals => {:header_string => "#{header_string}"}

			else
				log.info "No Valid Result Token"
				status 404
				redirect '/'
			end

		else
			log.info "No Result Token"
			status 404
			redirect '/'
		end
	end

#---------------API-CALLs-------------------------------------------------------

	get '/locations.json' do
		#timestamp ranges here
	end

	post '/locations.json' do
		status 201
		if !params['street'].blank? and !params['street'].nil?

			hash = {}
			params.each { |param, value|
				if param != 'callback' and value != 'null'
					hash[param] = value
				end
			}

			hash['token'] = gen_random_id()
			if request.host == 'localhost'
				hash['url'] = 'http://%s:%s/results?token=%s' % [request.host, request.port, hash['token']]
			else
				hash['url'] = 'http://%s/results?token=%s' % [request.host, hash['token']]
			end
			json = Locations.create(hash).to_json
			return JsonP(json, params)
		else
			log.info 'write error here'
		end
	end

	get '/locations/:token.json' do
		obj = Locations.where(:token => params['token']).first()
		ed_obj = Streets.where(:borough => obj.borough).only("streets.#{obj.street}", 
								"fullcity_id").first()

		hash = {
			:cross_streets => ed_obj.streets[obj.street]['cross'],
			:eds => ed_obj.streets[obj.street]['eds'],
			:fullcity_id => ed_obj.fullcity_id
		}.to_json

		return JsonP(hash, params)
	end

	get '/dvs/:borough.json' do
		json = Loaders.where(:borough => params['borough']).first().to_json
		return JsonP(json, params)
	end

	get '/stories.json' do
	end

	get '/stories/:id.json' do
	end

	get '/streets/:borough.json' do
		obj = Streets.where(:borough => params['borough']).first()
		hash = {
			:fullcity => obj.fullcity,
			:state => obj.state,
			:streets => obj.streets.keys()
		}.to_json

		return JsonP(hash, params)
	end

	get '/headlines.json' do
		json = Headlines.all().to_json
		return JsonP(json, params)
	end
#---------------MOBILE&NOT-FOUND-------------------------------------------------------

	get '/m' do

	end
	#################################################################

	########################other handlers###########################
	not_found do
		status 404
		redirect '/'
	end
	#################################################################

end