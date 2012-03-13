#Public: route => "/css/:application.css" deals w/ scss/less to css handlers => for development only; use jammit when ready for production (reason for assets folder)

#Public: route => "/" contains front-page components and DVs for boroughs
#@deps - array of dependent javascript modules, loaded specific to index
#slim :index - refers to index view

#Public: for a bigger application, map each route/handler into a separate class, then map each class accordingly in config.ru
class Application < Sinatra::Base
	#########################main handlers###########################
	get '/' do
		@consts = ['order!modules/ytube']
		@deps = ['order!modules/mappings']
		slim :main
	end

	get '/DV/:borough' do
		@consts = ['order!libs/underscore', 'order!libs/jquery-ui-1.8.18.custom.min','order!modules/viewer', 'order!modules/templates']
		@deps = ['order!modules/pubsub', 'order!modules/DV_load', 'order!modules/magpie', 'order!modules/bootstraps', 'order!modules/fuzzy']
		@DV = true
		slim :DV_page, :locals => {"borough" => "#{params['borough']}"}
	end

	get '/help' do
		slim :help
	end

	get '/credits' do
		slim :credits
	end

	get '/results/:id' do
		@results = true
		slim :results
	end

	post '/one_step' do
		@gen_id = gen_random_id()
		status 201
	end

	get '/locations.json' do
		callback = params.delete('callback') # jsonp
		json = ""

		if callback
			content_type :js
			response = "#{callback}(#{json})" 
		else
			content_type :json
			response = json
		end
		response

	end

	get '/locations/:id.json' do
		callback = params.delete('callback') # jsonp
		json = ""

		if callback
			content_type :js
			response = "#{callback}(#{json})" 
		else
			content_type :json
			response = json
		end
		response
	end

	get '/dvs/:borough.json' do
		callback = params.delete('callback') # jsonp
		json = Loaders.where(borough: "#{params['borough']}").first().to_json

		if callback
			content_type :js
			response = "#{callback}(#{json})" 
		else
			content_type :json
			response = json
		end
		response
	end

	get '/stories.json' do
		callback = params.delete('callback') # jsonp
		json = ""

		if callback
			content_type :js
			response = "#{callback}(#{json})" 
		else
			content_type :json
			response = json
		end
		response
	end

	get '/stories/:id.json' do
		callback = params.delete('callback') # jsonp
		json = ""

		if callback
			content_type :js
			response = "#{callback}(#{json})" 
		else
			content_type :json
			response = json
		end
		response
	end

	get '/streets/:borough.json' do
		callback = params.delete('callback') # jsonp
		json = Streets.where(borough: "#{params['borough']}").first().to_json

		if callback
			content_type :js
			response = "#{callback}(#{json})" 
		else
			content_type :json
			response = json
		end
		response
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
