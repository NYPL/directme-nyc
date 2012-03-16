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
		@consts = ['order!modules/ytube']
		@deps = ['order!modules/nytimes', 'order!modules/front']
		@monthday = Time.now.strftime("%m/%d")
		@year = (Time.new.year - 72)

		slim :main
	end

	get '/DV/:borough' do
		@consts = ['order!libs/underscore', 'order!modules/viewer', 'order!modules/templates']
		@deps = ['order!modules/pubsub', 'order!modules/magpie', 'order!modules/DV_load',
					'order!libs/jquery.jloupe', 'order!modules/bootstraps']
		@DV = true
		slim :DV_page, :locals => {:borough => "#{params['borough']}"}
	end

	get '/help' do
		slim :help
	end

	get '/credits' do
		slim :credits
	end

	get '/results' do
		#boo!
		@deps = ['order!modules/nytimes', 'order!modules/results']
		@monthday = Time.now.strftime("%m/%d")
		@year = (Time.new.year - 72)

		if !params['token'].blank? and !params['token'].nil?
			loc_obj = Locations.where(:token => params['token']).first()

			if !loc_obj.blank? and !loc_obj.nil?
				@RESULTS = true
				slim :results

			else
				log.info "write error here"
				status 404
				redirect '/'
			end

		else
			log.info "write error here"
			status 404
			redirect '/'
		end
	end

#---------------API-CALLs-------------------------------------------------------

	get '/locations.json' do

	end

	post '/locations.json' do
		status 201
		if !params['street'].blank? and !params['street'].nil?

			hash = {}
			params.each { |param, value|
				if param != 'callback'
					hash[param] = value
				end
			}

			hash['token'] = gen_random_id()
			hash['url'] = 'http://%s/results?token=%s' % [request.host, hash['token']]
			json = Locations.create(hash).to_json
			return JsonP(json, params)
		else
			log.info 'write error here'
		end
	end

	get '/locations/:token.json' do	
		#ED_streets = Streets.where(:borough => params['borough']).only("streets.#{params['street']}").to_json
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