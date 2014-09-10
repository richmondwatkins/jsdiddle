Rails.application.routes.draw do
  root to: 'projects#index'
  devise_for :users
  resources :users 
  resources :projects

  get 'user/:id/projects', :to => 'users#get_projects'

end
