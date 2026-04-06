# frozen_string_literal: true

require "spec_helper"

RSpec.describe "r/user", type: :feature do
  before do
    visit "/reddit/user"
  end

  describe "Pre DOM Mutation" do
    context "with an unmodified post view" do
      it "maintains the search box" do
        expect(page).to have_css("#search-input-chip", visible: :all)
      end

      it "has main content container" do
        expect(page).to have_css("#main-content")
      end

      it "has recommended subreddits" do
        expect(page).to have_css("#left-sidebar-container")
      end

      it "has user information panel" do
        expect(page).to have_css("#right-sidebar-contents")
      end
    end
  end

  describe "Post DOM Mutation" do
    before do
      # Remove the recommended content (left sidebar)
      #
      page.evaluate_script("new RemoveNode('flex-left-nav-container', 'flex-nav-buttons').operate()")
    end

    context "with a modified post view" do
      it "has a search box" do
        expect(page).to have_css("#search-input-chip", visible: :all)
      end

      it "has a main content container" do
        expect(page).to have_css("#main-content")
      end

      it "does have a right-sidebar content" do
        expect(page).to have_css("#right-sidebar-contents")
      end

      it "does not have a recommended subreddit box" do
        expect(page).to have_no_css("#left-sidebar-container")
      end
    end
  end
end
