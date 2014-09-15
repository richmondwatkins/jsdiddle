class RenameUpdatesTable < ActiveRecord::Migration
  def change
    rename_table :updates, :version
  end
end
