class Tag < ApplicationRecord
  has_many :todo_tags, dependent: :destroy
  has_many :todos, through: :todo_tags
end
