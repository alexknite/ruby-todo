Rails.application.routes.draw do
  namespace :api do
    resources :todos do
      member do
        patch :update_complete
      end
      member do
        patch :update_content
      end
      member do
        patch :update_position
      end
    end
  end
end
