import { Head, Link } from "@inertiajs/react"
import { Users, AlertCircle, BookOpen } from "lucide-react"

import AppLayout from "@/layouts/app-layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { usersPath, bookPath } from "@/routes"
import type { BreadcrumbItem } from "@/types"

interface Book {
  id: number
  title: string
  author: string
  isbn: string
}

interface Borrowing {
  id: number
  borrowed_at: string
  due_date: string
  overdue?: boolean
  book: Book
}

interface Member {
  id: number
  name: string
  email: string
  borrowings: Borrowing[]
}

interface Props {
  members: Member[]
}

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Members",
    href: usersPath(),
  },
]

export default function Index({ members }: Props) {
  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title="Members with Overdue Books" />

      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Members with Overdue Books</h1>
          <p className="text-muted-foreground">
            View members who have overdue borrowings
          </p>
        </div>

        {members.length === 0 ? (
          <Card>
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Users className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">No overdue books</p>
              <p className="text-sm text-muted-foreground">
                All members have returned their books on time
              </p>
            </CardContent>
          </Card>
        ) : (
          <div className="grid gap-4">
            {members.map((member) => (
              <Card key={member.id} className="border-destructive/50">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle>{member.name}</CardTitle>
                      <CardDescription>{member.email}</CardDescription>
                    </div>
                    <Badge variant="destructive">
                      {member.borrowings.filter(b => b.overdue).length} Overdue
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-sm">Overdue Books:</h4>
                    {member.borrowings
                      .filter(b => b.overdue)
                      .map((borrowing) => (
                        <div
                          key={borrowing.id}
                          className="flex items-start justify-between p-3 bg-destructive/10 rounded-lg"
                        >
                          <div className="flex-1">
                            <Link
                              href={bookPath(borrowing.book.id)}
                              className="font-medium hover:underline"
                            >
                              {borrowing.book.title}
                            </Link>
                            <p className="text-sm text-muted-foreground">
                              by {borrowing.book.author}
                            </p>
                            <div className="flex items-center gap-2 mt-2 text-sm">
                              <AlertCircle className="h-4 w-4 text-destructive" />
                              <span className="text-destructive">
                                Due: {new Date(borrowing.due_date).toLocaleDateString()}
                              </span>
                            </div>
                          </div>
                          <Badge variant="outline" className="text-xs">
                            {borrowing.book.isbn}
                          </Badge>
                        </div>
                      ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {members.length > 0 && (
          <p className="text-sm text-muted-foreground text-center">
            Showing {members.length} {members.length === 1 ? "member" : "members"} with overdue books
          </p>
        )}
      </div>
    </AppLayout>
  )
}
