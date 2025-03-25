class RenameTodoNameToName < ActiveRecord::Migration[8.0]
  def change
    rename_column :todos, :name, :content
  end
end
