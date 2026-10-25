# frozen_string_literal: true

require "spec_helper"

RSpec.describe "instagram/web/homepage", type: :feature do
  before do
    visit "instagram/mobile/homepage"
  end

  describe "Pre DOM Mutation" do
    context "with an unmodified page" do
      it "has a reels button" do
        expect(page.body).to have_link(href: "/reels/")
      end
    end
  end

  describe "Post DOM Mutation" do
    before do
      page.evaluate_script("Routing()")
    end

    context "with a modified page" do
      it "does not have a reels button" do
        expect(page.body).to have_no_link(href: "/reels/")
      end
    end
  end
end
