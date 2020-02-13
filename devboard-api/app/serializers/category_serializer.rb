class CategorySerializer < ActiveModel::Serializer
  attributes :id, :name, :positions
  
  def positions
    self.object.positions.map do |position|
      {title: position.title,
       company: position.company,
       description: position.description,
       salaryGBP: position.salary_gbp,
       experienceRequired: position.experience_required,
       technology: position.technology.name,
       location: position.location.city,
       category: position.category.name}
    end
  end 
end