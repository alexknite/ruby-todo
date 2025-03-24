Rails.application.routes.draw do
  namespace :api do
    resources :todos do
      member do
        patch "update"
      end
      member do
        patch :update_position
      end
    end
  end
end
