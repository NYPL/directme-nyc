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
$MAPS = ['http://a.tiles.mapbox.com/v3/nypllabs.nyc1940-16.jsonp', 'http://a.tiles.mapbox.com/v3/mapbox.mapbox-streets.jsonp']
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

	#first_result = objs[0].created_at

	if objs.count() < Integer(limit) - 1
		last_result = nil
	else
		last_result = objs[Integer(limit) - 1].created_at
	end

	url = request.url.split('?')[0]

	if !last_result.nil?
		before_url = {:limit => limit, :before_timestamp => last_result}.to_query
	else
		before_url = nil
	end	

	#after_url = {:limit => limit, :after_timestamp => first_result}.to_query

	changed_objs = time_ago(objs)

	return {
		:objs => changed_objs, 
		:url => url, 
		:before_url => before_url
	}
end

def ajaxcheck(request)
	if request.xhr? == true
		return true
	else
		return false
	end
end

def checkSession(session)
	if session
		obj = UserSessions.where(:session => session['session_id']).first()
		if !obj.blank? and !obj.nil?
			return {:conn => obj.connection, :user => obj.user_name, :sess => true}
		else
			return nil
		end
	end
end

class Application < Sinatra::Base
	#########################main handlers###########################
	get '/' do
		if isMobile(request.user_agent)
			redirect '/latest'
		else
			@scripts = ['/js/libs/jquery.marquee.js']
			@consts = ['order!modules/ytube']
			@deps = ['order!modules/front', 'order!modules/nytimes']

			@monthday = Time.now.strftime("%m/%d")
			@year = (Time.new.year - 72)
			@SOCIAL = true

			if checkIP(request.ip)
				@onsite = true
			else
				@onsite = false
			end

			slim :main
		end
	end

	get '/directory/:borough' do
    @title = params['borough'].split(/(\W)/).map(&:capitalize).join
		if isMobile(request.user_agent)
			redirect '/latest'
		else
			@scripts = ['/js/libs/jquery-ui-1.8.18.custom.min.js', '/js/modules/bootstraps.js']
			@consts = ['order!modules/viewer', 'order!modules/templates']
			@deps = ['order!modules/DV_load', 'order!modules/pubsub', 'order!modules/magpie']
			@DV = true

			slim :DV_page, :locals => {:borough => "#{params['borough']}"}
		end
	end

	get '/latest' do
	  @title = 'Latest'
		@scripts = ['/js/libs/wax/ext/leaflet.js', '/js/libs/wax/wax.leaf.min.js']
		@deps = ['order!modules/latest']
		@LATEST = true
		@SOCIAL = true

		slim :latest
	end

  get '/faq' do
    @title = 'FAQ'
		erb :faq, :layout_engine => :slim
	end

	get '/about' do
    @title = 'About'
		erb :about, :layout_engine => :slim
	end

	get '/results' do
    @title = 'Results'
		if !params['token'].blank? and !params['token'].nil?

			obj = Locations.where(:token => params['token']).first()

			if !obj.blank? and !obj.nil?
				@scripts = ['/js/libs/jquery.marquee.js', '/js/libs/wax/ext/leaflet.js', '/js/libs/wax/wax.leaf.min.js', 
							'/js/modules/bootstraps.js']
				@deps = ['order!modules/results', 'order!modules/nytimes']
				@monthday = Time.now.strftime("%m/%d")
				@year = (Time.new.year - 72)

				@RESULTS = true
				@SOCIAL = true

				if checkIP(request.ip)
					@onsite = true
				else
					@onsite = false
				end

        @title = obj.main_string

        slim :results, :locals => {:header_string => "#{obj.main_string}"}

			else
				log.info "No Valid Result Token"
				status 404
			end

		else
			log.info "No Result Token"
			status 404
		end
	end

#---------------MOBILE&NOT-FOUND&<=IE7-------------------------------------------------------
	get '/upgrade' do
		slim :upgrade, :layout => :'eww/layout'
	end 

	not_found do
		status 404
		slim :not_found
	end

	get '/auth/:name/callback' do
		auth = request.env["omniauth.auth"]
		name = auth["info"]["name"]

		if params['name'] == 'google_oauth2'
			service = 'google'
		else
			service = params['name']
		end

		token = auth["credentials"]["token"]
		hash = {
			:session => session['session_id'],
			:user_name => name,
			:user_token => token,
			:connection => service
		}

		UserSessions.safely.create(hash)
		redirect '/callback'
	end

	get '/auth/failure' do
		#flash[:notice] = "Not Able to Log You In"
		redirect '/callback'
	end

	get '/callback' do
		slim :callback, :layout => :'eww/layout'
	end
	#################################################################
end
#---------------API-CALLs-------------------------------------------------------

class Api < Application
	get '/locations.json' do
		if ajaxcheck(request)
			if Locations.exists?
				ret_hash = paging_time(Locations, request, params)

				if !ret_hash[:before_url].nil?
					hash = {
						:locations => ret_hash[:objs],
						:before_timestamp => "%s?%s" % [ret_hash[:url], ret_hash[:before_url]]
					}.to_json
				else
					hash = {
						:locations => ret_hash[:objs]
					}.to_json
				end

			else
				log.info 'no location searches'
				hash = error_json(404, 'no location searches').to_json
			end
		else
			log.info 'cannot access without browser session'
			status 403
			hash = error_json(403, 'cannot access without browser session').to_json
		end

		content_type 'application/json'
		return JsonP(hash, params)
	end

	post '/locations.json' do
		if ajaxcheck(request)

			con_streets = $JSON[params['borough']]

			if params['noSearch'] or con_streets['streets'].has_key?(params['street'])
				goAhead = true
			else
				goAhead = false
			end

			if !params['street'].blank? and !params['street'].nil? and goAhead

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

				if hash['borough'] == 'staten'
					string_boro = 'Staten Island'
				else
					string_boro = hash['borough'].capitalize
				end

				directions = ['e', 'w', 'n', 's', 'nw', 'ne', 'sw', 'se']

				st_arr = hash['street'].scan(/\w+/)
				_street = hash['street']
				if directions.include?(st_arr[1])
					arr = []
					arr.push(st_arr[1], st_arr[0], st_arr[2..-1])
					_street = arr.join(" ")
					if st_arr.length <= 2 
						if is_numeric? hash['street'].split('th')[0] or is_numeric? hash['street'].split('rd')[0] or is_numeric? hash['street'].split('nd')[0]
							_street += ' St'
						end
					end
				else
					if st_arr.length == 1
						if is_numeric? hash['street'].split('th')[0] or is_numeric? hash['street'].split('rd')[0] or is_numeric? hash['street'].split('nd')[0]
							_street = hash['street'] + ' St'
						end
					else	
						_street = hash['street']
					end
				end
				num_street = "%s %s" % [hash['number'], _street.split.map {|w| w.capitalize}.join(' ')]
				hash['address'] = [num_street, hash['fullcity'].capitalize, hash['state'].upcase].compact.join(', ')
				hash['main_string'] = [hash['name'], num_street, string_boro, hash['state'].upcase].compact.join(', ')
				hash['coordinates'] = Geocoder.search(hash['address']).first.data['geometry'].fetch('location')

				location = Locations.safely.create(hash)

				if location.valid? == false 
					status 400
					json = error_json(400, 'not a valid location object created').to_json

				else
					json = location.to_json
					status 201
				end

			else
				status 400
				json = error_json(400, 'bad request, missing correct parameters').to_json
			end

		else
			log.info 'cannot access without browser session'
			status 403
			json = error_json(403, 'cannot access without browser session').to_json
		end

		content_type 'application/json'
		return JsonP(json, params)
	end

	get '/locations/:token.json' do
		if ajaxcheck(request)
			obj = Locations.where(:token => params['token']).first()
			_stories = Stories.where(:result_token => params['token']).order_by(:created_at, :desc)

			stories = time_ago(_stories)

			ed_hash = $JSON[obj.borough]

			if ed_hash['streets'].has_key?(obj.street)
				crosses = ed_hash['streets'][obj.street]['cross'].map(&:keys).flatten
				values = ed_hash['streets'][obj.street]['cross'].map(&:values).flatten
				eds = ed_hash['streets'][obj.street].fetch('eds')
			else
				crosses = nil
				values = nil
				eds = nil
			end

			if  obj.coordinates and obj.coordinates.class == BSON::OrderedHash
				coords = obj.coordinates
			else
				coords = nil
			end

			#bust ie cache!
			bust_maps = []
			$MAPS.each { |url|
				bust_maps.push(url + '?bust=' + randstring(8))
			}

			hash = {
				:map_urls => bust_maps,
				:cross_streets => crosses,
				:cross_vals => values,
				:eds => eds,
				:fullcity_id => ed_hash['fullcity_id'],
				:street => obj.street,
				:coordinates => coords,
				:cutout => obj.cutout,
				:stories => stories,
				:borough => obj.borough,
				:state => obj.state.downcase!
			}

			hash = hash.delete_if { |k, v| v.nil? }.to_json
		else
			log.info 'cannot access without browser session'
			status 403
			hash = error_json(403, 'cannot access without browser session').to_json
		end

		content_type 'application/json'
		return JsonP(hash, params)
	end

	get '/dvs/:borough.json' do
		if ajaxcheck(request)
			json = Loaders.where(:borough => params['borough']).first().to_json
		else
			log.info 'cannot access without browser session'
			status 403
			json = error_json(403, 'cannot access without browser session').to_json
		end

		content_type 'application/json'
		return JsonP(json, params)
	end

	get '/session.json' do
		sess = checkSession(session)
		puts session

		if sess.nil?
			json = {:sess => false}.to_json
		else
			json = sess.to_json
		end

		content_type 'application/json'
		return JsonP(json, params)
	end

	post '/stories.json' do
		if ajaxcheck(request)
			if !params['content'].blank? and !params['content'].nil? and !params['token'].blank? and !params['token'].nil?
				hash = {}
				params.each { |param, value|
					if param != 'callback' and param != 'token' and param != 'session' and value != 'null'
						hash[param] = value
					end
				}

				hash['result_token'] = params['token']

				story = Stories.safely.create(hash)

				if story.valid? == false 
					status 400
					json = error_json(400, 'not a valid story object created').to_json
				else
					status 201
					json = story.to_json
				end

			else
				log.info 'content is needed to post a story'
				status 404
				json = error_json(404, 'content is needed to post a story').to_json
			end

		else
			log.info 'cannot access without browser session'
			status 403
			json = error_json(403, 'cannot access without browser session').to_json
		end

		content_type 'application/json'
		return JsonP(json, params)
	end

	get '/stories.json' do
		if ajaxcheck(request)
			if Stories.exists?
				ret_hash = paging_time(Stories, request, params)

				if !ret_hash[:before_url].nil?
					hash = {
						:stories => ret_hash[:objs],
						:before_timestamp => "%s?%s" % [ret_hash[:url], ret_hash[:before_url]]
					}.to_json
				else
					hash = {
						:stories => ret_hash[:objs]
					}.to_json
				end

			else
				log.info 'no stories exist'
				hash = error_json(404, 'no stories created').to_json
			end
		else
			log.info 'cannot access without browser session'
			status 403
			hash = error_json(403, 'cannot access without browser session').to_json
		end

		content_type 'application/json'
		return JsonP(hash, params)
	end

	get '/streets/:borough.json' do
		if ajaxcheck(request)
			hash = {
				:fullcity => $JSON[params['borough']]['fullcity'],
				:state => $JSON[params['borough']]['state'],
				:streets => $JSON[params['borough']]['streets'].keys()
			}.to_json
		else
			log.info 'cannot access without browser session'
			status 403
			hash = error_json(403, 'cannot access without browser session').to_json
		end

		content_type 'application/json'
		return JsonP(hash, params)
	end

	get '/indexes/:borough.json' do
		if ajaxcheck(request)
			if !$JSON['%s_%s' % ['idx', params['borough']]].nil?		
				hash = {
					:idxs => $JSON['%s_%s' % ['idx', params['borough']]]['idxs'],
					:sections => $JSON['%s_%s' % ['idx', params['borough']]]['sections']
				}.to_json
			else
				log.info 'no indexes for borough yet'
				hash = error_json(404, 'no stories created').to_json
			end
		else
			log.info 'cannot access without browser session'
			status 403
			hash = error_json(403, 'cannot access without browser session').to_json
		end

		content_type 'application/json'
		return JsonP(hash, params)
	end

	get '/headlines.json' do
		if ajaxcheck(request)
			if Headlines.exists?
				json = Headlines.all().to_json
			else
				log.info 'no Headlines returned'
				json = error_json(404, 'no headlines available').to_json
			end
		else
			log.info 'cannot access without browser session'
			status 403
			json = error_json(403, 'cannot access without browser session').to_json
		end

		content_type 'application/json'
		return JsonP(json, params)
	end
end

