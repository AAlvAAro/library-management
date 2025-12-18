# frozen_string_literal: true

require "rails_helper"

RSpec.describe Book, type: :model do
  describe "associations" do
  end

  describe "validations" do
    subject { build(:book) }

    it { is_expected.to validate_presence_of(:title) }
    it { is_expected.to validate_presence_of(:author) }
    it { is_expected.to validate_presence_of(:isbn) }
    it { is_expected.to validate_uniqueness_of(:isbn).case_insensitive }
    it { is_expected.to validate_presence_of(:total_copies) }
    it { is_expected.to validate_numericality_of(:total_copies).only_integer.is_greater_than_or_equal_to(0) }
    it { is_expected.to validate_numericality_of(:available_copies).only_integer.is_greater_than_or_equal_to(0) }

    describe "available_copies_cannot_exceed_total_copies" do
      let(:book) { build(:book, total_copies: 5, available_copies: 10) }

      it "is invalid when available_copies exceeds total_copies" do
        expect(book).not_to be_valid
        expect(book.errors[:available_copies]).to include("cannot exceed total copies")
      end

      it "is valid when available_copies equals total_copies" do
        book.available_copies = 5
        expect(book).to be_valid
      end

      it "is valid when available_copies is less than total_copies" do
        book.available_copies = 3
        expect(book).to be_valid
      end
    end
  end

  describe "scopes" do
    describe ".search" do
      let!(:book1) { create(:book, title: "The Great Gatsby", author: "F. Scott Fitzgerald", genre: "Fiction") }
      let!(:book2) { create(:book, title: "1984", author: "George Orwell", genre: "Dystopian") }
      let!(:book3) { create(:book, title: "To Kill a Mockingbird", author: "Harper Lee", genre: "Fiction") }

      context "when searching by title" do
        it "finds books matching the title" do
          results = Book.search("Gatsby")
          expect(results).to include(book1)
          expect(results).not_to include(book2, book3)
        end
      end

      context "when searching by author" do
        it "finds books matching the author" do
          results = Book.search("Orwell")
          expect(results).to include(book2)
          expect(results).not_to include(book1, book3)
        end
      end

      context "when searching by genre" do
        it "finds books matching the genre" do
          results = Book.search("Fiction")
          expect(results).to include(book1, book3)
          expect(results).not_to include(book2)
        end
      end

      context "when query is blank" do
        it "returns all books" do
          results = Book.search("")
          expect(results).to include(book1, book2, book3)
        end
      end

      context "when query is nil" do
        it "returns all books" do
          results = Book.search(nil)
          expect(results).to include(book1, book2, book3)
        end
      end

      context "when no matches found" do
        it "returns empty result" do
          results = Book.search("NonexistentBook")
          expect(results).to be_empty
        end
      end

      context "case insensitive search" do
        it "finds books regardless of case" do
          results = Book.search("gatsby")
          expect(results).to include(book1)
        end
      end
    end
  end

  describe "callbacks" do
    describe "before_validation on create" do
      context "when available_copies is not set" do
        let(:book) { build(:book, total_copies: 10, available_copies: nil) }

        it "sets available_copies to equal total_copies" do
          book.valid?
          expect(book.available_copies).to eq(10)
        end
      end

      context "when available_copies is explicitly set" do
        let(:book) { build(:book, total_copies: 10, available_copies: 5) }

        it "does not override the set value" do
          book.valid?
          expect(book.available_copies).to eq(5)
        end
      end

      context "on update" do
        let(:book) { create(:book, total_copies: 10, available_copies: 8) }

        it "does not reset available_copies" do
          book.update(title: "New Title")
          expect(book.available_copies).to eq(8)
        end
      end
    end
  end

  describe "factory" do
    it "creates a valid book" do
      book = build(:book)
      expect(book).to be_valid
    end

    it "creates books with unique ISBNs" do
      book1 = create(:book)
      book2 = create(:book)
      expect(book1.isbn).not_to eq(book2.isbn)
    end

    describe "traits" do
      it "creates unavailable books" do
        book = create(:book, :unavailable)
        expect(book.available_copies).to eq(0)
      end

      it "creates partially available books" do
        book = create(:book, :partially_available)
        expect(book.available_copies).to be < book.total_copies
      end

      it "creates non-fiction books" do
        book = create(:book, :non_fiction)
        expect(book.genre).to eq("Non-Fiction")
      end

      it "creates mystery books" do
        book = create(:book, :mystery)
        expect(book.genre).to eq("Mystery")
      end
    end
  end
end
