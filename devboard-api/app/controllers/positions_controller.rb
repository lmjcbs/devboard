class PositionsController < ApplicationController
  before_action :set_position, only: [:show, :update, :destroy]

  # GET /positions
  def index
    render json: Position.all
  end

  # POST /positions
  def create
    @position = Position.new(position_params)
    if @position.save
      render json: @position, status: :created
    else
      render json: @position.errors, status: :unprocessable_entity
    end
  end

  # GET /position/:id
  def show
    render json: @position
  end

  # PATCH /position/:id
  def update
    if @position.update(position_params)
      render json: @position
    else
      render json: @position.errors, status: :unprocessable_entity
    end
  end

  # DELETE /position/:id
  def destroy
    @position.destroy
  end

  private

  def set_position
    @position = position.find(params[:id])
  end

  def position_params
    params.permit(:title, :company, :description, :category, :location, :technology, :salary_gbp, :experience_required)
  end
end