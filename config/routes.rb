Rails.application.routes.draw do
  root to: 'projects#index'
  devise_for :users
  resources :users 
  resources :projects, :only => [:index, :create, :new]

  get '/projects/all', :to => 'projects#show_all'
  get '/projects/get_all', :to => 'projects#get_all'
  get 'user/:id/projects', :to => 'users#get_projects'
  get ':params', :to => 'projects#show'
  get 'projects/run' => 'projects#run', as: :run_project
  get 'projects/fork' => 'projects#fork', as: :fork_project
  get 'projects/:projectId', :to => 'projects#get_versions'

  get '/versions/:params', :to => 'versions#get_versions'
  get  ':params/:version', :to => 'versions#show'
  post 'versions/:params', :to => 'versions#create'
  patch 'versions', :to => 'versions#update'
end
