# frozen_string_literal: true

require "spec_helper"

RSpec.describe "reddit/subreddit", type: :feature do
  before do
    visit "/r/mobile-cta/full-page-blocking"
  end

  describe "Pre DOM Mutation" do
    context "with an unmodified subreddit view" do
      it_behaves_like "a page with main content"

      it "includes the Full Page CTA" do
        expect(page).to have_css("#configured-xpromo-mweb3x_feeds_blocking_xpromo_lo_fullscreen")
      end

      it "includes the 'Reddit App' copy" do
        expect(page).to have_text("Get the best of Reddit")
      end

      it "has a hidden overflow-y" do
        expect(page.find("body")).to match_style("overflow" => "hidden")
      end
    end
  end

  describe "Post DOM Mutation" do
    before do
      page.evaluate_script("Routing()")
      # See `./half_page_cta_spec.rb`
      page.evaluate_script("Routing()")
    end

    context "with a modified subreddit view" do
      it_behaves_like "a page with main content"

      it "does not include the Full Page CTA" do
        expect(page).to have_no_css("#configured-xpromo-mweb3x_feeds_blocking_xpromo_lo_fullscreen")
      end

      it "does not include the 'Reddit App' copy" do
        expect(page).to have_no_text("Get the best of Reddit")
      end

      it "does not have a hidden overflow-y" do
        expect(page).to have_no_css("body", style: { "overflow" => "hidden" })
      end
    end
  end
end
