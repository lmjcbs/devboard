class TechnologiesController < ApplicationController
  before_action :set_technology, only: [:show, :update, :destroy]

  # GET /technologies
  def index
    @technologies = Technology.all

    render json: @technologies
  end

  # POST /technologies
  def create
    @technology = Technology.new(location_params)

    if @technology.save
      render json: @technology, status: :created
    else
      render json: @technology.errors, status: :unprocessable_entity
    end
  end

  # GET /technology/:id
  def show
    render json: @technology
  end

  # PATCH /technology/:id
  def update
    if @technology.update(technology_params)
      render json: @technology
    else
      render json: @technology.errors, status: :unprocessable_entity
    end
  end

  # DELETE /technology/:id
  def destroy
    @technology.destroy
  end

  private

  def set_technology
    @technology = Technology.find(params[:id])
  end

  def location_params
    params.require(@technology).permit(:name)
  end
end