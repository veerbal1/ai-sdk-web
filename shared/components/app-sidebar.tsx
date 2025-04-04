"use client"

import * as React from "react"
import {
  IconDashboard,
  IconInnerShadowTop,
  IconFileAi,
} from "@tabler/icons-react"

import { NavMain } from "@/shared/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"

const mainNavItems = [
  {
    title: "Web Search Agent",
    url: "/web-search-agent",
    icon: IconFileAi,
  },
  {
    title: 'Test',
    url: '/test',
    icon: IconFileAi,
  }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">Veerbal's AI SDK Project</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={mainNavItems} />
      </SidebarContent>
    </Sidebar>
  )
}
