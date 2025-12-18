# frozen_string_literal: true

require "rails_helper"

RSpec.describe Borrowing, type: :model do
  describe "associations" do
    it { is_expected.to belong_to(:user) }
    it { is_expected.to belong_to(:book) }
  end

  describe "validations" do
    # Note: borrowed_at and due_date are set by before_validation callback
    # so we test that they are present after validation instead
    it "ensures borrowed_at is present after validation" do
      borrowing = build(:borrowing, borrowed_at: nil, due_date: nil)
      borrowing.valid?
      expect(borrowing.borrowed_at).to be_present
    end

    it "ensures due_date is present after validation" do
      borrowing = build(:borrowing, borrowed_at: nil, due_date: nil)
      borrowing.valid?
      expect(borrowing.due_date).to be_present
    end

    describe "book availability validation" do
      let(:book) { create(:book, available_copies: 0) }
      let(:user) { create(:user, :member) }

      it "validates book must be available on create" do
        borrowing = build(:borrowing, user: user, book: book)
        expect(borrowing).not_to be_valid
        expect(borrowing.errors[:book]).to include("is not available for borrowing")
      end
    end
  end

  describe "callbacks" do
    describe "set_dates" do
      let(:borrowing) { build(:borrowing, borrowed_at: nil, due_date: nil) }

      it "sets borrowed_at to current time" do
        borrowing.save
        expect(borrowing.borrowed_at).to be_present
        expect(borrowing.borrowed_at).to be_within(1.second).of(Time.current)
      end

      it "sets due_date to 2 weeks from now" do
        borrowing.save
        expect(borrowing.due_date).to be_present
        expect(borrowing.due_date).to be_within(1.second).of(2.weeks.from_now)
      end
    end
  end

  describe "scopes" do
    let(:user) { create(:user, :member) }
    let(:book) { create(:book) }
    let!(:active_borrowing) { create(:borrowing, user: user, book: book, returned_at: nil) }
    let!(:returned_borrowing) { create(:borrowing, :returned, user: user, book: create(:book)) }
    let!(:overdue_borrowing) { create(:borrowing, :overdue, user: user, book: create(:book)) }

    describe ".active" do
      it "returns borrowings without returned_at" do
        expect(Borrowing.active).to include(active_borrowing, overdue_borrowing)
        expect(Borrowing.active).not_to include(returned_borrowing)
      end
    end

    describe ".returned" do
      it "returns borrowings with returned_at" do
        expect(Borrowing.returned).to include(returned_borrowing)
        expect(Borrowing.returned).not_to include(active_borrowing, overdue_borrowing)
      end
    end

    describe ".overdue" do
      it "returns active borrowings past due date" do
        expect(Borrowing.overdue).to include(overdue_borrowing)
        expect(Borrowing.overdue).not_to include(active_borrowing, returned_borrowing)
      end
    end
  end

  describe "instance methods" do
    describe "#active?" do
      it "returns true when returned_at is nil" do
        borrowing = build(:borrowing, returned_at: nil)
        expect(borrowing.active?).to be true
      end

      it "returns false when returned_at is present" do
        borrowing = build(:borrowing, returned_at: Time.current)
        expect(borrowing.active?).to be false
      end
    end

    describe "#overdue?" do
      it "returns true when active and past due date" do
        borrowing = build(:borrowing, returned_at: nil, due_date: 1.day.ago)
        expect(borrowing.overdue?).to be true
      end

      it "returns false when not active" do
        borrowing = build(:borrowing, returned_at: Time.current, due_date: 1.day.ago)
        expect(borrowing.overdue?).to be false
      end

      it "returns false when active but not past due date" do
        borrowing = build(:borrowing, returned_at: nil, due_date: 1.day.from_now)
        expect(borrowing.overdue?).to be false
      end
    end

    describe "#mark_as_returned!" do
      let(:book) { create(:book, available_copies: 3) }
      let(:borrowing) { create(:borrowing, book: book, returned_at: nil) }

      it "sets returned_at to current time" do
        borrowing.mark_as_returned!
        expect(borrowing.returned_at).to be_within(1.second).of(Time.current)
      end

      it "increments book available_copies" do
        expect {
          borrowing.mark_as_returned!
        }.to change { book.reload.available_copies }.by(1)
      end
    end
  end

  describe "factory" do
    it "has a valid factory" do
      expect(build(:borrowing)).to be_valid
    end

    it "has a valid :returned trait" do
      borrowing = build(:borrowing, :returned)
      expect(borrowing.returned_at).to be_present
    end

    it "has a valid :overdue trait" do
      borrowing = build(:borrowing, :overdue)
      expect(borrowing.overdue?).to be true
    end
  end
end
