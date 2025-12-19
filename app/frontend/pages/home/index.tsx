import { Head, Link, usePage } from "@inertiajs/react"
import { ArrowRight, BookOpen, Clock, Users, Shield } from "lucide-react"

import AppLogoIcon from "@/components/app-logo-icon"
import { Button } from "@/components/ui/button"
import { dashboardPath, signInPath, signUpPath } from "@/routes"

export default function Welcome() {
  const page = usePage()
  const { auth } = page.props

  return (
    <>
      <Head title="Library Management" />

      <div className="flex min-h-screen flex-col bg-background text-foreground">
        {/* Header */}
        <header className="flex items-center justify-between px-6 py-4 border-b-2 border-foreground">
          <div className="flex items-center gap-2">
            <AppLogoIcon className="h-6 w-6" />
            <span className="font-bold text-lg">Library Management</span>
          </div>
          <nav className="flex items-center gap-4">
            {auth.user ? (
              <Button asChild className="border-2 border-foreground">
                <Link href={dashboardPath()}>Dashboard</Link>
              </Button>
            ) : (
              <>
                <Link href={signInPath()} className="font-medium hover:underline">
                  Login
                </Link>
                <Button asChild className="border-2 border-foreground">
                  <Link href={signUpPath()}>Get Started</Link>
                </Button>
              </>
            )}
          </nav>
        </header>

        {/* Hero Section */}
        <section className="px-6 py-16 md:py-24 border-b-2 border-foreground">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-tight mb-6">
              Modern Library<br />Management
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8">
              Streamline your library operations with our powerful book management system. Track borrowings, manage inventory, and serve your members better.
            </p>

            <div className="flex flex-wrap gap-4">
              {auth.user ? (
                <Button asChild size="lg" className="border-2 border-foreground gap-2">
                  <Link href={dashboardPath()}>
                    Go to Dashboard
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              ) : (
                <>
                  <Button asChild size="lg" className="border-2 border-foreground gap-2">
                    <Link href={signUpPath()}>
                      Start Free
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="lg" className="border-2 border-foreground">
                    <Link href={signInPath()}>Sign In</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="px-6 py-16 border-b-2 border-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-12">Everything you need</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="border-2 border-foreground p-6">
              <BookOpen className="h-8 w-8 mb-4" />
              <h3 className="font-bold text-lg mb-3">Book Management</h3>
              <p className="text-muted-foreground text-sm">
                Add, edit, and manage your entire book collection. Track titles, authors, genres, ISBN numbers, and available copies in one place.
              </p>
            </div>
            <div className="border-2 border-foreground p-6">
              <Clock className="h-8 w-8 mb-4" />
              <h3 className="font-bold text-lg mb-3">Borrowing System</h3>
              <p className="text-muted-foreground text-sm">
                Seamlessly track book borrowings and returns. Automatic due date calculation and overdue notifications keep everyone informed.
              </p>
            </div>
            <div className="border-2 border-foreground p-6">
              <Users className="h-8 w-8 mb-4" />
              <h3 className="font-bold text-lg mb-3">Member Dashboard</h3>
              <p className="text-muted-foreground text-sm">
                Members can browse books, track their borrowings, and see due dates. A personalized experience for every library user.
              </p>
            </div>
          </div>
        </section>

        {/* Two Roles Section */}
        <section className="px-6 py-16 border-b-2 border-foreground">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Two Roles, One System</h2>
          <p className="text-muted-foreground mb-12 max-w-xl">
            Our system is designed with clear role separation to ensure smooth library operations.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Librarian Card */}
            <div className="border-2 border-foreground overflow-hidden">
              <div className="bg-foreground text-background px-6 py-4 flex items-center gap-3">
                <Shield className="h-5 w-5" />
                <span className="font-bold">Librarian</span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">Add, edit, and delete books from the catalog</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">Mark borrowed books as returned</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">View total books and borrowing statistics</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">Monitor overdue books and member activity</span>
                </div>
              </div>
            </div>

            {/* Member Card */}
            <div className="border-2 border-foreground overflow-hidden">
              <div className="bg-foreground text-background px-6 py-4 flex items-center gap-3">
                <Users className="h-5 w-5" />
                <span className="font-bold">Member</span>
              </div>
              <div className="p-6 space-y-3">
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">Browse and search the book catalog</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">Borrow available books (one copy per book)</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">View borrowed books with due dates</span>
                </div>
                <div className="flex items-start gap-3">
                  <ArrowRight className="h-4 w-4 mt-1 flex-shrink-0" />
                  <span className="text-sm">Track overdue books and borrowing history</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="px-6 py-24 bg-foreground text-background text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to get started?</h2>
          <p className="text-background/70 mb-8 max-w-md mx-auto">
            Join Library Management today and transform how you manage your library.
          </p>
          {auth.user ? (
            <Button asChild variant="outline" size="lg" className="border-2 border-background bg-background text-foreground hover:bg-background/90">
              <Link href={dashboardPath()}>Go to Dashboard</Link>
            </Button>
          ) : (
            <Button asChild variant="outline" size="lg" className="border-2 border-background bg-background text-foreground hover:bg-background/90">
              <Link href={signUpPath()}>Create Your Account</Link>
            </Button>
          )}
        </section>

        {/* Footer */}
        <footer className="px-6 py-6 bg-foreground text-background flex items-center justify-between">
          <div className="flex items-center gap-2">
            <AppLogoIcon className="h-5 w-5" />
            <span className="font-bold">Library Management</span>
          </div>
        </footer>
      </div>
    </>
  )
}
