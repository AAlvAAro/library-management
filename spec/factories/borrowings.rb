# frozen_string_literal: true

FactoryBot.define do
  factory :borrowing do
    association :user
    association :book
    borrowed_at { Time.current }
    due_date { 2.weeks.from_now }
    returned_at { nil }

    trait :returned do
      returned_at { Time.current }
    end

    trait :overdue do
      borrowed_at { 3.weeks.ago }
      due_date { 1.week.ago }
      returned_at { nil }
    end
  end
end
