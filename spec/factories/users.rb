# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    sequence(:email) { |n| "user#{n}@example.com" }
    name { "Test User" }
    password { "Secret1*3*5*" }
    verified { true }
    role { :member }

    trait :librarian do
      role { :librarian }
    end

    trait :member do
      role { :member }
    end
  end
end
