# frozen_string_literal: true

FactoryBot.define do
  factory :book do
    sequence(:title) { |n| "Book Title #{n}" }
    sequence(:author) { |n| "Author Name #{n}" }
    genre { "Fiction" }
    sequence(:isbn) { |n| "978-0-#{n.to_s.rjust(9, '0')}" }
    total_copies { 5 }
    available_copies { 5 }

    trait :unavailable do
      available_copies { 0 }
    end

    trait :partially_available do
      total_copies { 5 }
      available_copies { 2 }
    end

    trait :non_fiction do
      genre { "Non-Fiction" }
    end

    trait :mystery do
      genre { "Mystery" }
    end
  end
end
