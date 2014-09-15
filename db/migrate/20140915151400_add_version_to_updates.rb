class AddVersionToUpdates < ActiveRecord::Migration
  def change
    add_column :updates, :version, :integer
  end
end
