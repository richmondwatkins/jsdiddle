# Read about factories at https://github.com/thoughtbot/factory_girl

FactoryGirl.define do
  factory :fork, :class => 'Forks' do
    name "MyString"
    html "MyString"
    css "MyString"
    javascript "MyString"
    user_id 1
    params "MyString"
    library "MyString"
  end
end
