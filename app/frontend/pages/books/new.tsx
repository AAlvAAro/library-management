import { Head, Link, router } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react"

import AppLayout from "@/layouts/app-layout"
import { Button } from "@/components/ui/button"
import BookForm from "@/components/book-form"
import { booksPath } from "@/routes"
import type { BreadcrumbItem } from "@/types"

interface BookFormData {
  title: string
  author: string
  genre: string
  isbn: string
  total_copies: number
  available_copies: number
}

interface Props {
  book: Partial<BookFormData>
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Books",
    href: booksPath(),
  },
  {
    title: "New Book",
    href: "#",
  },
]

export default function New({ book }: Props) {
  const handleSubmit = (data: BookFormData) => {
    router.post(booksPath(), { book: data } as any)
  }

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="New Book" />

      <div className="flex flex-col gap-6 p-6 max-w-4xl mx-auto">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Add New Book</h1>
            <p className="text-muted-foreground">
              Add a new book to the library collection
            </p>
          </div>
          <Button asChild variant="ghost">
            <Link href={booksPath()}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Cancel
            </Link>
          </Button>
        </div>

        <BookForm book={book} onSubmit={handleSubmit} submitLabel="Create Book" />
      </div>
    </AppLayout>
  )
}
