# frozen_string_literal: true

# This file should ensure the existence of records required to run the application in every environment (production,
# development, test). The code here should be idempotent so that it can be executed at any point in every environment.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Example:
#
#   ["Action", "Comedy", "Drama", "Horror"].each do |genre_name|
#     MovieGenre.find_or_create_by!(name: genre_name)
#   end

require "faker"

puts "Creating users..."

User.find_or_create_by!(email: "librarian@bookmanagement.com") do |user|
  user.name = "librarian_1"
  user.password = "password123456"
  user.password_confirmation = "password123456"
  user.role = :librarian
  user.verified = true
end

User.find_or_create_by!(email: "member@bookmanagement.com") do |user|
  user.name = "member_1"
  user.password = "password123456"
  user.password_confirmation = "password123456"
  user.role = :member
  user.verified = true
end

puts "Users created!"

puts "Creating books..."

genres = [
  "Fiction",
  "Non-Fiction",
  "Science Fiction",
  "Fantasy",
  "Mystery",
  "Thriller",
  "Romance",
  "Horror",
  "Biography",
  "History",
  "Science",
  "Self-Help",
  "Business",
  "Philosophy",
  "Poetry",
  "Drama",
  "Adventure",
  "Children's",
  "Young Adult",
  "Graphic Novel"
]

25.times do
  total = rand(1..20)
  Book.create!(
    title: Faker::Book.title,
    author: Faker::Book.author,
    genre: genres.sample,
    isbn: Faker::Code.isbn,
    total_copies: total,
    available_copies: rand(0..total)
  )
end

puts "25 books created!"
puts "Seed data loaded successfully!"
