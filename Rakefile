require 'bundler'
Bundler.setup
require 'rake/testtask'

#globals
$APIURL = ENV['NYURL']
$APIKEY = ENV['NYKEY']

desc "Run all tests"
Rake::TestTask.new do |t|
  t.libs << "tests"
  t.test_files = FileList['tests/*_test.rb']
  t.verbose = true
end

namespace :db do
	desc "heroku sync install"
	task :installs do
		sh %{heroku plugins:install http://github.com/pedro/heroku-mongo-sync.git}
	end

	desc "heroku push"
	task :push do
		heroku_app = ENV["APP"]
		mdb_port = ENV["PORT"] || 27017
		mdb_db = ENV["DB"] || 'dev_project'
		sh %{export MONGO_URL=mongodb://localhost:#{mdb_port}/#{mdb_db};heroku mongo:push --app #{heroku_app}}
	end

	desc "heroku pull"
	task :pull do
		heroku_app = ENV["APP"]
		mdb_port = ENV["PORT"] || 27017
		mdb_db = ENV["DB"] || 'dev_project'
		sh %{export MONGO_URL=mongodb://localhost:#{mdb_port}/#{mdb_db};heroku mongo:pull --app #{heroku_app}}
	end

	desc "caps/ensures"
	task :mongs do
		if ENV['RACK_ENV'] == 'production'
			user = ENV['USER']
			password = ENV['PWD']
			exec "mongo staff.mongohq.com:10051/app3264842 -u #{user} -p#{password} scripts/mongs.js"
		else
			sh %{mongo dev_project scripts/mongs.js}
		end
	end

	desc "daily times collection"
	task :times_cron do
		Bundler.require
		Mongoid.logger=Logger.new('/dev/null')
		Dir.glob('./*.rb') do |file|
			require file.gsub(/\.rb/, '')
		end
		include MyHelpers 

		Headlines.collection.remove()
		t = Time.now.strftime("%m/%d")
		$YEAR = Integer(Time.now.strftime("%Y")) - 72
		NY_api = "#{$APIURL}/#{$YEAR}/#{t}/P1.json?api-key=#{$APIKEY}"
		request = Typhoeus::Request.new(NY_api, :method => :get, :timeout => 60000)
		
		hydra = Typhoeus::Hydra.new
		hydra.queue(request)
		hydra.run

		resp = request.response
		results = JSON.parse(resp.body)['results']
		results[0].each { |result| 
			hash = {
				:hdl => result['hdl'],
				:lead => result['lp'],
				:date => result['dat'],
				:ny_url => result['url'],
				:pq_id => result['articleid']
			}
			Headlines.create(hash)
		}
		Logging.log.info "request completed"
	end

end


namespace :app do

	desc "less => css"
	task :less_css do
		puts "less => css"
		Dir.glob('public/less/*.less').sort_by do |file|
			exec "lessc #{file} --include-path=public/bootstrap/less/ \
			> public/css/#{File.basename file, '.less'}.css"
		end
	end

	desc "scss => css"
	task :scss_css do
		puts "scss => css"
		Dir.glob('public/scss/*.scss').sort_by do |file|
			exec "sass --scss #{file}:public/css/#{File.basename file, '.scss'}.css"
		end
	end

	desc "rocco_doc for js files (css in future?); only for js now"
	task :rocco_doc do
		puts "rocco!"
		sh %{cd public/js; rocco -o ../docs modules/*.js app.js main.js}
	end

	desc "jammit man!"
	task :jammit do
		puts "jammit!"
		exec "jammit"
	end

	desc "movement"
	task :moveme do
		puts "moving assets/js to modules"
		sh %{mv public/assets/*.js public/js/modules}
	end

	desc "just move and jam"
	task :movejam do
		sh %{rake app:jammit; rake app:moveme}
	end

	desc "run all rakes in namespace app"
	task :setup do
		sh %{rake app:less_css; rake app:scss_css; rake app:jammit; rake app:moveme}
	end

end

namespace :run do
	desc "Start it up!"
	task :singit do 
		exec 'rerun -p "**/*.{rb,js,css,erb,html,haml,ru,coffee,slim}" -- bundle exec rackup --port 8888 config.ru'
	end
end