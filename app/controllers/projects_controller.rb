class ProjectsController < ApplicationController
  before_action :render_project_layout, only: [:index]
  def index
  end

  def create
    if user_signed_in?
      @project = Project.new(project_params)
      @project.user_id = current_user.id
    else
      @project = Project.new(project_params)
      @project.user_id = 0
    end
      respond_to do |format|
        if @project.save
          format.json { render json: @project, status: :created, location: @project }
          format.html { redirect_to(@project, :notice => 'Project was successfully created!')}
        else
          format.html { flash.now[:notice]="Save proccess coudn't be completed!" }
          # format.json { render json: @project.errors, status: :unprocessable_entity}
        end
      end
  end

  def show
    @project = Project.find(params[:id])

    respond_to do |format|
      format.html # sho
      format.json { render json: @project}
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
