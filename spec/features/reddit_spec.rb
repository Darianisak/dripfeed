require 'spec_helper'

RSpec.describe 'Homepage', type: :feature do
  it 'displays the welcome message' do
    visit '/'
    debugger
    expect(page).to have_content('Welcome to Capybara Testing')
  end
end