# frozen_string_literal: true

require "sinatra"
set :views, File.expand_path("views", __dir__)
set :public_folder, File.expand_path("ext", __dir__)

get "/test" do
  erb :test
end
