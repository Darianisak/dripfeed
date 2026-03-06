require 'sinatra'
set :views, File.expand_path('../views', __FILE__)

get '/' do
  'Hello world!'
end

get '/reddit' do
    puts "helloWorld"
    erb :reddit
end
