class CreateProjects < ActiveRecord::Migration
  def change
    create_table :projects do |t|
      t.string :name
      t.string :html
      t.string :css
      t.string :javascript

      t.timestamps
    end
  end
end
