# frozen_string_literal: true

class UsersController < InertiaController
  skip_before_action :authenticate, only: %i[new create]
  before_action :require_no_authentication, only: %i[new create]
  before_action :require_librarian, only: [:index]

  def index
    # Get members with overdue books
    @members = User.member
      .joins(:borrowings)
      .where(borrowings: { returned_at: nil })
      .where("borrowings.due_date < ?", Time.current)
      .distinct
      .includes(borrowings: :book)

    # Only include overdue borrowings for each member
    members_data = @members.map do |member|
      overdue_borrowings = member.borrowings.overdue
      {
        id: member.id,
        name: member.name,
        email: member.email,
        borrowings: overdue_borrowings.as_json(
          only: [:id, :borrowed_at, :due_date, :returned_at],
          include: {
            book: { only: [:id, :title, :author, :isbn] }
          }
        ).map { |b| b.merge(overdue: true) }
      }
    end

    render inertia: "users/index", props: {
      members: members_data
    }
  end

  def new
    @user = User.new
  end

  def create
    @user = User.new(user_params)

    if @user.save
      session_record = @user.sessions.create!
      cookies.signed.permanent[:session_token] = {value: session_record.id, httponly: true}

      send_email_verification
      redirect_to dashboard_path, notice: "Welcome! You have signed up successfully"
    else
      redirect_to sign_up_path, inertia: inertia_errors(@user)
    end
  end

  def destroy
    user = Current.user
    if user.authenticate(params[:password_challenge] || "")
      user.destroy!
      Current.session = nil
      redirect_to root_path, notice: "Your account has been deleted", inertia: {clear_history: true}
    else
      redirect_to settings_profile_path, inertia: {errors: {password_challenge: "Password challenge is invalid"}}
    end
  end

  private

  def user_params
    params.permit(:email, :name, :password, :password_confirmation)
  end

  def send_email_verification
    UserMailer.with(user: @user).email_verification.deliver_later
  end

  def require_librarian
    unless Current.user&.librarian?
      redirect_to dashboard_path, alert: "You must be a librarian to perform this action."
    end
  end
end
