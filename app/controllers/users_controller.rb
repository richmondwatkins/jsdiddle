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
    respond_to do |format|
      format.html 
      format.json { render json:@projects}
    end
  end



end
