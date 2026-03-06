require 'capybara/rspec'
require_relative '../sinatra'
require 'debug'

Capybara.app = Sinatra::Application

# Allow requests to localhost and 127.0.0.1
Capybara.server_host = '127.0.0.1'
Capybara.app_host = "http://#{Capybara.server_host}:4567"

RSpec.configure do |config|
  config.include Capybara::DSL
end
