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
    respond_to do |format|
      format.html 
      format.json { render json:@user.projects}
    end
  end



end
