class CreateTodos < ActiveRecord::Migration[8.0]
  def change
    create_table :todos do |t|
      t.string :todo_name
      t.boolean :completed

      t.timestamps
    end
  end
end
