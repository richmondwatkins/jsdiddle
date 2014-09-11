class ProjectsController < ApplicationController
  before_action :render_project_layout, only: [:index, :edit]

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
    # respond_to do |format|
    #   format.html {render la}
    #   format.json { render json: @project }
    # end
    render :layout => 'project.html.erb', :js => "window.location = '#{edit_project_path(@project)}'"
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

private

  def project_params
      params.require(:project).permit(:name, :html, :javascript, :css)
  end

  def render_project_layout
   render :layout => 'project.html.erb'
  end
end
