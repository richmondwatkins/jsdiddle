class CreateForks < ActiveRecord::Migration
  def change
    create_table :forks do |t|
      t.string :name
      t.string :html
      t.string :css
      t.string :javascript
      t.integer :user_id
      t.string :params
      t.string :library

      t.timestamps
    end
  end
end
