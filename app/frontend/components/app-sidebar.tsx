import { Link, usePage } from "@inertiajs/react"
import { BookOpen, Folder, LayoutGrid, Library } from "lucide-react"

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
import { dashboardPath, booksPath } from "@/routes"
import type { NavItem } from "@/types"

import AppLogo from "./app-logo"

const footerNavItems: NavItem[] = [
  {
    title: "Repository",
    href: "https://github.com/inertia-rails/react-starter-kit",
    icon: Folder,
  },
  {
    title: "Documentation",
    href: "https://inertia-rails.dev",
    icon: BookOpen,
  },
]

export function AppSidebar() {
  const { auth } = usePage().props
  const isLibrarian = auth?.user?.role === "librarian"

  const mainNavItems: NavItem[] = [
    {
      title: "Dashboard",
      href: dashboardPath(),
      icon: LayoutGrid,
    },
    ...(isLibrarian
      ? [
          {
            title: "Books",
            href: booksPath(),
            icon: Library,
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
