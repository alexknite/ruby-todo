class AddIndexToTodos < ActiveRecord::Migration[8.0]
  def change
    add_column :todos, :index, :integer
  end
end
