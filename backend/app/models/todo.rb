class Todo < ApplicationRecord
  default_scope { order(position: :desc) }
end
