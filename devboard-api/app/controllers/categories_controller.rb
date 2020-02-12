class CategoriesController < ApplicationController
  before_action :set_category, only: [:show, :update, :destroy]

  # GET /categories
  def index
    @categories = Category.all

    render json: @categories
  end

  # GET /category/:id
  def show
    render json: @category
  end

  private

  def set_category
    @category = Category.find(params[:id])
  end

  def location_params
    params.require(:category).permit(:name)
  end
end