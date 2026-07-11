# frozen_string_literal: true

require "spec_helper"

RSpec.describe "reddit/post?signed_in=true", type: :feature do
  before do
    visit "/r/subreddit/comments?signed_in=true"
  end

  describe "Pre DOM Mutation" do
    context "with an unmodified post view" do
      it_behaves_like "a page with the default elements visible", "Search in r/auckland", true
    end
  end

  describe "Post DOM Mutation" do
    before do
      page.evaluate_script("Routing()")
    end

    context "with a modified post view" do
      it_behaves_like "a page with a search bar", "Search in r/auckland"
      it_behaves_like "a page with main content"
      it_behaves_like "a page with the sidebars removed", true
    end
  end
end
