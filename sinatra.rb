# frozen_string_literal: true

require "sinatra"
require "sinatra/namespace"

set :views, File.expand_path("views", __dir__)
set :public_folder, File.expand_path("ext", __dir__)

namespace "/reddit" do
  get "/homepage" do
    erb :"reddit/homepage"
  end

  get "/post" do
    erb :"reddit/post"
  end

  get "/subreddit" do
    erb :"reddit/subreddit"
  end
end
