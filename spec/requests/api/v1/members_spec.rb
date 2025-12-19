# frozen_string_literal: true

require "rails_helper"

RSpec.describe "Api::V1::Members", type: :request do
  let(:member) { create(:user, :member) }
  let(:librarian) { create(:user, :librarian) }
  let(:member_session) { member.sessions.create! }
  let(:librarian_session) { librarian.sessions.create! }

  let(:member_headers) { { "Authorization" => "Bearer #{member_session.id}" } }
  let(:librarian_headers) { { "Authorization" => "Bearer #{librarian_session.id}" } }

  describe "GET /api/v1/members" do
    let!(:members) { create_list(:user, 3, :member) }

    context "as librarian" do
      it "returns all members" do
        get api_v1_members_path, headers: librarian_headers
        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json["members"].length).to be >= 3
        expect(json["total_count"]).to be >= 3
      end

      it "filters members with overdue books" do
        member_with_overdue = create(:user, :member)
        book = create(:book)
        create(:borrowing, user: member_with_overdue, book: book, due_date: 1.week.ago, returned_at: nil)

        get api_v1_members_path, params: { filter: "overdue" }, headers: librarian_headers
        expect(response).to have_http_status(:success)
        json = JSON.parse(response.body)
        expect(json["members"]).to be_present
        expect(json["members"].first["borrowings"]).to be_present
      end
    end

    context "as member" do
      it "can access members endpoint (no authentication)" do
        get api_v1_members_path, headers: member_headers
        expect(response).to have_http_status(:success)
      end
    end
  end
end
