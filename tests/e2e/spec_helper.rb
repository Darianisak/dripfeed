# frozen_string_literal: true

require "capybara/rspec"
require "selenium-webdriver"
require_relative "../../sinatra"
require "debug"

Capybara.app = Sinatra::Application

Capybara.server_host = "127.0.0.1"
Capybara.server_port = 9887 # Capybara will use this port to run your app for tests
Capybara.app_host = "http://#{Capybara.server_host}:#{Capybara.server_port}"

Capybara.default_driver = :selenium_headless

RSpec.configure do |config|
  config.include Capybara::DSL

  config.after(:each, type: :feature) do
    Capybara.reset_sessions!
  end
end
