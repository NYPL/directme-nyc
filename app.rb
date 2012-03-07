#Public: route => "/css/:application.css" deals w/ scss/less to css handlers => for development only; use jammit when ready for production (reason for assets folder)

#Public: route => "/" contains front-page components and DVs for boroughs
#@deps - array of dependent javascript modules, loaded specific to index
#slim :index - refers to index view

#Public: for a bigger application, map each route/handler into a separate class, then map each class accordingly in config.ru
class Application < Sinatra::Base
	#########################main handlers###########################
	get '/' do
		@consts = ['order!libs/underscore', 'order!modules/ytube', 'order!modules/viewer', 'order!modules/templates']
		@deps = ['order!modules/mappings', 'order!bootstrap/js/bootstrap-modal.js', 'bootstrap/js/bootstrap-tooltip.js', 'bootstrap/js/bootstrap-typeahead.js']
		@DV = true
		slim :main
	end

	get '/help' do
		@consts = ['order!libs/jquery.history']
		slim :help
	end

	get '/credits' do
		slim :credits
	end

	get '/results/:id' do
		slim :results
	end

	post '/one_step' do
		@gen_id = gen_random_id()
		status 201
	end

	get '/locations' do
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

	get '/locations/:id' do
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

	get '/dvs' do
		callback = params.delete('callback') # jsonp
		json = Loaders.all.to_json
		if callback
			content_type :js
			response = "#{callback}(#{json})" 
		else
			content_type :json
			response = json
		end
		response
	end

	get '/dvs/:id' do
		callback = params.delete('callback') # jsonp
		json = Loaders.find(params['id']).to_json

		if callback
			content_type :js
			response = "#{callback}(#{json})" 
		else
			content_type :json
			response = json
		end
		response
	end

	get '/stories' do
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

	get '/stories/:id' do
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
