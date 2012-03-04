#Public: route => "/css/:application.css" deals w/ scss/less to css handlers => for development only; use jammit when ready for production (reason for assets folder)

#Public: route => "/" contains front-page components and DVs for boroughs
#@deps - array of dependent javascript modules, loaded specific to index
#slim :index - refers to index view 

#Public: for a bigger application, map each route/handler into a separate class, then map each class accordingly in config.ru
class Application < Sinatra::Base
	#########################main handlers###########################
	get '/' do
		@consts = ['order!libs/underscore', 'order!libs/jquery.history', 'order!modules/ytube', 'order!modules/viewer', 'order!modules/templates']
		@deps = ['order!modules/map', 'order!bootstrap/js/bootstrap-modal.js', 'bootstrap/js/bootstrap-tooltip.js', 'bootstrap/js/bootstrap-typeahead.js']
		slim :main
	end

	get '/help' do

	end

	get '/credits' do

	end

	post '/one_step' do
		status 201
	end

	get '/results/:id' do

	end

	get '/locations' do

	end

	get '/locations/:id' do

	end

	get '/dvs' do

	end

	get '/dvs/:id' do

	end

	get '/stories' do

	end

	get '/stories/:id' do

	end

	get '/m' do

	end
	#################################################################



	########################other handlers###########################
	not_found do
		status 404
		slim :not_found, :locals => {"voo" => "404"}
	end

	error do

	end
	#################################################################

end
