# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Api::V1::Borrowings", type: :request do
  let(:member) { create(:user, :member) }
  let(:librarian) { create(:user, :librarian) }
  let(:member_session) { member.sessions.create! }
  let(:librarian_session) { librarian.sessions.create! }
  let(:book) { create(:book, available_copies: 5) }

  let(:member_headers) { { "Authorization" => "Bearer #{member_session.id}" } }
  let(:librarian_headers) { { "Authorization" => "Bearer #{librarian_session.id}" } }

  describe "GET /api/v1/borrowings" do
    let!(:borrowing) { create(:borrowing, user: member, book: book) }

    it "returns empty array (no authentication)" do
      get api_v1_borrowings_path, headers: member_headers
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["borrowings"]).to eq([])
    end

    it "filters borrowings due today" do
      create(:borrowing, user: member, book: create(:book), due_date: Date.today)
      get api_v1_borrowings_path, params: { filter: "due_today" }, headers: member_headers
      expect(response).to have_http_status(:success)
    end

    it "filters overdue borrowings" do
      create(:borrowing, :overdue, user: member, book: create(:book))
      get api_v1_borrowings_path, params: { filter: "overdue" }, headers: member_headers
      expect(response).to have_http_status(:success)
    end

  end

  describe "POST /api/v1/borrowings" do
    it "creates a borrowing with user_id" do
      expect {
        post api_v1_borrowings_path, params: { user_id: member.id, book_id: book.id }, headers: member_headers
      }.to change(Borrowing, :count).by(1)
      expect(response).to have_http_status(:created)
      json = JSON.parse(response.body)
      expect(json["borrowing"]["book"]["id"]).to eq(book.id)
      expect(json["message"]).to include("Book borrowed successfully")
    end

    it "decrements available copies" do
      expect {
        post api_v1_borrowings_path, params: { user_id: member.id, book_id: book.id }, headers: member_headers
      }.to change { book.reload.available_copies }.by(-1)
    end

    it "returns error when book is unavailable" do
      unavailable_book = create(:book, available_copies: 0)
      post api_v1_borrowings_path, params: { user_id: member.id, book_id: unavailable_book.id }, headers: member_headers
      expect(response).to have_http_status(:unprocessable_entity)
      json = JSON.parse(response.body)
      expect(json["error"]).to eq("Failed to borrow book")
    end

    it "returns error when user_id is missing" do
      post api_v1_borrowings_path, params: { book_id: book.id }, headers: member_headers
      expect(response).to have_http_status(:bad_request)
      json = JSON.parse(response.body)
      expect(json["error"]).to eq("user_id parameter required")
    end
  end

  describe "PATCH /api/v1/borrowings/:id/return" do
    let(:borrowing) { create(:borrowing, user: member, book: book) }

    before do
      book.update(available_copies: 3)
    end

    it "marks borrowing as returned" do
      patch return_api_v1_borrowing_path(borrowing), headers: librarian_headers
      expect(response).to have_http_status(:success)
      json = JSON.parse(response.body)
      expect(json["borrowing"]["returned_at"]).to be_present
      expect(json["message"]).to eq("Book returned successfully")
    end

    it "increments available copies" do
      expect {
        patch return_api_v1_borrowing_path(borrowing), headers: librarian_headers
      }.to change { book.reload.available_copies }.by(1)
    end
  end
end
