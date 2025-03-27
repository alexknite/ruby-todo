Rails.application.routes.draw do
  namespace :api do
    resources :todos do
      member do
        patch :update_complete
        patch :update_content
        patch :update_position
      end
    end

    resources :tags, only: [ :index, :create ]
    resources :todo_tags, only: [ :create, :destroy ]

    delete "todo_tags", to: "todo_tags#destroy"
    delete "tags/:id", to: "tags#destroy", as: "delete_tag"
  end
end
