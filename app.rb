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
		@deps = ['order!modules/nytimes']

		slim :main
	end

	get '/DV/:borough' do
		@consts = ['order!libs/underscore']
		@deps = ['order!modules/pubsub', 'order!modules/magpie', 'order!modules/viewer', 'order!modules/templates', 'order!modules/DV_load',
					'order!libs/jquery.jloupe', 'order!modules/bootstraps']
		@DV = true
		slim :DV_page, locals: {borough: "#{params['borough']}"}
	end

	get '/help' do
		slim :help
	end

	get '/credits' do
		slim :credits
	end

	get '/results' do
		#boo!
		@deps = ['order!modules/results', 'order!modules/nytimes']
		if !params['token'].blank? and !params['token'].nil?
			loc_obj = Locations.where(token: params['token']).first()

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

			#ED_streets = Streets.where("streets.#{params['street']}".to_sym.exists => true)
			#	.find("streets.#{params['street']}").to_json
			puts "fjlsjfls"
			#puts ED_streets
			puts "aa"

			json = Locations.create(name: params['name'], number: params['number'], 
					street: params['street'], borough: params['borough'], fullcity: params['fullcity'], 
					state: params['state'], token: gen_random_id()).to_json
			return JsonP(json, params)
		else
			log.info 'write error here'
		end
	end

	get '/locations/:id.json' do	
	end

	get '/dvs/:borough.json' do
		json = Loaders.where(borough: params['borough']).first().to_json
		return JsonP(json, params)
	end

	get '/stories.json' do
	end

	get '/stories/:id.json' do
	end

	get '/streets/:borough.json' do
		obj = Streets.where(borough: params['borough']).first()
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
#---------------API-CALLs-------------------------------------------------------

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