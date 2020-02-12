class CreatePositions < ActiveRecord::Migration[6.0]
  def change
    create_table :positions do |t|
      t.integer :location_id
      t.integer :category_id
      t.integer :technology_id
      t.string :title
      t.string :company
      t.string :description
      t.string :salary_gbp
      t.string :experience_required
      t.timestamps
    end
  end
end
