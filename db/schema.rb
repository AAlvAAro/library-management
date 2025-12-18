# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[8.1].define(version: 2025_12_18_231939) do
  create_table "books", force: :cascade do |t|
    t.string "author", null: false
    t.integer "available_copies", default: 0, null: false
    t.datetime "created_at", null: false
    t.string "genre"
    t.string "isbn", null: false
    t.string "title", null: false
    t.integer "total_copies", default: 0, null: false
    t.datetime "updated_at", null: false
    t.index ["author"], name: "index_books_on_author"
    t.index ["genre"], name: "index_books_on_genre"
    t.index ["isbn"], name: "index_books_on_isbn", unique: true
    t.index ["title"], name: "index_books_on_title"
  end

  create_table "borrowings", force: :cascade do |t|
    t.integer "book_id", null: false
    t.datetime "borrowed_at", null: false
    t.datetime "created_at", null: false
    t.datetime "due_date", null: false
    t.datetime "returned_at"
    t.datetime "updated_at", null: false
    t.integer "user_id", null: false
    t.index ["book_id"], name: "index_borrowings_on_book_id"
    t.index ["returned_at"], name: "index_borrowings_on_returned_at"
    t.index ["user_id", "book_id"], name: "index_borrowings_on_user_id_and_book_id"
    t.index ["user_id"], name: "index_borrowings_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "ip_address"
    t.datetime "updated_at", null: false
    t.string "user_agent"
    t.integer "user_id", null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "users", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.string "email", null: false
    t.string "name", null: false
    t.string "password_digest", null: false
    t.integer "role", default: 1, null: false
    t.datetime "updated_at", null: false
    t.boolean "verified", default: false, null: false
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "borrowings", "books"
  add_foreign_key "borrowings", "users"
  add_foreign_key "sessions", "users"
end
