class Location < ApplicationRecord
  has_many :positions
  has_many :categories, through: :positions
  has_many :technologies, through: :positions
end