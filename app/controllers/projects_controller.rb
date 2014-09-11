require 'securerandom'
class ProjectsController < ApplicationController
  before_action :render_project_layout, only: [:index, :show]

  def index
  end

  def create

    if user_signed_in?
      @project = Project.create(project_params)
      @project.user_id = current_user.id
    else
      @project = Project.create(project_params)
      @project.user_id = 0
    end

    params = SecureRandom.hex(5)
    @project.params = params
    @project.version = 1
    @project.save
    flash[:notice] = "Your Diddle was successfully saved!"
    render  :js => "window.location = '/projects/#{@project.params}/#{@project.version}'"
  end

  def show
    @project = Project.find_by_params_and_version(params[:params], params[:version])
    respond_to do |format|
      format.html # sho
      format.json { render json: @project }
    end
  end

  def update
    if user_signed_in?
      @project = Project.create(project_params)
      @project.user_id = current_user.id
    else
      @project = Project.create(project_params)
      @project.user_id = 0
    end
    @project.params = params[:params]
    @project.version = params[:version].to_i + 1
    @project.save
    flash[:notice] = "Your Diddle was successfully updated!"
    render  :js => "window.location = '/projects/#{@project.params}/#{@project.version}'"
 
  end

private

  def project_params
      params.require(:project).permit(:name, :html, :javascript, :css)
  end

  def render_project_layout
   render :layout => 'project.html.erb'
  end
end
