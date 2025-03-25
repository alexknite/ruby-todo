class Todo < ApplicationRecord
  # Default scope to order by completion status (completed first), then by position
  default_scope { order(completed: :desc, position: :asc) }
end
