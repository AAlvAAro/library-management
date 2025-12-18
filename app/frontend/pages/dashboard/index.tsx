import { Head, Link, usePage } from "@inertiajs/react"
import { Library, BookMarked, Users } from "lucide-react"

import AppLayout from "@/layouts/app-layout"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { dashboardPath, booksPath, borrowingsPath, usersPath } from "@/routes"
import type { BreadcrumbItem } from "@/types"

const breadcrumbs: BreadcrumbItem[] = [
  {
    title: "Dashboard",
    href: dashboardPath(),
  },
]

export default function Dashboard() {
  const { auth } = usePage().props
  const isLibrarian = auth?.user?.role === "librarian"

  return (
    <AppLayout breadcrumbs={breadcrumbs}>
      <Head title={breadcrumbs[breadcrumbs.length - 1].title} />

      <div className="flex flex-col gap-6 p-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
          <p className="text-muted-foreground">
            Welcome back, {auth?.user?.name}
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link href={booksPath()}>
            <Card className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-lg">
                    <Library className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <CardTitle>Books</CardTitle>
                    <CardDescription>
                      {isLibrarian ? "Manage book collection" : "Browse available books"}
                    </CardDescription>
                  </div>
                </div>
              </CardHeader>
            </Card>
          </Link>

          {!isLibrarian && (
            <Link href={borrowingsPath()}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <BookMarked className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>My Borrowings</CardTitle>
                      <CardDescription>
                        View your borrowed books
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )}

          {isLibrarian && (
            <Link href={usersPath()}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <div className="p-3 bg-primary/10 rounded-lg">
                      <Users className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <CardTitle>Members</CardTitle>
                      <CardDescription>
                        View members with overdue books
                      </CardDescription>
                    </div>
                  </div>
                </CardHeader>
              </Card>
            </Link>
          )}
        </div>
      </div>
    </AppLayout>
  )
}
