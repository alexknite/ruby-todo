class Api::TodosController < ApplicationController
  before_action :set_todo, only: %i[ show update_complete update_content update_position destroy ]

  # GET /todos
  def index
    @todos = Todo.all.order(completed: :desc, position: :asc)
    render json: @todos
  end

  # GET /todos/1
  def show
    render json: @todo
  end

  # POST /todos
  def create
    @todo = Todo.new(todo_params)

    if @todo.save
      render json: @todo, status: :created
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /todos/1
  def update_complete
    Todo.transaction do
      if params[:completed] == true
        old_position = @todo.position

        Todo.where("position < ?", old_position).update_all("position = position + 1")

        @todo.update!(completed: true, position: 0)
      else
        @todo.update!(completed: false)
      end
    end
  rescue => e
    render json: { error: e.message }, status: :unprocessable_entity
  end

  def update_content
    if @todo.update(content: params[:content])
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
  end


# DELETE /todos/1
def destroy
  todo = Todo.find(params[:id])
  position_to_remove = todo.position
  todo.destroy!

  # Shift positions of remaining todos down
  Todo.where("position > ?", position_to_remove).update_all("position = position - 1")

  render json: { message: "Todo deleted successfully" }, status: :ok
end


  def update_position
    todo = Todo.find(params[:id])
    new_position = params[:position].to_i

    # Ensure the new position is different
    return render json: todo if new_position == todo.position

    # If moving down (new position is greater), decrement the position of todos in between
    if new_position > todo.position
      Todo.where("position > ? AND position <= ?", todo.position, new_position).each do |t|
        t.update(position: t.position - 1)
      end
    elsif new_position < todo.position
      Todo.where("position < ? AND position >= ?", todo.position, new_position).each do |t|
        t.update(position: t.position + 1)
      end
    end

    # Update the position of the todo itself
    todo.update(position: new_position)

    render json: todo
  end
  private
  # Use callbacks to share common setup or constraints between actions.
  def set_todo
    @todo = Todo.find(params.expect(:id))
  end

  # Only allow a list of trusted parameters through.
  def todo_params
    params.expect(todo: [ :content, :completed, :position ])
  end
end
