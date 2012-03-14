#globals
$API_url = "http://stevemorse.org/census/index.html?="
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
		@deps = ['order!modules/mappings']
		slim :main
	end

	get '/DV/:borough' do
		@consts = ['order!libs/underscore']
		@deps = ['order!modules/pubsub', 'order!modules/viewer', 'order!modules/templates', 'order!modules/DV_load',
					'order!modules/magpie', 'order!libs/jquery.jloupe', 'order!modules/bootstraps']
		@DV = true
		slim :DV_page, :locals => {"borough" => "#{params['borough']}"}
	end

	get '/help' do
		slim :help
	end

	get '/credits' do
		slim :credits
	end

	get '/results' do
		#boo!
		@deps = ['order!modules/results']
		if !params['token'].blank? and !params['token'].nil?
			loc_obj = Locations.find(params['token'])

			params_hash = {:year => '1940', :state => loc_obj.state, :fullcity => loc_obj.fullcity, :street => loc_obj.street, :number => loc_obj.number}.to_query
			API_call = $API_url + params_hash
			response = Conn.get(API_call)
			doc = Hpricot(response.body)
			puts doc

			@results = true
			slim :results

		else
			log.info "write error here"
		end
	end

	get '/locations.json' do

	end

	post '/locations.json' do
		status 201
		if !params['street'].blank? and !params['street'].nil?
			json = Locations.create(name: params['name'], number: params['number'], street: params['street'], borough: params['borough'], fullcity: params['fullcity'], state: params['state']).to_json
			return JsonP(json, params)
		else
			log.info 'write error here'
		end
	end

	get '/locations/:id.json' do
		json = Locations.find(params['id']).to_json
		return JsonP(json, params)		
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
		json = Streets.where(borough: params['borough']).first().to_json
		return JsonP(json, params)
	end

	get '/m' do

	end
	#################################################################

	########################other handlers###########################
	not_found do
		status 404
		slim :not_found
	end
	#################################################################

end