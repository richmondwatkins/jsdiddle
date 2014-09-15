Rails.application.routes.draw do
  root to: 'projects#index'
  devise_for :users
  resources :users 
  resources :projects, :only => [:index, :create, :new]

  get 'user/:id/projects', :to => 'users#get_projects'
  get ':params', :to => 'projects#show'
  get 'projects/run' => 'projects#run', as: :run_project
  get 'projects/fork' => 'projects#fork', as: :fork_project

  get  ':params/:version', :to => 'versions#show'
  post 'versions/:params', :to => 'versions#create'
  patch 'versions', :to => 'versions#update'

end
