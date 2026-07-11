# frozen_string_literal: true

require "spec_helper"

RSpec.describe "r/search?signed_in=true", type: :feature do
  before do
    visit "/search?signed_in=true"
  end

  describe "Pre DOM Mutation" do
    context "with an unmodified post view" do
      it_behaves_like "a page with the default elements visible", nil, true
    end
  end

  describe "Post DOM Mutation" do
    before do
      page.evaluate_script("Routing()")
    end

    context "with a modified post view" do
      it_behaves_like "a page with a search bar"
      it_behaves_like "a page with main content"
      it_behaves_like "a page with the sidebars removed", true
    end
  end
end
