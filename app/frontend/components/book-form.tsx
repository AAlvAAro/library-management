import { useForm } from "@inertiajs/react"
import { FormEvent } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface BookFormData {
  title: string
  author: string
  genre: string
  isbn: string
  total_copies: number
  available_copies: number
}

interface Props {
  book?: Partial<BookFormData>
  onSubmit: (data: BookFormData) => void
  submitLabel: string
  isSubmitting?: boolean
}

export default function BookForm({ book, onSubmit, submitLabel, isSubmitting = false }: Props) {
  const { data, setData, errors } = useForm<BookFormData>({
    title: book?.title || "",
    author: book?.author || "",
    genre: book?.genre || "",
    isbn: book?.isbn || "",
    total_copies: book?.total_copies || 1,
    available_copies: book?.available_copies || 1,
  })

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    onSubmit(data)
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Book Information</CardTitle>
          <CardDescription>
            Enter the details of the book. All fields marked with * are required.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="title">
                Title <span className="text-destructive">*</span>
              </Label>
              <Input
                id="title"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
                placeholder="Enter book title"
                required
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="author">
                Author <span className="text-destructive">*</span>
              </Label>
              <Input
                id="author"
                value={data.author}
                onChange={(e) => setData("author", e.target.value)}
                placeholder="Enter author name"
                required
              />
              {errors.author && (
                <p className="text-sm text-destructive">{errors.author}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="genre">Genre</Label>
              <Input
                id="genre"
                value={data.genre}
                onChange={(e) => setData("genre", e.target.value)}
                placeholder="e.g., Fiction, Mystery, Science"
              />
              {errors.genre && (
                <p className="text-sm text-destructive">{errors.genre}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="isbn">
                ISBN <span className="text-destructive">*</span>
              </Label>
              <Input
                id="isbn"
                value={data.isbn}
                onChange={(e) => setData("isbn", e.target.value)}
                placeholder="978-0-123456-78-9"
                required
              />
              {errors.isbn && (
                <p className="text-sm text-destructive">{errors.isbn}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="total_copies">
                Total Copies <span className="text-destructive">*</span>
              </Label>
              <Input
                id="total_copies"
                type="number"
                min="0"
                value={data.total_copies}
                onChange={(e) => setData("total_copies", parseInt(e.target.value) || 0)}
                required
              />
              {errors.total_copies && (
                <p className="text-sm text-destructive">{errors.total_copies}</p>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="available_copies">
                Available Copies <span className="text-destructive">*</span>
              </Label>
              <Input
                id="available_copies"
                type="number"
                min="0"
                max={data.total_copies}
                value={data.available_copies}
                onChange={(e) => setData("available_copies", parseInt(e.target.value) || 0)}
                required
              />
              {errors.available_copies && (
                <p className="text-sm text-destructive">{errors.available_copies}</p>
              )}
              <p className="text-xs text-muted-foreground">
                Cannot exceed total copies ({data.total_copies})
              </p>
            </div>
          </div>

          <div className="flex gap-2 justify-end">
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Saving..." : submitLabel}
            </Button>
          </div>
        </CardContent>
      </Card>
    </form>
  )
}
