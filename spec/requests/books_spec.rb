# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Books", type: :request do
  let(:book) { create(:book) }
  let(:member) { create(:user, :member) }
  let(:librarian) { create(:user, :librarian) }

  describe "GET /books" do
    it "returns http success" do
      sign_in_as member
      get books_path
      expect(response).to have_http_status(:success)
    end

    it "allows searching" do
      sign_in_as member
      get books_path, params: {query: "test"}
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /books/:id" do
    it "returns http success" do
      sign_in_as member
      get book_path(book)
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET /books/new" do
    context "as librarian" do
      it "returns http success" do
        sign_in_as librarian
        get new_book_path
        expect(response).to have_http_status(:success)
      end
    end

    context "as member" do
      it "redirects to books index" do
        sign_in_as member
        get new_book_path
        expect(response).to redirect_to(books_path)
      end
    end
  end

  describe "POST /books" do
    let(:valid_params) { {book: attributes_for(:book)} }

    context "as librarian" do
      it "creates a book" do
        sign_in_as librarian
        expect {
          post books_path, params: valid_params
        }.to change(Book, :count).by(1)
      end
    end

    context "as member" do
      it "redirects to books index" do
        sign_in_as member
        post books_path, params: valid_params
        expect(response).to redirect_to(books_path)
      end
    end
  end

  describe "GET /books/:id/edit" do
    context "as librarian" do
      it "returns http success" do
        sign_in_as librarian
        get edit_book_path(book)
        expect(response).to have_http_status(:success)
      end
    end

    context "as member" do
      it "redirects to books index" do
        sign_in_as member
        get edit_book_path(book)
        expect(response).to redirect_to(books_path)
      end
    end
  end

  describe "PATCH /books/:id" do
    let(:update_params) { {book: {title: "Updated Title"}} }

    context "as librarian" do
      it "updates the book" do
        sign_in_as librarian
        patch book_path(book), params: update_params
        expect(book.reload.title).to eq("Updated Title")
      end
    end

    context "as member" do
      it "redirects to books index" do
        sign_in_as member
        patch book_path(book), params: update_params
        expect(response).to redirect_to(books_path)
      end
    end
  end

  describe "DELETE /books/:id" do
    context "as librarian" do
      it "deletes the book" do
        sign_in_as librarian
        book_to_delete = create(:book)
        expect {
          delete book_path(book_to_delete)
        }.to change(Book, :count).by(-1)
      end
    end

    context "as member" do
      it "redirects to books index" do
        sign_in_as member
        delete book_path(book)
        expect(response).to redirect_to(books_path)
      end
    end
  end
end
