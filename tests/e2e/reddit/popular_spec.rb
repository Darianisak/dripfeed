# frozen_string_literal: true

require "spec_helper"

RSpec.describe "r/popular", type: :feature do
  before do
    visit "/reddit/popular"
  end

  describe "Pre DOM Mutation" do
    context "with unmodified homepage view" do
      it "has a search box" do
        expect(page).to have_css(".search-input", visible: :all)
      end

      it "has main content container" do
        expect(page).to have_css("#main-content")
      end

      it "has recommended subreddits" do
        expect(page).to have_css("#left-sidebar-container")
      end

      it "has popular subreddits sidebar" do
        expect(page).to have_css("#right-sidebar-contents")
      end
    end
  end

  describe "Post DOM Mutation" do
    before do
      page.evaluate_script("new RemoveNode('subgrid-container', 'left-sidebar-container').operate()")
    end

    context "with a modified homepage view" do
      it "has a search box" do
        expect(page).to have_css(".search-input", visible: :all)
      end

      it "has no main content" do
        expect(page).to have_no_css("#main-content")
      end

      it "has no recommended subreddits sidebar" do
        expect(page).to have_no_css("#left-sidebar-container")
      end

      it "has no popular subreddits sidebar" do
        expect(page).to have_no_css("#right-sidebar-contents")
      end
    end
  end
end
