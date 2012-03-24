require File.join(File.expand_path(File.dirname(__FILE__)), 'environment.rb')

$stdout.sync = true

puts "Starting in #{Sinatra::Base.environment} mode.."

# ==============
# = App It! =
# ==============
map '/' do
  run Application
end

map '/api' do
  run Api
end
