class Api::TodoTagsController < ApplicationController
  def create
    todo_tag = TodoTag.new(todo_tag_params)
    if todo_tag.save
      render json: todo_tag, status: :created
    else
      render json: todo_tag.errors, status: :unprocessable_entity
    end
  end

  def destroy
    todo_tag = TodoTag.find_by(todo_id: params[:todo_id], tag_id: params[:tag_id])

    if todo_tag
      todo_tag.destroy
      head :no_content
    else
      render json: { error: "Not found" }, status: :not_found
    end
  end

  private

  def todo_tag_params
    params.require(:todo_tag).permit(:todo_id, :tag_id)
  end
end
