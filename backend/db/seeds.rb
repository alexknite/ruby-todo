# Clear existing data
TodoTag.destroy_all
Tag.destroy_all
Todo.destroy_all

# Create some tags
tag1 = Tag.create!(name: "Work")
tag2 = Tag.create!(name: "Personal")
tag3 = Tag.create!(name: "Urgent")

# Create some todos
todo1 = Todo.create!(content: "Finish project", completed: false, position: 0)
todo2 = Todo.create!(content: "Buy groceries", completed: false, position: 1)
todo3 = Todo.create!(content: "Book doctor appointment", completed: true, position: 2)

# Assign tags to todos
TodoTag.create!(todo: todo1, tag: tag1)
TodoTag.create!(todo: todo1, tag: tag3)
TodoTag.create!(todo: todo2, tag: tag2)
TodoTag.create!(todo: todo3, tag: tag1)
