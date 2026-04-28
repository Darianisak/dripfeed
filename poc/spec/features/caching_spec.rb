require 'spec_helper'
require 'fileutils'

RSpec.describe 'Client-side dependency caching', type: :feature, js: true do
  let(:har_path) { 'spec/fixtures/hars/third_party_deps.har' }

  before do
    FileUtils.mkdir_p(File.dirname(har_path))
    
    is_replaying = File.exist?(har_path)

    page.driver.with_playwright_page do |playwright_page|
      playwright_page.route_from_har(
        har_path,
        # THE FIX: Use a Regex. String globs are notoriously flaky in the Ruby client.
        url: /httpbin\.org/, 
        update: !is_replaying,
        notFound: is_replaying ? 'abort' : 'fallback'
      )
    end
  end

  it 'loads the client-side dependencies via HAR cache' do
    visit '/'

    # THE FIX: Add an explicit wait. This guarantees Capybara won't kill the test 
    # before Playwright finishes downloading the response and writing the HAR.
    expect(page).to have_content('Status: 403', wait: 10)
  end
end