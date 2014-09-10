feature "Saving a Project" do

  scenario "Visitors can create and save projects" do
    visit root_path
    expect(page).to have_link("Save")
    expect(page).to have_link("Run")
    # click_on ("Save")
    click_link_or_button("Save")
    # wait_for_ajax
    expect(page).to have_content("Save")
    # expect(current_path).to eq projects_path
  end
end
