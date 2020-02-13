class TechnologySerializer < ActiveModel::Serializer
  attributes :id, :name, :positions
  
  def positions
    self.object.positions.map do |position|
      {title: position.title, 
       company: position.company,
       description: position.description,
       salaryGBP: position.salary_gbp,
       experienceRequired: position.experience_required,
       location: position.location.city,
       category: position.category.name,
       technology: position.technology.name}
    end
  end 
end