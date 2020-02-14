# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

categories = Category.create([{ name: 'Frontend'}, { name: 'Backend' }, { name: 'Full-stack' }, { name: 'Cloud' }, { name: 'Data-science' }, { name: 'Dev-ops' }])
locations = Location.create([{ city: 'London' }, { city: 'New York'}, { city: 'Berlin' }, { city: 'Paris' }])
technologies = Technology.create([{ name: 'JavaScript' }, { name: 'Python' }, { name: 'Ruby' }, { name: 'React' }, { name: 'NodeJS' }])
position1 = Position.create(location_id: 1, category_id: 1, technology_id: 4, title: 'Lead Frontend Developer', company: 'Amazon', salary_gbp: '150000', experience_required: '5 years' , description: 'We are searching for our next lead frontend developer.')
position1 = Position.create(location_id: 3, category_id: 3, technology_id: 1, title: 'Junior Developer', company: 'Google', salary_gbp: '600000', experience_required: '6 months' , description: 'Come Join the team as a junior developer.')
position3 = Position.create(location_id: 2, category_id: 4, technology_id: 2, title: 'Senior Cloud Engineer', company: 'Facebook', salary_gbp: '124000', experience_required: '4 years' , description: 'Looking for an experienced cloud engineer to join the team.')
# position3 = Position.create()
# position4 = Position.create()
# position5 = Position.create()