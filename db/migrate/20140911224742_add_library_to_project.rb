class AddLibraryToProject < ActiveRecord::Migration
  def change
    add_column :projects, :library, :string
  end
end
