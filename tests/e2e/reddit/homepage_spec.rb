# frozen_string_literal: true

require "spec_helper"

RSpec.describe "reddit/homepage", type: :feature do
  before do
    visit "/"
  end

  describe "Pre DOM Mutation" do
    context "with unmodified homepage view" do
      it_behaves_like "a page with the default elements visible"
    end
  end

  describe "Post DOM Mutation" do
    before do
      page.evaluate_script("Routing()")
    end

    context "with a modified homepage view" do
      it_behaves_like "a page with a search bar"
      it_behaves_like "a page with the body content removed"
    end
  end
end
