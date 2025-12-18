import { Head, Link, router } from "@inertiajs/react"
import { ArrowLeft, Edit, Trash2, BookOpen } from "lucide-react"

import AppLayout from "@/layouts/app-layout"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { booksPath, bookPath, editBookPath } from "@/routes"
import type { BreadcrumbItem } from "@/types"

interface Book {
  id: number
  title: string
  author: string
  genre: string
  isbn: string
  total_copies: number
  available_copies: number
  created_at: string
  updated_at: string
}

interface Props {
  book: Book
  can_manage: boolean
}

export default function Show({ book, can_manage }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Books",
      href: booksPath(),
    },
    {
      title: book.title,
      href: bookPath(book.id),
    },
  ]

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this book?")) {
      router.delete(bookPath(book.id))
    }
  }

  const isAvailable = book.available_copies > 0
  const availabilityPercentage = (book.available_copies / book.total_copies) * 100

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={book.title} />

      <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <Button asChild variant="ghost">
            <Link href={booksPath()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Books
            </Link>
          </Button>
          {can_manage && (
            <div className="flex gap-2">
              <Button asChild variant="outline">
                <Link href={editBookPath(book.id)}>
                  <Edit className="mr-2 h-4 w-4" />
                  Edit
                </Link>
              </Button>
              <Button variant="destructive" onClick={handleDelete}>
                <Trash2 className="mr-2 h-4 w-4" />
                Delete
              </Button>
            </div>
          )}
        </div>

        <Card>
          <CardHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <CardTitle className="text-3xl mb-2">{book.title}</CardTitle>
                <CardDescription className="text-lg">by {book.author}</CardDescription>
              </div>
              <BookOpen className="h-12 w-12 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">Genre</h3>
                {book.genre ? (
                  <Badge variant="secondary" className="text-base">
                    {book.genre}
                  </Badge>
                ) : (
                  <p className="text-muted-foreground">Not specified</p>
                )}
              </div>

              <div className="space-y-2">
                <h3 className="font-semibold text-sm text-muted-foreground">ISBN</h3>
                <p className="font-mono">{book.isbn}</p>
              </div>
            </div>

            <Separator />

            <div className="space-y-4">
              <h3 className="font-semibold">Availability</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Total Copies</p>
                  <p className="text-2xl font-bold">{book.total_copies}</p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Available</p>
                  <p className="text-2xl font-bold text-green-600">
                    {book.available_copies}
                  </p>
                </div>
                <div className="space-y-2">
                  <p className="text-sm text-muted-foreground">Borrowed</p>
                  <p className="text-2xl font-bold text-orange-600">
                    {book.total_copies - book.available_copies}
                  </p>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Availability</span>
                  <span className="font-medium">{availabilityPercentage.toFixed(0)}%</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      availabilityPercentage > 50
                        ? "bg-green-500"
                        : availabilityPercentage > 20
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${availabilityPercentage}%` }}
                  />
                </div>
              </div>

              {!isAvailable && (
                <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                  <p className="text-sm font-medium text-destructive">
                    All copies are currently borrowed
                  </p>
                </div>
              )}
            </div>

            <Separator />

            <div className="grid gap-4 md:grid-cols-2 text-sm">
              <div className="space-y-1">
                <p className="text-muted-foreground">Added on</p>
                <p className="font-medium">
                  {new Date(book.created_at).toLocaleDateString()}
                </p>
              </div>
              <div className="space-y-1">
                <p className="text-muted-foreground">Last updated</p>
                <p className="font-medium">
                  {new Date(book.updated_at).toLocaleDateString()}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
