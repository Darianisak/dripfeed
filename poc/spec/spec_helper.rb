require 'rspec'
require 'capybara/rspec'
require 'capybara/playwright'
require_relative '../app'

Capybara.app = Sinatra::Application
Capybara.server_port = 54321

Capybara.register_driver :playwright_firefox do |app|
  Capybara::Playwright::Driver.new(app, browser_type: :firefox, headless: true)
end

# Set the default JS driver to our new Playwright Firefox driver
Capybara.javascript_driver = :playwright_firefox