class ChangeVersionColumnType < ActiveRecord::Migration
  def change
    change_column :versions, :version, :string
  end
end
