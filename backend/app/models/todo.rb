class Todo < ApplicationRecord
  default_scope { order(position: :asc) }
end
