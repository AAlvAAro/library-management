# frozen_string_literal: true

class BorrowingsController < InertiaController
  before_action :set_borrowing, only: [:return]

  def index
    @borrowings = Current.user.borrowings.includes(:book)

    # Apply filters
    case params[:filter]
    when "due_today"
      @borrowings = @borrowings.active.where("DATE(due_date) = ?", Date.today)
    when "overdue"
      @borrowings = @borrowings.overdue
    end

    @borrowings = @borrowings.order(created_at: :desc)

    render inertia: "borrowings/index", props: {
      borrowings: @borrowings.as_json(
        include: {
          book: {only: [:id, :title, :author, :genre, :isbn]}
        },
        methods: [:active?, :overdue?]
      ),
      filter: params[:filter]
    }
  end

  def create
    @book = Book.find(params[:book_id])
    @borrowing = Current.user.borrowings.build(book: @book)

    if @borrowing.save
      @book.decrement!(:available_copies)
      redirect_to book_path(@book), notice: "Book borrowed successfully. Due date: #{@borrowing.due_date.strftime('%B %d, %Y')}"
    else
      redirect_to book_path(@book), alert: @borrowing.errors.full_messages.to_sentence
    end
  end

  def return
    if @borrowing.mark_as_returned!
      redirect_to book_path(@borrowing.book), notice: "Book returned successfully."
    else
      redirect_to book_path(@borrowing.book), alert: "Failed to return book."
    end
  end

  private

  def set_borrowing
    @borrowing = Borrowing.find(params[:id])
  end
end
