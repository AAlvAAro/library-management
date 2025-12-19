# frozen_string_literal: true

class ApiDocsController < InertiaController
  before_action :require_librarian

  def index
    render inertia: "api-docs/index"
  end

  private

  def require_librarian
    unless Current.user&.librarian?
      redirect_to dashboard_path, alert: "You must be a librarian to access API documentation."
    end
  end
end
