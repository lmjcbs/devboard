class Category < ApplicationRecord
  has_many :positions
  has_many :locations, through: :positions
  has_many :technologies, through: :positions
end