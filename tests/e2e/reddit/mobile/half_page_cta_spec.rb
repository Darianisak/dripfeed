# frozen_string_literal: true

require "spec_helper"

RSpec.describe "reddit/subreddit", type: :feature do
  before do
    visit "/r/mobile-cta/half-page-blocking"
  end

  describe "Pre DOM Mutation" do
    context "with an unmodified subreddit view" do
      it_behaves_like "a page with main content"

      it "includes the Half Page CTA" do
        expect(page).to have_css("#configured-xpromo-mweb3x_mid_funnel_blocking_v1_30s")
      end

      it "includes the 'Reddit App' copy" do
        expect(page).to have_text("Get the app to keep using Reddit")
      end

      it "has a scroll lock class" do
        expect(page).to have_css(".rpl-scroll-lock")
      end
    end
  end

  describe "Post DOM Mutation" do
    before do
      page.evaluate_script("Routing()")
      # We need to fire this twice; I'm guessing because client side JS in our
      # mocks may be restoring the CTA before test execution.
      page.evaluate_script("Routing()")
    end

    context "with a modified subreddit view" do
      it_behaves_like "a page with main content"

      it "does not include the Half Page CTA" do
        expect(page).to have_no_css("#configured-xpromo-mweb3x_mid_funnel_blocking_v1_30s")
      end

      it "does not include the 'Reddit App' copy" do
        expect(page).to have_no_text("Get the app to keep using Reddit")
      end

      it "does not have a scroll lock class" do
        expect(page).to have_no_css(".rpl-scroll-lock")
      end
    end
  end
end
