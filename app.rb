#really, a set of controllers, but is the app!
class Application < Sinatra::Base
	#scss/less to css handlers
	get '/css/:application.css' do |application|
		if !application.include? 'bootstrap'
			scss :"#{application}", :views => './public/scss'
		end
	end

	#main handlers
	get '/' do
		@deps = ["views/testmodule"]
		slim :index
	end

	not_found do
		status 404
		slim :not_found, :locals => {"voo" => "404"}
	end

	error do

	end

end
