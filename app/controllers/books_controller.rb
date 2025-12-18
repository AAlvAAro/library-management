# frozen_string_literal: true

class BooksController < InertiaController
  before_action :set_book, only: [:show, :edit, :update, :destroy]
  before_action :require_librarian, only: [:new, :create, :edit, :update, :destroy]

  def index
    @books = if params[:query].present?
      Book.search(params[:query])
    else
      Book.all
    end

    render inertia: "books/index", props: {
      books: @books.as_json(only: [:id, :title, :author, :genre, :isbn, :total_copies, :available_copies]),
      query: params[:query],
      can_manage: Current.user&.librarian?
    }
  end

  def show
    active_borrowings = @book.borrowings.active.includes(:user)

    render inertia: "books/show", props: {
      book: @book.as_json(only: [:id, :title, :author, :genre, :isbn, :total_copies, :available_copies, :created_at, :updated_at]),
      can_manage: Current.user&.librarian?,
      active_borrowings: active_borrowings.as_json(
        only: [:id, :borrowed_at, :due_date],
        include: {user: {only: [:id, :name, :email]}},
        methods: [:overdue?]
      )
    }
  end

  def new
    @book = Book.new
    render inertia: "books/new", props: {
      book: @book.as_json(only: [:title, :author, :genre, :isbn, :total_copies, :available_copies])
    }
  end

  def create
    @book = Book.new(book_params)

    if @book.save
      redirect_to book_path(@book), notice: "Book was successfully created."
    else
      redirect_to new_book_path, inertia: {errors: @book.errors}
    end
  end

  def edit
    render inertia: "books/edit", props: {
      book: @book.as_json(only: [:id, :title, :author, :genre, :isbn, :total_copies, :available_copies])
    }
  end

  def update
    if @book.update(book_params)
      redirect_to book_path(@book), notice: "Book was successfully updated."
    else
      redirect_to edit_book_path(@book), inertia: {errors: @book.errors}
    end
  end

  def destroy
    @book.destroy
    redirect_to books_path, notice: "Book was successfully deleted."
  end

  private

  def set_book
    @book = Book.find(params[:id])
  end

  def book_params
    params.require(:book).permit(:title, :author, :genre, :isbn, :total_copies, :available_copies)
  end

  def require_librarian
    unless Current.user&.librarian?
      redirect_to books_path, alert: "You must be a librarian to perform this action."
    end
  end
end
