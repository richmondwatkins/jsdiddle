class ProjectsController < ApplicationController

  def create
    if user_signed_in?
      @project = Project.create(fork_params)
      @project.user_id = current_user.id
    else
      @project = Project.create(fork_params)
      @project.user_id = 0
    end

    if @project.name == ''
      @project.name = random_name_generator
    end

    params = SecureRandom.hex(5)
    @project.params = params
    @project.save
    flash[:notice] = "Your Diddle was successfully saved!"
    render  :js => "window.location = '#{@project.params}'"
  end

private

  def fork_params
      params.require(:fork).permit(:name, :html, :javascript, :css, :library)
  end

end