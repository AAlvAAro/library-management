import { Link } from "@inertiajs/react"
import { ArrowLeft } from "lucide-react"
import type { PropsWithChildren } from "react"

import AppLogoIcon from "@/components/app-logo-icon"
import { rootPath } from "@/routes"

interface AuthLayoutProps {
  name?: string
  title?: string
  description?: string
}

export default function AuthSimpleLayout({
  children,
  title,
  description,
}: PropsWithChildren<AuthLayoutProps>) {
  return (
    <div className="bg-background flex min-h-svh flex-col">
      {/* Header with logo */}
      <header className="flex items-center gap-2 p-4 border-b-2 border-foreground">
        <Link href={rootPath()} className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          <AppLogoIcon className="h-6 w-6 fill-current" />
          <span className="font-bold text-lg">Library Management</span>
        </Link>
      </header>

      {/* Main content */}
      <main className="flex flex-1 items-center justify-center p-6 md:p-10">
        <div className="w-full max-w-md">
          <div className="border-2 border-foreground bg-card p-8 shadow-[8px_8px_0px_0px_hsl(var(--foreground))]">
            <div className="space-y-2 text-center mb-8">
              <h1 className="text-2xl font-bold">{title}</h1>
              <p className="text-muted-foreground text-sm">
                {description}
              </p>
            </div>
            {children}
          </div>
        </div>
      </main>

      {/* Footer border */}
      <footer className="border-t-2 border-foreground h-2 bg-foreground" />
    </div>
  )
}
