#globals
#-------------------------------------
#read flat json file for parsing
$JSON = {}
Dir.glob('public/*.json') do |file|
	json = File.read(file)
	name = file.gsub(/public\//, '').split('.json')[0]
	$JSON["#{name}"] = JSON.parse(json)
end

$LIMIT = 10
#------------------------------------

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

def paging_time(model, request, params)
	if params['limit']
		limit = params['limit']
	else
		limit = $LIMIT
	end

	if params.has_key?("after_timestamp")
		objs = model.where(:created_at.gt => Time.parse(params['after_timestamp']).getutc).order_by(:created_at, :asc).limit(limit)
	elsif params.has_key?("before_timestamp")
		objs = model.where(:created_at.lt => Time.parse(params['before_timestamp']).getutc).order_by(:created_at, :desc).limit(limit)
	else
		now = Time.parse(timestamp()).getutc
		objs = model.where(:created_at.lt => now).order_by(:created_at, :desc).limit(limit)
	end

	first_result = objs.first().created_at
	last_result = objs.last().created_at

	url = request.url.split('?')[0]
	before_url = {:limit => limit, :before_timestamp => last_result}.to_query
	after_url = {:limit => limit, :after_timestamp => first_result}.to_query

	changed_objs = time_ago(objs)

	return {
		:objs => changed_objs, 
		:url => url, 
		:before_url => before_url, 
		:after_url => after_url
	}
end

class Application < Sinatra::Base
	#########################main handlers###########################
	get '/' do
		@scripts = ['/js/libs/jquery.marquee.js']
		@consts = ['modules/ytube']
		@deps = ['modules/front', 'modules/nytimes']

		@monthday = Time.now.strftime("%m/%d")
		@year = (Time.new.year - 72)

		slim :main
	end

	get '/DV/:borough' do
		@scripts = ['/js/libs/jquery-ui-1.8.18.custom.min.js']
		@consts = ['libs/underscore', 'modules/viewer', 'modules/templates']
		@deps = ['modules/DV_load', 'modules/pubsub', 'modules/magpie', 'libs/jquery.jloupe', 'modules/bootstraps']
		@DV = true
		slim :DV_page, :locals => {:borough => "#{params['borough']}"}
	end

	get '/findings' do
		@scripts = ['/js/libs/wax/ext/leaflet.js', '/js/libs/wax/wax.leaf.min.js']
		@deps = ['modules/latest']
		@LATEST = true
		slim :latest
	end

  	get '/help' do
		slim :help
	end

	get '/credits' do
		slim :credits
	end

	get '/results' do
		@scripts = ['/js/libs/jquery.marquee.js', '/js/libs/wax/ext/leaflet.js', '/js/libs/wax/wax.leaf.min.js']
		@consts = ['libs/underscore']
		@deps = ['modules/results', 'modules/nytimes']

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
		if Locations.exists?
			ret_hash = paging_time(Locations, request, params)

			hash = {
				:locations => ret_hash[:objs],
				:before_timestamp => "%s?%s" % [ret_hash[:url], ret_hash[:before_url]],
				:after_timestamp => "%s?%s" % [ret_hash[:url], ret_hash[:after_url]] 
			}.to_json

		else
			log.info 'no location searches'
			hash = error_json(404, 'no location searches').to_json
		end

		return JsonP(hash, params)
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


			if hash['street'].scan(/\w+/).count() == 1
				_street = hash['street'] + ' St'
			else
				_street = hash['street']
			end

			hash['address'] = [hash['number'], _street.split.map {|w| w.capitalize}.join(' '), hash['fullcity'].capitalize, hash['state'].upcase].compact.join(', ')
			hash['main_string'] = [hash['name'], hash['number'], _street.split.map {|w| w.capitalize}.join(' '), hash['borough'].capitalize, hash['state'].upcase].compact.join(', ')
			hash['coordinates'] = Geocoder.search(hash['address']).first.data['geometry'].fetch('location')

			json = Locations.safely.create(hash).to_json
		else

			log.info 'write error here'
		end

		return JsonP(json, params)
	end

	get '/locations/:token.json' do
		obj = Locations.where(:token => params['token']).first()
		_stories = Stories.where(:result_url => obj.url).order_by(:created_at, :desc)

		stories = time_ago(_stories)

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
			:cutout => obj.cutout,
			:stories => stories
		}.to_json

		return JsonP(hash, params)
	end

	get '/dvs/:borough.json' do
		json = Loaders.where(:borough => params['borough']).first().to_json
		return JsonP(json, params)
	end

	post '/stories.json' do
		status 201

		if !params['content'].blank? and !params['content'].nil? and !params['token'].blank? and !params['token'].nil?
			hash = {}
			params.each { |param, value|
				if param != 'callback' and param != 'token' and value != 'null'
					hash[param] = value
				end
			}

			if request.host == 'localhost'
				hash['result_url'] = 'http://%s:%s/results?token=%s' % [request.host, request.port, params['token']]
			else
				hash['result_url'] = 'http://%s/results?token=%s' % [request.host, params['token']]
			end

			json = Stories.safely.create(hash).to_json
			return JsonP(json, params)

		else
			log.info 'write error here'
		end
	end

	get '/stories.json' do
		if Stories.exists?
			ret_hash = paging_time(Stories, request, params)

			hash = {
				:stories => ret_hash[:objs],
				:before_timestamp => "%s?%s" % [ret_hash[:url], ret_hash[:before_url]],
				:after_timestamp => "%s?%s" % [ret_hash[:url], ret_hash[:after_url]] 
			}.to_json

		else
			log.info 'no stories exist'
			hash = error_json(404, 'no stories created').to_json
		end

		return JsonP(hash, params)
	end

	get '/streets/:borough.json' do
		hash = {
			:fullcity => $JSON[params['borough']]['fullcity'],
			:state => $JSON[params['borough']]['state'],
			:streets => $JSON[params['borough']]['streets'].keys()
		}.to_json

		return JsonP(hash, params)
	end

	get '/indexes/:borough.json' do
		hash = {
			:idxs => $JSON['%s_%s' % ['idx', params['borough']]]['idxs']
		}.to_json

		return JsonP(hash, params)
	end

	get '/headlines.json' do
		if Headlines.exists?
			json = Headlines.all().to_json
		else
			log.info 'no Headlines returned'
		end

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