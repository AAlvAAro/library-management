# frozen_string_literal: true

module Api
  module V1
    class BooksController < BaseController
      before_action :set_book, only: [:show, :update, :destroy]
      before_action :require_librarian, only: [:create, :update, :destroy]

      def index
        @books = Book.all
        @books = @books.search(params[:query]) if params[:query].present?

        case params[:filter]
        when "available"
          @books = @books.where("available_copies > 0")
        when "borrowed"
          @books = @books.where("available_copies < total_copies")
        end

        render json: {
          books: @books.as_json(only: [:id, :title, :author, :genre, :isbn, :total_copies, :available_copies, :created_at, :updated_at]),
          total_count: @books.count
        }
      end

      def show
        render json: {
          book: @book.as_json(only: [:id, :title, :author, :genre, :isbn, :total_copies, :available_copies, :created_at, :updated_at])
        }
      end

      def create
        @book = Book.new(book_params)

        if @book.save
          render json: {
            book: @book.as_json(only: [:id, :title, :author, :genre, :isbn, :total_copies, :available_copies, :created_at, :updated_at]),
            message: "Book created successfully"
          }, status: :created
        else
          render json: {
            error: "Failed to create book",
            details: @book.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      def update
        if @book.update(book_params)
          render json: {
            book: @book.as_json(only: [:id, :title, :author, :genre, :isbn, :total_copies, :available_copies, :created_at, :updated_at]),
            message: "Book updated successfully"
          }
        else
          render json: {
            error: "Failed to update book",
            details: @book.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      def destroy
        @book.destroy
        render json: { message: "Book deleted successfully" }
      end

      private

      def set_book
        @book = Book.find(params[:id])
      end

      def book_params
        params.require(:book).permit(:title, :author, :genre, :isbn, :total_copies, :available_copies)
      end
    end
  end
end
