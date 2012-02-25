require 'bundler'
Bundler.setup
require 'rake/testtask'

desc "Run all tests"
Rake::TestTask.new do |t|
  t.libs << "tests"
  t.test_files = FileList['tests/*_test.rb']
  t.verbose = true
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

	desc "run all rakes in namespace app"
	task :setup do
		sh %{rake app:less_css; rake app:scss_css; rake app:rocco_doc; rake app:jammit; rake app:moveme}
	end

end

namespace :run do
	desc "Start it up!"
	task :singit do 
		exec 'rerun -p "**/*.{rb,js,css,scss,sass,erb,html,haml,ru,coffee,slim,less}" -- bundle exec rackup --port 8888 config.ru'
	end
end