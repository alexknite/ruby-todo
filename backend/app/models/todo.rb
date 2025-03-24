class Todo < ApplicationRecord
  default_scope { order(index: :asc) }
end
