class TechnologiesController < ApplicationController
  # GET /technologies
  def index
    render json: Technology.all
  end

  # GET /technology/:id
  def show
    render json: Technology.find(params[:id])
  end
end