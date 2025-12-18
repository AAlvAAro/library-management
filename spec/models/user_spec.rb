# frozen_string_literal: true

require "rails_helper"

RSpec.describe User, type: :model do
  describe "associations" do
    it { is_expected.to have_many(:sessions).dependent(:destroy) }
  end

  describe "validations" do
    subject { build(:user) }

    it { is_expected.to validate_presence_of(:name) }
    it { is_expected.to validate_presence_of(:email) }
    it { is_expected.to validate_uniqueness_of(:email).case_insensitive }
    it { is_expected.to allow_value("user@example.com").for(:email) }
    it { is_expected.not_to allow_value("invalid_email").for(:email) }
    it { is_expected.to validate_length_of(:password).is_at_least(12).on(:update) }
  end

  describe "enums" do
    it { is_expected.to define_enum_for(:role).with_values(librarian: 0, member: 1).with_default(:member) }
  end

  describe "role enum" do
    let(:user) { create(:user) }

    context "default role" do
      it "defaults to member role" do
        expect(user.role).to eq("member")
        expect(user.member?).to be true
      end
    end

    context "librarian role" do
      let(:librarian) { create(:user, role: :librarian) }

      it "can be set to librarian" do
        expect(librarian.role).to eq("librarian")
        expect(librarian.librarian?).to be true
        expect(librarian.member?).to be false
      end

      it "provides scope for librarians" do
        create(:user, role: :member)
        expect(User.librarian).to include(librarian)
        expect(User.librarian.count).to eq(1)
      end
    end

    context "member role" do
      let(:member) { create(:user, role: :member) }

      it "can be explicitly set to member" do
        expect(member.role).to eq("member")
        expect(member.member?).to be true
        expect(member.librarian?).to be false
      end

      it "provides scope for members" do
        create(:user, role: :librarian)
        expect(User.member).to include(member)
        expect(User.member.count).to eq(1)
      end
    end

    context "role transitions" do
      let(:user) { create(:user, role: :member) }

      it "can change from member to librarian" do
        user.librarian!
        expect(user.reload.librarian?).to be true
      end

      it "can change from librarian to member" do
        user.update!(role: :librarian)
        user.member!
        expect(user.reload.member?).to be true
      end
    end
  end

  describe "normalization" do
    it "normalizes email to lowercase and strips whitespace" do
      user = create(:user, email: "  USER@EXAMPLE.COM  ")
      expect(user.email).to eq("user@example.com")
    end
  end

  describe "callbacks" do
    context "when email changes" do
      let(:user) { create(:user, verified: true) }

      it "sets verified to false" do
        user.update(email: "newemail@example.com")
        expect(user.verified).to be false
      end
    end

    context "when password changes" do
      let(:user) { create(:user) }
      let!(:session1) { create(:session, user: user) }
      let!(:session2) { create(:session, user: user) }

      before do
        allow(Current).to receive(:session).and_return(session1)
      end

      it "deletes all sessions except current" do
        user.update(password: "NewPassword123456")
        expect(user.sessions.reload).to contain_exactly(session1)
      end
    end
  end

  describe "token generation" do
    let(:user) { create(:user) }

    it "generates email verification token" do
      token = user.generate_token_for(:email_verification)
      expect(token).to be_present
    end

    it "generates password reset token" do
      token = user.generate_token_for(:password_reset)
      expect(token).to be_present
    end
  end
end
