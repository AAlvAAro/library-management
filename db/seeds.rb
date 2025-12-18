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

# Create additional members for testing overdue books
member_2 = User.find_or_create_by!(email: "member2@bookmanagement.com") do |user|
  user.name = "John Smith"
  user.password = "password123456"
  user.password_confirmation = "password123456"
  user.role = :member
  user.verified = true
end

member_3 = User.find_or_create_by!(email: "member3@bookmanagement.com") do |user|
  user.name = "Jane Doe"
  user.password = "password123456"
  user.password_confirmation = "password123456"
  user.role = :member
  user.verified = true
end

member_4 = User.find_or_create_by!(email: "member4@bookmanagement.com") do |user|
  user.name = "Bob Johnson"
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

puts "Creating overdue borrowings..."

# Get some books for borrowing
books = Book.limit(10).to_a

# Create overdue borrowings for member_2 (2 overdue books)
if books[0] && books[0].available_copies > 0
  Borrowing.create!(
    user: member_2,
    book: books[0],
    borrowed_at: 3.weeks.ago,
    due_date: 1.week.ago,
    returned_at: nil
  )
  books[0].decrement!(:available_copies)
end

if books[1] && books[1].available_copies > 0
  Borrowing.create!(
    user: member_2,
    book: books[1],
    borrowed_at: 4.weeks.ago,
    due_date: 2.weeks.ago,
    returned_at: nil
  )
  books[1].decrement!(:available_copies)
end

# Create overdue borrowings for member_3 (1 overdue book)
if books[2] && books[2].available_copies > 0
  Borrowing.create!(
    user: member_3,
    book: books[2],
    borrowed_at: 2.weeks.ago,
    due_date: 3.days.ago,
    returned_at: nil
  )
  books[2].decrement!(:available_copies)
end

# Create overdue borrowings for member_4 (3 overdue books)
if books[3] && books[3].available_copies > 0
  Borrowing.create!(
    user: member_4,
    book: books[3],
    borrowed_at: 5.weeks.ago,
    due_date: 3.weeks.ago,
    returned_at: nil
  )
  books[3].decrement!(:available_copies)
end

if books[4] && books[4].available_copies > 0
  Borrowing.create!(
    user: member_4,
    book: books[4],
    borrowed_at: 3.weeks.ago,
    due_date: 1.week.ago,
    returned_at: nil
  )
  books[4].decrement!(:available_copies)
end

if books[5] && books[5].available_copies > 0
  Borrowing.create!(
    user: member_4,
    book: books[5],
    borrowed_at: 4.weeks.ago,
    due_date: 2.weeks.ago,
    returned_at: nil
  )
  books[5].decrement!(:available_copies)
end

# Create some active (not overdue) borrowings
if books[6] && books[6].available_copies > 0
  Borrowing.create!(
    user: member_2,
    book: books[6],
    borrowed_at: 3.days.ago,
    due_date: 11.days.from_now,
    returned_at: nil
  )
  books[6].decrement!(:available_copies)
end

if books[7] && books[7].available_copies > 0
  Borrowing.create!(
    user: member_3,
    book: books[7],
    borrowed_at: 1.day.ago,
    due_date: 13.days.from_now,
    returned_at: nil
  )
  books[7].decrement!(:available_copies)
end

puts "Overdue borrowings created!"
puts "Seed data loaded successfully!"
