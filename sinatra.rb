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
    erb :"#{signed_in? ? 'reddit/signed_in/subreddit' : 'reddit/signed_out/subreddit'}"
  end

  get "/subreddit/comments" do
    erb :"#{signed_in? ? 'reddit/signed_in/post' : 'reddit/signed_out/post'}"
  end

  get "/popular" do
    erb :"#{signed_in? ? 'reddit/signed_in/popular' : 'reddit/signed_out/popular'}"
  end
end

get "/" do
  erb :"#{signed_in? ? 'reddit/signed_in/homepage' : 'reddit/signed_out/homepage'}"
end

get "/user" do
  erb :"#{signed_in? ? 'reddit/signed_in/user' : 'reddit/signed_out/user'}"
end

get "/search" do
  erb :"#{signed_in? ? 'reddit/signed_in/search' : 'reddit/signed_out/search'}"
end
