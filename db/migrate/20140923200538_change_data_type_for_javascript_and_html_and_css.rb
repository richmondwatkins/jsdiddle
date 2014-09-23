class ChangeDataTypeForJavascriptAndHtmlAndCss < ActiveRecord::Migration
  def change
    change_column :projects, :javascript, :text
    change_column :projects, :css, :text
    change_column :projects, :html, :text

    change_column :versions, :javascript, :text
    change_column :versions, :html, :text
    change_column :versions, :css, :text
  end
end
