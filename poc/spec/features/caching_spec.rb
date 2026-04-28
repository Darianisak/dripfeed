require 'spec_helper'
require 'fileutils'

RSpec.describe 'Client-side dependency caching', type: :feature, js: true do
  let(:har_path) { 'spec/fixtures/hars/third_party_deps.har' }

  before do
    FileUtils.mkdir_p(File.dirname(har_path))

    # The VCR Logic: Access the underlying Playwright Page object
    page.driver.with_playwright_page do |playwright_page|
      playwright_page.route_from_har(
        har_path,
        url: '**/*', # Intercept all requests (or scope it to your 3rd-party domain)
        update: !File.exist?(har_path) # True = Record network. False = Serve from cache.
      )
    end
  end

  it 'loads the client-side dependencies via HAR cache' do
    visit '/'

    # Capybara automatically waits for the client-side fetch to resolve and update the DOM
    expect(page).to have_content('Status: 403')
  end
end