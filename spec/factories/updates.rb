# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :update, :class => 'Updates' do
    name "MyString"
    html "MyString"
    css "MyString"
    javascript "MyString"
    user_id 1
    params "MyString"
    library "MyString"
  end
end
