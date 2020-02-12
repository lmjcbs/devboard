class PositionSerializer < ActiveModel::Serializer
  attributes :id, :title, :company, :description, :salaryGBP, :experienceRequired, :location, :category, :technology

  def experienceRequired
    self.object.experience_required
  end

  def salaryGBP
    self.object.salary_gbp
  end

  def location
    self.object.location.city
  end

  def category
    self.object.category.name
  end

  def technology
    self.object.technology.name
  end
end