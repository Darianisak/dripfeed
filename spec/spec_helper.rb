require 'capybara/rspec'

RSpec.configure do |config|
  config.include Capybara::DSL
  Capybara.default_driver = :selenium
end


require 'webmock'
require 'vcr'

VCR.configure do |config|
  config.cassette_library_dir = "fixtures/vcr_cassettes"
  config.hook_into :webmock
end