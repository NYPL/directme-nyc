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

	desc "jammit time"
	task :jammit do
		jammit
	end

	desc "rocco_doc for js files (css in future?); only for js now"
	task :rocco_doc do
		sh %{cd public/js; rocco -o ../docs modules/*.js app.js main.js}
	end

	desc "less => css"
	task :to_css do
		Dir.glob('public/less/*.less').sort_by do |file|
			exec "lessc #{file} --include-path=public/bootstrap/less/ \
			> public/css/#{File.basename file, '.less'}.css"
		end
		Dir.glob('public/scss/*.scss').sort_by do |file|
			exec "sass --scss #{file}:public/css/#{File.basename file, '.scss'}.css"
		end
	end

	task :setup => Rake::Task.tasks
end

namespace :run do
	desc "Start it up!"
	task :singit do 
		exec 'rerun -p "**/*.{rb,js,css,scss,sass,erb,html,haml,ru,coffee,slim,less}" -- bundle exec rackup --port 8888 config.ru'
	end
end