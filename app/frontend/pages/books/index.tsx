import { Head, Link, router } from "@inertiajs/react"
import { useState, useEffect } from "react"
import { BookOpen, Plus, Search, X } from "lucide-react"

import AppLayout from "@/layouts/app-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { booksPath, bookPath, newBookPath } from "@/routes"
import type { BreadcrumbItem } from "@/types"

interface Book {
  id: number
  title: string
  author: string
  genre: string
  isbn: string
  total_copies: number
  available_copies: number
}

interface Props {
  books: Book[]
  query?: string
  can_manage: boolean
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Books",
    href: booksPath(),
  },
]

export default function Index({ books, query, can_manage }: Props) {
  const [searchQuery, setSearchQuery] = useState(query || "")

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      router.get(
        booksPath(),
        searchQuery ? { query: searchQuery } : {},
        { preserveState: true, preserveScroll: true }
      )
    }, 300)

    return () => clearTimeout(timeoutId)
  }, [searchQuery])

  const handleClearSearch = () => {
    setSearchQuery("")
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Books" />

      <div className="flex flex-col gap-6 p-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Books</h1>
            <p className="text-muted-foreground">
              Browse and search our book collection
            </p>
          </div>
          {can_manage && (
            <Button asChild>
              <Link href={newBookPath()}>
                <Plus className="mr-2 h-4 w-4" />
                Add Book
              </Link>
            </Button>
          )}
        </div>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search by title, author, or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-10"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {books.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No books found</p>
              <p className="text-sm text-muted-foreground">
                {query ? "Try a different search term" : "Get started by adding your first book"}
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {books.map((book) => (
              <Card key={book.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                  <CardDescription className="line-clamp-1">
                    by {book.author}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {book.genre && (
                      <Badge variant="secondary">{book.genre}</Badge>
                    )}
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">Available:</span>
                      <span className="font-medium">
                        {book.available_copies} / {book.total_copies}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-muted-foreground">ISBN:</span>
                      <span className="font-mono text-xs">{book.isbn}</span>
                    </div>
                    <Button asChild variant="outline" className="w-full mt-4">
                      <Link href={bookPath(book.id)}>View Details</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {books.length > 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Showing {books.length} {books.length === 1 ? "book" : "books"}
          </p>
        )}
      </div>
    </AppLayout>
  )
}
