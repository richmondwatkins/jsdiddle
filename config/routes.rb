Rails.application.routes.draw do
  root to: 'projects#index'
  devise_for :users
  resources :users 
  resources :projects, :only => [:index, :create, :new]

  get 'user/:id/projects', :to => 'users#get_projects'
  get 'projects/:params/:version', :to => 'projects#show'
  post 'projects/:params/update/:version', :to => 'projects#update'
  get 'projects/run' => 'projects#run', as: :run_project
  get 'projects/fork' => 'projects#fork', as: :fork_project

end
