"use client"

import * as React from "react"
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from "@/shared/components/ui/avatar"
import { Twitter } from 'lucide-react'; // Assuming lucide-react for X icon
import { mainNavItems } from "@/shared/config/nav"; // Import from config

import { NavMain } from "@/shared/components/nav-main"
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const twitterHandle = 'veerbal01';

  return (
    <Sidebar collapsible="offcanvas" {...props} className="flex flex-col h-full">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <span className="text-base font-semibold">Veerbal&apos;s AI SDK Project</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent className="flex-grow overflow-y-auto">
        <NavMain items={mainNavItems} />
      </SidebarContent>
      <div className="mt-auto p-4 border-t border-border">
        <div className="flex items-center space-x-3">
          <Avatar className="h-9 w-9">
            <AvatarImage src="/me.jpg" alt="@veerbal01" />
            <AvatarFallback>VS</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <p className="text-sm font-medium leading-none">Veerbal Singh</p>
            <Link
              href={`https://x.com/${twitterHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-sky-500 hover:text-sky-600 transition-colors flex items-center"
            >
              <Twitter className="h-3 w-3 mr-1" />
              @{twitterHandle}
            </Link>
          </div>
        </div>
      </div>
    </Sidebar>
  )
}
