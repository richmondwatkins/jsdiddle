class AddVersionAndIdentifierToProjects < ActiveRecord::Migration
  def change
    add_column :projects, :version, :integer
    add_column :projects, :params, :string
  end
end
