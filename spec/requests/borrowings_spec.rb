# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Borrowings", type: :request do
  let(:member) { create(:user, :member) }
  let(:librarian) { create(:user, :librarian) }
  let(:book) { create(:book, available_copies: 5) }

  describe "GET /borrowings" do
    it "returns http success for authenticated user" do
      sign_in_as member
      get borrowings_path
      expect(response).to have_http_status(:success)
    end

    context "with filters" do
      let!(:due_today_borrowing) do
        create(:borrowing, user: member, book: book, due_date: Date.today)
      end

      let!(:overdue_borrowing) do
        create(:borrowing, user: member, book: create(:book), due_date: 1.week.ago)
      end

      it "filters borrowings due today" do
        sign_in_as member
        get borrowings_path, params: {filter: "due_today"}
        expect(response).to have_http_status(:success)
      end

      it "filters overdue borrowings" do
        sign_in_as member
        get borrowings_path, params: {filter: "overdue"}
        expect(response).to have_http_status(:success)
      end
    end
  end

  describe "POST /borrowings" do
    it "creates a borrowing" do
      sign_in_as member
      expect {
        post borrowings_path, params: {book_id: book.id}
      }.to change(Borrowing, :count).by(1)
    end

    it "decrements available copies" do
      sign_in_as member
      expect {
        post borrowings_path, params: {book_id: book.id}
      }.to change { book.reload.available_copies }.by(-1)
    end

    it "redirects to book page" do
      sign_in_as member
      post borrowings_path, params: {book_id: book.id}
      expect(response).to redirect_to(book_path(book))
    end
  end

  describe "PATCH /borrowings/:id/return" do
    let(:borrowing) { create(:borrowing, user: member, book: book) }

    before do
      book.update(available_copies: 3)
    end

    context "as librarian" do
      it "marks borrowing as returned" do
        sign_in_as librarian
        patch return_borrowing_path(borrowing)
        expect(borrowing.reload.returned_at).not_to be_nil
      end

      it "increments available copies" do
        sign_in_as librarian
        expect {
          patch return_borrowing_path(borrowing)
        }.to change { book.reload.available_copies }.by(1)
      end

      it "redirects to book page" do
        sign_in_as librarian
        patch return_borrowing_path(borrowing)
        expect(response).to redirect_to(book_path(book))
      end
    end
  end
end
