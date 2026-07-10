# frozen_string_literal: true

require "sinatra"
require "sinatra/namespace"

set :views, File.expand_path("views", __dir__)
set :public_folder, File.expand_path("src", __dir__)
set :logging, false

def signed_in?
  @params[:signed_in]
end

namespace "/r" do
  get "/subreddit" do
    partial = signed_in? ? "reddit/signed_in/subreddit" : "reddit/subreddit"
    erb :"#{partial}"
  end

  get "/subreddit/comments" do
    erb :"reddit/post"
  end

  get "/popular" do
    erb :"reddit/popular"
  end
end

get "/" do
  erb :"reddit/homepage"
end

get "/user" do
  erb :"reddit/user"
end

get "/search" do
  erb :"reddit/search"
end
