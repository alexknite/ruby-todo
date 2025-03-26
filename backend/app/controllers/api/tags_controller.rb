class Api::TagsController < ApplicationController
  def index
    render json: Tag.all
  end

  def create
    tag = Tag.new(tag_params)
    if tag.save
      render json: tag, status: :created
    else
      render json: tag.errors, status: :unprocessable_entity
    end
  end

  def destroy
    tag = Tag.find_by(id: params[:id])

    if tag
      TodoTag.where(tag_id: tag.id).destroy_all

      tag.destroy

      head :no_content
    else
      render json: { error: "Tag not found" }, status: :not_found
    end
  end

  private

  def tag_params
    params.require(:tag).permit(:name)
  end
end
