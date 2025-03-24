Rails.application.routes.draw do
  namespace :api do
    resources :todos do
      member do
        patch "update"
      end
    end
  end
end
