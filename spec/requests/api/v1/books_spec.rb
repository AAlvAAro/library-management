# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Api::V1::Books", type: :request do
  let(:member) { create(:user, :member) }
  let(:librarian) { create(:user, :librarian) }
  let(:member_session) { member.sessions.create! }
  let(:librarian_session) { librarian.sessions.create! }
  let(:book) { create(:book) }

  let(:member_headers) { { "Authorization" => "Bearer #{member_session.id}" } }
  let(:librarian_headers) { { "Authorization" => "Bearer #{librarian_session.id}" } }

  describe "GET /api/v1/books" do
    let!(:books) { create_list(:book, 3) }

    it "returns all books" do
      get api_v1_books_path, headers: member_headers
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["books"].length).to eq(3)
      expect(json["total_count"]).to eq(3)
    end

    it "filters available books" do
      create(:book, available_copies: 0)
      get api_v1_books_path, params: { filter: "available" }, headers: member_headers
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["books"].all? { |b| b["available_copies"] > 0 }).to be true
    end

    it "searches books by query" do
      create(:book, title: "Unique Title")
      get api_v1_books_path, params: { query: "Unique" }, headers: member_headers
      expect(response).to have_http_status(:success)
    end

  end

  describe "GET /api/v1/books/:id" do
    it "returns a specific book" do
      get api_v1_book_path(book), headers: member_headers
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["book"]["id"]).to eq(book.id)
      expect(json["book"]["title"]).to eq(book.title)
    end

    it "returns 404 for non-existent book" do
      get api_v1_book_path(id: 99999), headers: member_headers
      expect(response).to have_http_status(:not_found)
    end
  end

  describe "POST /api/v1/books" do
    let(:valid_params) do
      {
        book: {
          title: "New Book",
          author: "Author Name",
          genre: "Fiction",
          isbn: "1234567890",
          total_copies: 10,
          available_copies: 10
        }
      }
    end

    context "as librarian" do
      it "creates a new book" do
        expect {
          post api_v1_books_path, params: valid_params, headers: librarian_headers
        }.to change(Book, :count).by(1)
        expect(response).to have_http_status(:created)
        json = JSON.parse(response.body)
        expect(json["book"]["title"]).to eq("New Book")
        expect(json["message"]).to eq("Book created successfully")
      end

      it "returns errors for invalid params" do
        post api_v1_books_path, params: { book: { title: "" } }, headers: librarian_headers
        expect(response).to have_http_status(:unprocessable_entity)
        json = JSON.parse(response.body)
        expect(json["error"]).to eq("Failed to create book")
        expect(json["details"]).to be_present
      end
    end

    context "as member" do
      it "can create books (no authentication)" do
        expect {
          post api_v1_books_path, params: valid_params, headers: member_headers
        }.to change(Book, :count).by(1)
        expect(response).to have_http_status(:created)
      end
    end
  end

  describe "PATCH /api/v1/books/:id" do
    let(:update_params) { { book: { title: "Updated Title" } } }

    context "as librarian" do
      it "updates the book" do
        patch api_v1_book_path(book), params: update_params, headers: librarian_headers
        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json["book"]["title"]).to eq("Updated Title")
        expect(json["message"]).to eq("Book updated successfully")
      end
    end

    context "as member" do
      it "can update books (no authentication)" do
        patch api_v1_book_path(book), params: update_params, headers: member_headers
        expect(response).to have_http_status(:success)
        expect(book.reload.title).to eq("Updated Title")
      end
    end
  end

  describe "DELETE /api/v1/books/:id" do
    context "as librarian" do
      it "deletes the book" do
        book_to_delete = create(:book)
        expect {
          delete api_v1_book_path(book_to_delete), headers: librarian_headers
        }.to change(Book, :count).by(-1)
        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json["message"]).to eq("Book deleted successfully")
      end
    end

    context "as member" do
      it "can delete books (no authentication)" do
        book_to_delete = create(:book)
        expect {
          delete api_v1_book_path(book_to_delete), headers: member_headers
        }.to change(Book, :count).by(-1)
        expect(response).to have_http_status(:success)
      end
    end
  end
end
