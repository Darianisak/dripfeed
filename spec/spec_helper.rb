require 'capybara/rspec'

RSpec.configure do |config|
  config.include Capybara::DSL
  Capybara.default_driver = :selenium
end
