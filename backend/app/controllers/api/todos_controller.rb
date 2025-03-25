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
    if @todo.update(completed: params[:completed])
      render json: @todo
    else
      render json: @todo.errors, status: :unprocessable_entity
    end
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
    @todo.destroy!
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
  # Only allow a list of trusted parameters through.
  def todo_params
    params.expect(todo: [ :content, :completed, :position ])
  end
end
