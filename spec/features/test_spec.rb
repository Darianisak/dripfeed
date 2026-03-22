# frozen_string_literal: true

require "spec_helper"

RSpec.describe "Fixture Concept", type: :feature do
  describe "removeNode" do
    before do
      visit "/test"
    end

    context "with RemoveNode.operate() not called." do
      it "ensures the welcome message is present" do
        expect(page).to have_text "Hello from the Test View!"
      end

      it "ensures the paragraph message is present" do
        expect(page).to have_text("This is a paragraph.")
      end

      it "ensures the span-div message is present" do
        expect(page).to have_text("A span inside a div.")
      end
    end

    context "with RemoveNode.operate() called." do
      before do
        # Here's the PoC call - using our tooling to programmaticaly remove chunks of the DOM tree.
        page.evaluate_script("new RemoveNode('span-content', 'paragraph-content').operate()")
      end

      it "ensures the welcome message is not removed" do
        expect(page).to have_text "Hello from the Test View!"
      end

      it "ensures the paragraph message is removed" do
        expect(page).to have_no_text("This is a paragraph.")
      end

      it "ensures the span-div message is removed" do
        expect(page).to have_no_text("A span inside a div.")
      end
    end
  end
end
