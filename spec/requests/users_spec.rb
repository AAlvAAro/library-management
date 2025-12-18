# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Users", type: :request do
  let(:member) { create(:user, :member) }
  let(:librarian) { create(:user, :librarian) }

  describe "GET /users" do
    context "as librarian" do
      it "returns http success" do
        sign_in_as librarian
        get users_path
        expect(response).to have_http_status(:success)
      end

      it "shows members with overdue books" do
        sign_in_as librarian
        book = create(:book)
        create(:borrowing, user: member, book: book, due_date: 1.week.ago, returned_at: nil)
        get users_path
        expect(response).to have_http_status(:success)
      end
    end

    context "as member" do
      it "redirects to dashboard" do
        sign_in_as member
        get users_path
        expect(response).to redirect_to(dashboard_path)
      end
    end
  end

  describe "GET /sign_up" do
    it "returns http success" do
      get sign_up_url
      expect(response).to have_http_status(:success)
    end
  end

  describe "POST /sign_up" do
    it "creates a new user and redirects to the root url" do
      expect { post sign_up_url, params: attributes_for(:user) }.to change(User, :count).by(1)

      expect(response).to redirect_to(dashboard_url)
    end
  end
end
