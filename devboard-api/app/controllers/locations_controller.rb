class LocationsController < ApplicationController
  # GET /locations
  def index
    render json: Location.all
  end

  # GET /location/:id
  def show
    render json: Location.find(params[:id])
  end
end