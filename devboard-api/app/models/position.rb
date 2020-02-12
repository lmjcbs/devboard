class Position < ApplicationRecord
  belongs_to :location
  belongs_to :category
  belongs_to :technology
end