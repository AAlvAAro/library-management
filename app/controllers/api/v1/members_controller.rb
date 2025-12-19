# frozen_string_literal: true

module Api
  module V1
    class MembersController < BaseController
      before_action :require_librarian

      def index
        @members = User.member

        if params[:filter] == "overdue"
          @members = @members
            .joins(:borrowings)
            .where(borrowings: { returned_at: nil })
            .where("borrowings.due_date < ?", Time.current)
            .distinct
            .includes(borrowings: :book)

          members_data = @members.map do |member|
            overdue_borrowings = member.borrowings.overdue
            {
              id: member.id,
              name: member.name,
              email: member.email,
              role: member.role,
              created_at: member.created_at,
              borrowings: overdue_borrowings.as_json(
                only: [:id, :borrowed_at, :due_date, :returned_at],
                include: {
                  book: { only: [:id, :title, :author, :isbn] }
                },
                methods: [:overdue?]
              )
            }
          end

          render json: {
            members: members_data,
            total_count: @members.count
          }
        else
          render json: {
            members: @members.as_json(
              only: [:id, :name, :email, :role, :created_at, :updated_at]
            ),
            total_count: @members.count
          }
        end
      end
    end
  end
end
