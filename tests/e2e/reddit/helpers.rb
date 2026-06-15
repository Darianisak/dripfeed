# frozen_string_literal: true

RSpec.shared_examples "a page with main content" do
  it "has the 'subgrid-container' selector" do
    expect(page).to have_css("#subgrid-container")
  end

  # We won't check left-sidebar-container, as that gets removed with the
  # sidebar removal calls.

  it "includes the main content container" do
    expect(page).to have_css("#main-content")
  end
end

RSpec.shared_examples "a page with the main content removed" do
  it "does not include the main content container" do
    expect(page).not_to have_css("#main-content")
  end
end

RSpec.shared_examples "a page with a left sidebar" do
  it "has the 'flex-left-nav-container' selector" do
    expect(page).to have_css("#flex-left-nav-container")
  end

  it "has the 'flex-nav-buttons' selector" do
    expect(page).to have_css("#flex-nav-buttons")
  end

  it "includes the left-sidebar-container" do
    expect(page).to have_css("#left-sidebar-container")
  end
end

RSpec.shared_examples "a page with the left sidebar removed" do
  it "does not include the left-sidebar-container" do
    expect(page).not_to have_css("#left-sidebar-container")
  end
end

RSpec.shared_examples "a page with a right sidebar" do
  it "has the 'right-sidebar-contents' selector" do
    expect(page).to have_css("#right-sidebar-contents")
  end

  it "has the 'right-rail-experience-root' selector" do
    # This is an <aside> element, and so isn't visible.
    expect(page).to have_css("#right-rail-experience-root", visible: false)
  end

  it "includes the right-sidebar-container" do
    expect(page).to have_css("#right-sidebar-container")
  end
end

RSpec.shared_examples "a page with the right sidebar removed" do
  it "does not include the right-sidebar-container" do
    expect(page).not_to have_css("#right-sidebar-container")
  end
end

RSpec.shared_examples "a page with a search bar" do |placeholder|
  it "has the expected label" do
    placeholder_text = placeholder.nil? ? "Find anything" : placeholder
    expect(page).to have_field(placeholder: placeholder_text, visible: :all)
  end

  it "has the expected search selector" do
    expect(page).to have_css(".search-input", visible: :all)
  end
end

RSpec.shared_examples "a page with the default elements visible" do |placeholder|
  it_behaves_like "a page with a search bar", placeholder
  it_behaves_like "a page with a left sidebar"
  it_behaves_like "a page with a right sidebar"
  it_behaves_like "a page with main content"
end

RSpec.shared_examples "a page with the sidebars removed" do
  it_behaves_like "a page with the left sidebar removed"
  it_behaves_like "a page with the right sidebar removed"
end

RSpec.shared_examples "a page with the body content removed" do
  it_behaves_like "a page with the main content removed"
  it_behaves_like "a page with the sidebars removed"
end
