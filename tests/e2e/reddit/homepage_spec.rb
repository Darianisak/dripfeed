# frozen_string_literal: true

require "spec_helper"

RSpec.describe "reddit/homepage", type: :feature do
  before do
    visit "/"
  end

  describe "Pre DOM Mutation" do
    context "with unmodified homepage view" do
      it "has a search box" do
        expect(page).to have_field(placeholder: "Find anything")
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
      page.evaluate_script("Routing()")
    end

    context "with a modified homepage view" do
      it "has a search box" do
        expect(page).to have_field(placeholder: "Find anything")
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
