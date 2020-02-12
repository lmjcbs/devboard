Rails.application.routes.draw do
  resources :categories
  resources :locations
  resources :positions
  resources :technologies 
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
