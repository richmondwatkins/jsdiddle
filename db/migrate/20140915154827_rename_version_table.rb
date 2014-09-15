class RenameVersionTable < ActiveRecord::Migration
  def change
    rename_table :version, :versions
  end
end
