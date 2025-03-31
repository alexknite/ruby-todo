class Api::TagsController < ApplicationController
  before_action :set_tag, only: [ :update_name, :destroy ]

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

  def update_name
    if @tag.update(name: params[:name])
      render json: @tag
    else
      render json: @tag.errors, status: :unprocessable_entity
    end
  end

  def destroy
    if @tag
      TodoTag.where(tag_id: @tag.id).destroy_all
      @tag.destroy
      head :no_content
    else
      render json: { error: "Tag not found" }, status: :not_found
    end
  end

  private

  def set_tag
    @tag = Tag.find_by(id: params[:id])
    render json: { error: "Tag not found" }, status: :not_found unless @tag
  end

  def tag_params
    params.require(:tag).permit(:name)
  end
end
