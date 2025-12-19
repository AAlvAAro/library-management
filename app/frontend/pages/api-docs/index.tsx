import { Head } from "@inertiajs/react"
import { Book, Users, ArrowRight } from "lucide-react"

import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "API Documentation",
    href: "/api_docs",
  },
]

export default function Index() {
  const baseUrl = window.location.origin

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="API Documentation" />

      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">API Documentation</h1>
          <p className="text-muted-foreground">
            RESTful JSON API for the Library Management System
          </p>
        </div>

        <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Badge variant="outline" className="bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200">
                TODO
              </Badge>
              Authentication
            </CardTitle>
            <CardDescription>Authentication is not yet implemented</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm mb-2">
                Currently, all API endpoints are publicly accessible without authentication.
                This is intended for development purposes only.
              </p>
            </div>
            <div className="bg-muted p-4 rounded-lg">
              <p className="text-sm font-medium mb-2">Planned Implementation:</p>
              <ul className="text-sm text-muted-foreground space-y-1 list-disc list-inside">
                <li>Token-based authentication using session IDs</li>
                <li>Authorization header: Bearer YOUR_SESSION_TOKEN</li>
                <li>Role-based access control for librarian-only endpoints</li>
                <li>API rate limiting</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold">Endpoints</h2>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Book className="h-5 w-5" />
                <CardTitle>Books</CardTitle>
              </div>
              <CardDescription>Manage book collection</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>GET</Badge>
                    <code className="text-sm">{baseUrl}/api/v1/books</code>
                  </div>
                  <p className="text-sm text-muted-foreground">List all books</p>
                  <p className="text-xs text-muted-foreground mt-1">Query params: ?query=search_term, ?filter=available|borrowed</p>
                </div>

                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>GET</Badge>
                    <code className="text-sm">{baseUrl}/api/v1/books/:id</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Get a specific book</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">POST</Badge>
                    <code className="text-sm">{baseUrl}/api/v1/books</code>
                    <Badge variant="destructive" className="text-xs">Librarian Only</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Create a new book</p>
                  <div className="bg-muted p-3 rounded mt-2 text-xs font-mono">
                    {`{
  "book": {
    "title": "Book Title",
    "author": "Author Name",
    "genre": "Fiction",
    "isbn": "1234567890",
    "total_copies": 10,
    "available_copies": 10
  }
}`}
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">PATCH</Badge>
                    <code className="text-sm">{baseUrl}/api/v1/books/:id</code>
                    <Badge variant="destructive" className="text-xs">Librarian Only</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Update a book</p>
                </div>

                <div className="border-l-4 border-red-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="destructive">DELETE</Badge>
                    <code className="text-sm">{baseUrl}/api/v1/books/:id</code>
                    <Badge variant="destructive" className="text-xs">Librarian Only</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">Delete a book</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <ArrowRight className="h-5 w-5" />
                <CardTitle>Borrowings</CardTitle>
              </div>
              <CardDescription>Manage book borrowings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>GET</Badge>
                    <code className="text-sm">{baseUrl}/api/v1/borrowings</code>
                  </div>
                  <p className="text-sm text-muted-foreground">List user's borrowings</p>
                  <p className="text-xs text-muted-foreground mt-1">Query params: ?filter=due_today|overdue</p>
                </div>

                <div className="border-l-4 border-green-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">POST</Badge>
                    <code className="text-sm">{baseUrl}/api/v1/borrowings</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Borrow a book</p>
                  <div className="bg-muted p-3 rounded mt-2 text-xs font-mono">
                    {`{
  "book_id": 1
}`}
                  </div>
                </div>

                <div className="border-l-4 border-yellow-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline">PATCH</Badge>
                    <code className="text-sm">{baseUrl}/api/v1/borrowings/:id/return</code>
                  </div>
                  <p className="text-sm text-muted-foreground">Mark a book as returned</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                <CardTitle>Members</CardTitle>
              </div>
              <CardDescription>View library members</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                <div className="border-l-4 border-blue-500 pl-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge>GET</Badge>
                    <code className="text-sm">{baseUrl}/api/v1/members</code>
                    <Badge variant="destructive" className="text-xs">Librarian Only</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">List all members</p>
                  <p className="text-xs text-muted-foreground mt-1">Query params: ?filter=overdue (shows members with overdue books)</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card className="bg-muted/50">
          <CardHeader>
            <CardTitle>Response Format</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm font-medium mb-2">Success Response:</p>
              <div className="bg-background p-3 rounded text-xs font-mono">
                {`{
  "data": { ... },
  "message": "Success message"
}`}
              </div>
            </div>
            <div>
              <p className="text-sm font-medium mb-2">Error Response:</p>
              <div className="bg-background p-3 rounded text-xs font-mono">
                {`{
  "error": "Error message",
  "details": ["Validation error 1", "Validation error 2"]
}`}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </AppLayout>
  )
}
