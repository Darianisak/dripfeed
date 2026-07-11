# frozen_string_literal: true

require "spec_helper"

RSpec.describe "reddit/homepage?signed_in=true", type: :feature do
  before do
    visit "/?signed_in=true"
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
