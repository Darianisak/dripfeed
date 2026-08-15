# frozen_string_literal: true

require "spec_helper"

RSpec.describe "reddit/subreddit", type: :feature do
  before do
    visit "/r/mobile-cta/dismissable"
  end

  describe "Pre DOM Mutation" do
    context "with an unmodified subreddit view" do
      it_behaves_like "a page with main content"

      it "includes the 'View in the Reddit App' drawer" do
        expect(page).to have_css("#xpromo-bottom-sheet")
      end

      it "includes the 'View in Reddit App' copy" do
        expect(page).to have_text("View in Reddit App")
      end
    end
  end

  describe "Post DOM Mutation" do
    before do
      page.evaluate_script("Routing()")
    end

    context "with a modified subreddit view" do
      it_behaves_like "a page with main content"

      it "does not include the 'View in the Reddit App' drawer" do
        expect(page).to have_no_css("#xpromo-bottom-sheet")
      end

      it "does not include the 'View in Reddit App' copy" do
        expect(page).to have_no_text("View in Reddit App")
      end
    end
  end
end
