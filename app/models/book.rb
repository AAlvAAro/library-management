# frozen_string_literal: true

class Book < ApplicationRecord
  validates :title, presence: true
  validates :author, presence: true
  validates :isbn, presence: true, uniqueness: {case_sensitive: false}
  validates :total_copies, presence: true, numericality: {only_integer: true, greater_than_or_equal_to: 0}
  validates :available_copies, presence: true, numericality: {only_integer: true, greater_than_or_equal_to: 0}
  validate :available_copies_cannot_exceed_total_copies

  scope :search, ->(query) {
    return all if query.blank?

    where("title LIKE ? OR author LIKE ? OR genre LIKE ?",
          "%#{sanitize_sql_like(query)}%",
          "%#{sanitize_sql_like(query)}%",
          "%#{sanitize_sql_like(query)}%")
  }

  before_validation :set_available_copies_on_create, on: :create

  private

  def set_available_copies_on_create
    self.available_copies ||= total_copies
  end

  def available_copies_cannot_exceed_total_copies
    return if available_copies.nil? || total_copies.nil?

    if available_copies > total_copies
      errors.add(:available_copies, "cannot exceed total copies")
    end
  end
end
