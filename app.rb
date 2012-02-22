#Public: route => "/css/:application.css" deals w/ scss/less to css handlers => for development only; use jammit when ready for production (reason for assets folder)

#Public: route => "/" contains front-page components and DVs for boroughs
#@deps - array of dependent javascript modules, loaded specific to index
#slim :index - refers to index view 

#Public: for a bigger application, map each route/handler into a separate class, then map each class accordingly in config.ru
class Application < Sinatra::Base

	get '/css/:application.css' do |application|
		if !application.include? 'bootstrap'
			scss :"#{application}", :views => './public/scss'
		end
	end

	#########################main handlers###########################
	get '/' do
		@deps = ['modules/ytube']
		slim :index
	end

	get '/census' do

	end

	post '/one_step' do
		status 201
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
