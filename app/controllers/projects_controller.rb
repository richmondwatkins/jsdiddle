require 'securerandom'
class ProjectsController < ApplicationController

  def index
  end

  def run
  end

  def fork
  end

  def new
  end

  def destroy
    @project = Project.destroy(params[:id])
    respond_to do |format|
      format.html 
      format.json { render json: @project}
    end
  end

  def show_all
    @projects = Project.all
  end

  def get_all
    @projects = Project.order('id desc').page(params[:page]).per(4)
    @allProjects = []
    @projects.each do |project|
      @project = Hash.new
      @project["owner"] = project.user
      @project["project"] = project
      @allProjects << @project
    end
     respond_to do |format|
      format.html 
      format.json { render json: @allProjects}
    end
  end
  
  def create

    if user_signed_in?
      @project = Project.create(project_params)
      @project.user_id = current_user.id
    else
      @project = Project.create(project_params)
      @project.user_id = 0
    end

    if @project.name == ''
      @project.name = random_name_generator
    end

    params = SecureRandom.hex(5)
    @project.params = params
    @project.save
    flash[:notice] = "Your Diddle was successfully saved!"
    render  :js => "window.location = '/#{@project.params}'"
  end

  def show
    @project = Project.find_by_params(params[:params])
    respond_to do |format|
      format.html 
      format.json { render json: @project }
    end
  end


  def get_versions
    @project = Project.find(params[:projectId])
    respond_to do |format|
      format.html 
      format.json { render json:@project.versions}
    end
  end 

private

  def project_params
      params.require(:project).permit(:name, :html, :javascript, :css, :library)
  end

  def random_name_generator
   words = ["Diddle ", "Project ", "Diddly Doo ", "Code Master ", "Ninja My Diddle "]
   words[rand(words.length)]+(rand(900)+100).to_s()
  end

end
