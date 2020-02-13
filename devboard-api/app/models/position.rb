class Position < ApplicationRecord
  belongs_to :location
  belongs_to :category
  belongs_to :technology

  def category=(category)
    write_attribute(:category_id, Category.where(:name => category).first_or_create.id)
  end

  def location=(location)
    write_attribute(:location_id, Location.where(:city => location).first_or_create.id)
  end

  def technology=(technology)
    write_attribute(:technology_id, Technology.where(:name => technology).first_or_create.id)
  end
end