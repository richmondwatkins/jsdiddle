class VersionsController < ApplicationController

  def create
    if user_signed_in?
      @version = Version.create(update_params)
      @version.user_id = current_user.id
    else
      @version = Version.create(update_params)
      @version.user_id = 0
    end
    @version.params = params[:params]
    @version.version = 1
    @version.save
    flash[:notice] = "Your Diddle was successfully saved!"
    render  :js => "window.location = '#{@version.params}/#{@version.version}'"
  end

  def show
    @version = Version.find_by_params_and_version(params[:params], params[:version])
    respond_to do |format|
      format.html 
      format.json { render json: @version }
    end
  end


   def update
    if user_signed_in?
      @version = Version.create(update_params)
      @version.user_id = current_user.id
    else
      @version = Version.create(update_params)
      @version.user_id = 0
    end
    @version.version = @version.version.to_i + 1
    @version.save
    flash[:notice] = "Your Diddle was successfully updated!"
    render  :js => "window.location = '#{@version.version}'"
 
  end

  def get_versions
    @versions = []
    Version.where(params: params[:params] ).find_in_batches do |version|
      @versions.push(version)
    end
    @versions = @versions.flatten
     respond_to do |format|
      format.html 
      format.json { render json: @versions }
    end
  end


  private

  def update_params
      params.require(:version).permit(:name, :html, :javascript, :css, :library, :version, :params, :project_id)
  end

end

