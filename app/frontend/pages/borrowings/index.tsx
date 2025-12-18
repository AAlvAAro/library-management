import { Head, Link, router } from "@inertiajs/react"
import { BookMarked, Calendar, AlertCircle } from "lucide-react"

import AppLayout from "@/layouts/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { booksPath, bookPath, borrowingsPath } from "@/routes"
import type { BreadcrumbItem } from "@/types"

interface Book {
  id: number
  title: string
  author: string
  genre: string
  isbn: string
}

interface Borrowing {
  id: number
  borrowed_at: string
  due_date: string
  returned_at: string | null
  active?: boolean
  overdue?: boolean
  book: Book
}

interface Props {
  borrowings: Borrowing[]
  filter?: string
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "My Borrowings",
    href: borrowingsPath(),
  },
]

export default function Index({ borrowings, filter }: Props) {
  const activeBorrowings = borrowings.filter((b) => b.active)
  const returnedBorrowings = borrowings.filter((b) => !b.active)

  const handleFilterChange = (newFilter: string) => {
    router.get(borrowingsPath(), { filter: newFilter === filter ? undefined : newFilter }, { preserveState: true })
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="My Borrowings" />

      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">My Borrowings</h1>
            <p className="text-muted-foreground">
              Track your borrowed books and due dates
            </p>
          </div>
          <Button asChild>
            <Link href={booksPath()}>
              <BookMarked className="mr-2 h-4 w-4" />
              Browse Books
            </Link>
          </Button>
        </div>

        <div className="flex gap-2">
          <Button
            variant={filter === "due_today" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("due_today")}
          >
            Due Today
          </Button>
          <Button
            variant={filter === "overdue" ? "default" : "outline"}
            size="sm"
            onClick={() => handleFilterChange("overdue")}
          >
            Overdue
          </Button>
          {filter && (
            <Button
              variant="ghost"
              size="sm"
              onClick={() => handleFilterChange("")}
            >
              Clear Filter
            </Button>
          )}
        </div>

        {borrowings.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookMarked className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No borrowings yet</p>
              <p className="text-sm text-muted-foreground mb-4">
                Start by browsing our book collection
              </p>
              <Button asChild>
                <Link href={booksPath()}>Browse Books</Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-6">
            {activeBorrowings.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Active Borrowings</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {activeBorrowings.map((borrowing) => (
                    <Card key={borrowing.id} className={borrowing.overdue ? "border-destructive" : ""}>
                      <CardHeader>
                        <CardTitle className="line-clamp-1">{borrowing.book.title}</CardTitle>
                        <CardDescription className="line-clamp-1">
                          by {borrowing.book.author}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          {borrowing.book.genre && (
                            <Badge variant="secondary">{borrowing.book.genre}</Badge>
                          )}
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Borrowed:</span>
                              <span className="font-medium">
                                {new Date(borrowing.borrowed_at).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Due:</span>
                              <span className={`font-medium ${borrowing.overdue ? "text-destructive" : ""}`}>
                                {new Date(borrowing.due_date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          {borrowing.overdue && (
                            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-3 flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-destructive mt-0.5 flex-shrink-0" />
                              <p className="text-xs text-destructive">
                                This book is overdue. Please return it as soon as possible.
                              </p>
                            </div>
                          )}
                          <Button asChild variant="outline" className="w-full">
                            <Link href={bookPath(borrowing.book.id)}>View Book</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {returnedBorrowings.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-xl font-semibold">Borrowing History</h2>
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                  {returnedBorrowings.map((borrowing) => (
                    <Card key={borrowing.id} className="opacity-75">
                      <CardHeader>
                        <CardTitle className="line-clamp-1">{borrowing.book.title}</CardTitle>
                        <CardDescription className="line-clamp-1">
                          by {borrowing.book.author}
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-3">
                          <Badge variant="outline">Returned</Badge>
                          <div className="space-y-2 text-sm">
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Borrowed:</span>
                              <span className="font-medium">
                                {new Date(borrowing.borrowed_at).toLocaleDateString()}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              <Calendar className="h-4 w-4 text-muted-foreground" />
                              <span className="text-muted-foreground">Returned:</span>
                              <span className="font-medium">
                                {new Date(borrowing.returned_at!).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Button asChild variant="outline" className="w-full">
                            <Link href={bookPath(borrowing.book.id)}>View Book</Link>
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </AppLayout>
  )
}
