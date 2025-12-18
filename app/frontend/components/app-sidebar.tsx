import { Link, usePage } from "@inertiajs/react"
import { LayoutGrid, Library, BookMarked, Users } from "lucide-react"

import { NavFooter } from "@/components/nav-footer"
import { NavMain } from "@/components/nav-main"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import { dashboardPath, booksPath, borrowingsPath, usersPath } from "@/routes"
import type { NavItem } from "@/types"

import AppLogo from "./app-logo"

const footerNavItems: NavItem[] = []

export function AppSidebar() {
  const { auth } = usePage().props
  const isLibrarian = auth?.user?.role === "librarian"

  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: dashboardPath(),
      icon: LayoutGrid,
    },
    {
      title: "Books",
      href: booksPath(),
      icon: Library,
    },
    ...(!isLibrarian
      ? [
          {
            title: "My Borrowings",
            href: borrowingsPath(),
            icon: BookMarked,
          },
        ]
      : []),
    ...(isLibrarian
      ? [
          {
            title: "Members",
            href: usersPath(),
            icon: Users,
          },
        ]
      : []),
  ]

  return (
    <Sidebar collapsible="icon" variant="inset">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href={dashboardPath()} prefetch>
                <AppLogo />
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>

      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>

      <SidebarFooter>
        <NavFooter items={footerNavItems} className="mt-auto" />
        <NavUser />
      </SidebarFooter>
    </Sidebar>
  )
}
