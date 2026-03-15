# frozen_string_literal: true

require "spec_helper"

RSpec.describe "Index", type: :feature do
  it "displays the welcome message" do
    visit "/"
    expect(page).to have_text("Hello world!")
  end
end

RSpec.describe "Fixture Concept", type: :feature do
  before do
    visit "/test"
  end

  context "has_text" do
    it "ensures that expected welcome message is present" do
    end
  end

  context "removeNode test"
end
