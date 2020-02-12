class CategoriesController < ApplicationController
  # GET /categories
  def index
    render json: Category.all
  end

  # GET /category/:id
  def show
    render json: Category.find(params[:id])
  end
end