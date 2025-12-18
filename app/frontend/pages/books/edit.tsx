import { Head, Link, router } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react"

import AppLayout from "@/layouts/app-layout"
import { Button } from "@/components/ui/button"
import BookForm from "@/components/book-form"
import { booksPath, bookPath } from "@/routes"
import type { BreadcrumbItem } from "@/types"

interface BookFormData {
  title: string
  author: string
  genre: string
  isbn: string
  total_copies: number
  available_copies: number
}

interface Book extends BookFormData {
  id: number
}

interface Props {
  book: Book
}

export default function Edit({ book }: Props) {
  const breadcrumbs: BreadcrumbItem[] = [
    {
      title: "Books",
      href: booksPath(),
    },
    {
      title: book.title,
      href: bookPath(book.id),
    },
    {
      title: "Edit",
      href: "#",
    },
  ]

  const handleSubmit = (data: BookFormData) => {
    router.patch(bookPath(book.id), { book: data } as any)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={`Edit ${book.title}`} />

      <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Edit Book</h1>
            <p className="text-muted-foreground">
              Update the details of {book.title}
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href={bookPath(book.id)}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Link>
          </Button>
        </div>

        <BookForm book={book} onSubmit={handleSubmit} submitLabel="Update Book" />
      </div>
    </AppLayout>
  )
}
