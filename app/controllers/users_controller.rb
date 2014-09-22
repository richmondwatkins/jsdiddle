class UsersController < ApplicationController
  before_filter :authenticate_user!

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])

  end

  def get_projects
    @user = User.find(params[:id])
    @projects = @user.projects.order('id desc').page(params[:page]).per(4)
    @allVersions = []
    @projects.each do |project|
      @project = Hash.new
      @project["project"] = project
      @project["versions"] =  project.versions
      @allVersions << @project
    end
    respond_to do |format|
      format.html 
      format.json { render json:@allVersions}
    end
  end

  def current_user_check
    @result = false 
    if params[:id].to_i == current_user.id
      @result = true
    end

    respond_to do |format|
      format.html 
      format.json { render json:@result}
    end
  end

end
