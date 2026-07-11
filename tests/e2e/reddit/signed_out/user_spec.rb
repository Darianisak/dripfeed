# frozen_string_literal: true

require "spec_helper"

RSpec.describe "r/user", type: :feature do
  before do
    visit "/user"
  end

  describe "Pre DOM Mutation" do
    context "with an unmodified post view" do
      it_behaves_like "a page with the default elements visible", "Find anything"
    end
  end

  describe "Post DOM Mutation" do
    before do
      page.evaluate_script("Routing()")
    end

    context "with a modified post view" do
      it_behaves_like "a page with a search bar", "Find anything"
      it_behaves_like "a page with a right sidebar"
      it_behaves_like "a page with main content"
      it_behaves_like "a page with the left sidebar removed"
    end
  end
end
