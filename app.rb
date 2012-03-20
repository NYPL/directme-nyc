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

#read flat json file for parsing
$JSON = {}
Dir.glob('public/*.json') do |file|
	json = File.read(file)
	name = file.gsub(/public\//, '').split('.json')[0]
	$JSON["#{name}"] = JSON.parse(json)
end


class Application < Sinatra::Base
	#########################main handlers###########################
	get '/' do
		@scripts = ['/js/libs/jquery.marquee.js']
		@consts = ['order!modules/ytube']
		@deps = ['order!modules/nytimes']

		@monthday = Time.now.strftime("%m/%d")
		@year = (Time.new.year - 72)

		slim :main
	end

	get '/DV/:borough' do
		@scripts = ['/js/libs/jquery-ui-1.8.18.custom.min.js']

		@consts = ['order!libs/underscore', 'order!modules/viewer', 'order!modules/templates', 'order!modules/DV_load']
		@deps = ['order!modules/pubsub', 'order!modules/magpie', 'order!libs/jquery.jloupe', 'order!modules/bootstraps']
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
		@scripts = ['/js/libs/jquery.marquee.js']
		@consts = ['order!libs/underscore', 'order!libs/wax/ext/leaflet', 'order!libs/wax/wax.leaf.min']
		@deps = ['order!modules/results', 'order!modules/nytimes']

		if !params['token'].blank? and !params['token'].nil?

			obj = Locations.where(:token => params['token']).first()

			if !obj.blank? and !obj.nil?

				@monthday = Time.now.strftime("%m/%d")
				@year = (Time.new.year - 72)
				@RESULTS = true
				slim :results, :locals => {:header_string => "#{obj.main_string}"}

			else
				log.info "No Valid Result Token"
				status 404
				redirect '/'
			end

		else
			log.info "No Result Token"
			status 404
			redirect '/'
		end
	end

#---------------API-CALLs-------------------------------------------------------

	get '/locations.json' do
		#timestamp ranges here
	end

	post '/locations.json' do
		status 201
		if !params['street'].blank? and !params['street'].nil?

			hash = {}
			params.each { |param, value|
				if param != 'callback' and value != 'null'
					hash[param] = value
				end
			}

			hash['token'] = gen_random_id()
			if request.host == 'localhost'
				hash['url'] = 'http://%s:%s/results?token=%s' % [request.host, request.port, hash['token']]
			else
				hash['url'] = 'http://%s/results?token=%s' % [request.host, hash['token']]
			end

			hash['address'] = [hash['number'], hash['street'].split.map {|w| w.capitalize}.join(' '), hash['fullcity'].capitalize, hash['state'].upcase].compact.join(', ')
			hash['main_string'] = [hash['name'], hash['number'], hash['street'], hash['borough'].capitalize, hash['state'].upcase].compact.join(', ')
			hash['coordinates'] = Geocoder.search(hash['address']).first.data['geometry'].fetch('location')

			json = Locations.safely.create(hash).to_json
			return JsonP(json, params)
		else
			log.info 'write error here'
		end
	end

	get '/locations/:token.json' do
		obj = Locations.where(:token => params['token']).first()
		ed_hash = $JSON[obj.borough]

		crosses = ed_hash['streets'][obj.street]['cross'].map(&:keys).flatten
		values = ed_hash['streets'][obj.street]['cross'].map(&:values).flatten
		hash = {
			:cross_streets => crosses,
			:cross_vals => values,
			:eds => ed_hash['streets'][obj.street].fetch('eds'),
			:fullcity_id => ed_hash['fullcity_id'],
			:street => obj.street,
			:coordinates => obj.coordinates,
			:cutout => obj.cutout
		}.to_json

		return JsonP(hash, params)
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
		hash = {
			:fullcity => $JSON[params['borough']]['fullcity'],
			:state => $JSON[params['borough']]['state'],
			:streets => $JSON[params['borough']]['streets'].keys()
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