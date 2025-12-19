# frozen_string_literal: true

module Api
  module V1
    class BorrowingsController < BaseController
      before_action :set_borrowing, only: [:return]

      def index
        # TODO: Implement authentication to get Current.user
        # For now, return empty array
        @borrowings = Borrowing.none

        case params[:filter]
        when "due_today"
          @borrowings = @borrowings.active.where("DATE(due_date) = ?", Date.today)
        when "overdue"
          @borrowings = @borrowings.overdue
        end

        @borrowings = @borrowings.order(created_at: :desc)

        render json: {
          borrowings: @borrowings.as_json(
            only: [:id, :borrowed_at, :due_date, :returned_at, :created_at, :updated_at],
            include: {
              book: { only: [:id, :title, :author, :genre, :isbn] }
            },
            methods: [:active?, :overdue?]
          )
        }
      end

      def create
        # TODO: Implement authentication to get Current.user
        # For now, require user_id parameter
        return render json: { error: "user_id parameter required" }, status: :bad_request unless params[:user_id]

        user = User.find(params[:user_id])
        @book = Book.find(params[:book_id])
        @borrowing = user.borrowings.build(book: @book)

        if @borrowing.save
          @book.decrement!(:available_copies)
          render json: {
            borrowing: @borrowing.as_json(
              only: [:id, :borrowed_at, :due_date, :returned_at, :created_at, :updated_at],
              include: {
                book: { only: [:id, :title, :author, :genre, :isbn] }
              }
            ),
            message: "Book borrowed successfully. Due date: #{@borrowing.due_date.strftime('%B %d, %Y')}"
          }, status: :created
        else
          render json: {
            error: "Failed to borrow book",
            details: @borrowing.errors.full_messages
          }, status: :unprocessable_entity
        end
      end

      def return
        if @borrowing.mark_as_returned!
          render json: {
            borrowing: @borrowing.as_json(
              only: [:id, :borrowed_at, :due_date, :returned_at, :created_at, :updated_at],
              include: {
                book: { only: [:id, :title, :author, :genre, :isbn] }
              }
            ),
            message: "Book returned successfully"
          }
        else
          render json: {
            error: "Failed to return book"
          }, status: :unprocessable_entity
        end
      end

      private

      def set_borrowing
        @borrowing = Borrowing.find(params[:id])
      end
    end
  end
end
