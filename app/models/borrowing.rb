# frozen_string_literal: true

class Borrowing < ApplicationRecord
  belongs_to :user
  belongs_to :book

  validates :borrowed_at, presence: true
  validates :due_date, presence: true
  validate :book_must_be_available, on: :create

  before_validation :set_dates, on: :create

  scope :active, -> { where(returned_at: nil) }
  scope :returned, -> { where.not(returned_at: nil) }
  scope :overdue, -> { active.where("due_date < ?", Time.current) }

  def active?
    returned_at.nil?
  end

  def overdue?
    active? && due_date < Time.current
  end

  def mark_as_returned!
    update!(returned_at: Time.current)
    book.increment!(:available_copies)
  end

  private

  def set_dates
    self.borrowed_at ||= Time.current
    self.due_date ||= 2.weeks.from_now
  end

  def book_must_be_available
    return unless book

    if book.available_copies <= 0
      errors.add(:book, "is not available for borrowing")
    end
  end
end
