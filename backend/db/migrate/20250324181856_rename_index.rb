class RenameIndex < ActiveRecord::Migration[8.0]
  def change
      rename_column :todos, :index, :position
  end
end
