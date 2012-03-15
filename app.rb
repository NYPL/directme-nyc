#globals
$APIURL = "http://api.nytimes.com/svc/pages/v2/date"
$YEAR  = "1940"
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

		t = Time.now.strftime("%m/%d")
		
		#NY_api = "#{$APIURL}/#{$YEAR}/#{t}/P1.json?api=#{APIKEY}"

		Conn.get('')

		TIMES = true
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
		@deps = ['order!modules/results']
		if !params['token'].blank? and !params['token'].nil?
			loc_obj = Locations.where(token: params['token']).first()

			if !loc_obj.blank? and !loc_obj.nil?
				@RESULTS = true
				@TIMES = true
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

	get '/locations.json' do

	end

	post '/locations.json' do
		status 201
		if !params['street'].blank? and !params['street'].nil?
			json = Locations.create(name: params['name'], number: params['number'], street: params['street'], borough: params['borough'], 
				fullcity: params['fullcity'], state: params['state'], token: gen_random_id()).to_json
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
		redirect '/'
	end
	#################################################################

end