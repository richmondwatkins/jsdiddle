class ProjectsController < ApplicationController
  before_action :render_project_layout, only: [:index, :edit]

  def index
  end

  def create
    if user_signed_in?
      @project = Project.create(project_params)
      @project.user_id = current_user.id
      @project.save
    else
      @project = Project.create(project_params)
      @project.user_id = 0
    end
    flash[:notice] = "Your Diddle was successfully saved!"
    render  :js => "window.location = '#{edit_project_path(@project)}'"
  end

  def show
    @project = Project.find(params[:id])

    respond_to do |format|
      format.html # sho
      format.json { render json: @project }
    end
  end

  def edit
    @project = Project.find(params[:id])

    respond_to do |format|
      format.html # sho
      format.json { render json: @project }
    end
  end

  def update
      @project = Project.find(params[:id])
    if @project.update_attributes(project_params)
      flash[:notice] = "Your Diddle was successfully updated!"
      render  :js => "window.location = '#{edit_project_path(@project)}'"
    else
      flash.notice = "Your changes could not be saved."
    end
  end

private

  def project_params
      params.require(:project).permit(:name, :html, :javascript, :css)
  end

  def render_project_layout
   render :layout => 'project.html.erb'
  end
end
