# frozen_string_literal: true

require "spec_helper"

RSpec.describe "reddit/subreddit?signed_in=true", type: :feature do
  before do
    visit "/r/subreddit?signed_in=true"
  end

  describe "Pre DOM Mutation" do
    context "with an unmodified subreddit view" do
      it_behaves_like "a page with the default elements visible", "Search in r/Wellington", true
    end
  end

  describe "Post DOM Mutation" do
    before do
      page.evaluate_script("Routing()")
    end

    context "with a modified subreddit view" do
      it_behaves_like "a page with a search bar", "Search in r/Wellington"
      it_behaves_like "a page with main content"
      it_behaves_like "a page with the sidebars removed", true
    end
  end
end
