# frozen_string_literal: true

FactoryBot.define do
  factory :session do
    user
    user_agent { "Mozilla/5.0" }
    ip_address { "127.0.0.1" }
  end
end
