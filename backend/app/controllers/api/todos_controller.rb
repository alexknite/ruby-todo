class Api::TodosController < ApplicationController
  before_action :set_todo, only: %i[ show update destroy ]

# GET /todos
def index
  @todos = Todo.order(position: :asc)
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
  def update
    if @todo.update(todo_params)
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

    if new_position > todo.position
      Todo.where("position > ? AND position <= ?", todo.position, new_position).each do |t|
        t.update(position: t.position - 1)
      end
    elsif new_position < todo.position
      Todo.where("position < ? AND position >= ?", todo.position, new_position).each do |t|
        t.update(position: t.position + 1)
      end
    end

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
      params.expect(todo: [ :todo_name, :completed, :position ])
    end
end
