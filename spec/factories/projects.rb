# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :project do
    name "ProjectName"
    html "ProjectHTML"
    css "ProjectCSS"
    javascript "ProjectJavascript"
  end
end
