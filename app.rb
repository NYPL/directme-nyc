#really, a set of controllers, but is the app!
class Application < Sinatra::Base

	#scss/less to css handlers => for development only, jammit when ready to go
	get '/css/:application.css' do |application|
		if !application.include? 'bootstrap'
			scss :"#{application}", :views => './public/scss'
		end
	end

	#main handlers
	
	get '/' do
		@libs = ['libs/swfobject']
		@deps = ['modules/ytube']
		slim :index
	end

	not_found do
		status 404
		slim :not_found, :locals => {"voo" => "404"}
	end

	error do

	end

end
