"use client"

import {
  // IconCirclePlusFilled, 
  // IconMail, 
  type Icon
} from "@tabler/icons-react"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"
import LoadingIndicator from "./link-loading-indicator";
import { dateCalculator } from "../lib/utils";

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
    dateCreated?: string
  }[]
}) {
  const pathname = usePathname();

  return (
    <SidebarGroup>
      <SidebarGroupContent className="flex flex-col gap-2">
        <SidebarMenu>
          {items.map((item) => {
            const isActive = pathname === item.url;
            return (
              <SidebarMenuItem key={item.title}>
                <Link href={item.url} passHref onNavigate={() => {        // Only executes during SPA navigation
                  console.log('Navigating...')

                  // Optionally prevent navigation
                  // e.preventDefault()
                }}>
                  <SidebarMenuButton
                    tooltip={item.title}
                    asChild
                    data-active={isActive}
                  >
                    <div className="flex items-center gap-2 justify-between">
                      <span className="flex items-center gap-2">
                        {item.icon && <item.icon />}
                        <span className="text-sm truncate max-w-[17ch]">{item.title}</span>
                      </span>
                      {item.dateCreated && (
                        <span className="text-xs text-gray-500">
                          {dateCalculator(item.dateCreated) < 5 ? <span className="text-green-500 inline-block rounded-full px-2 py-1 text-xs bg-green-500/10">New</span> : null}
                        </span>
                      )}
                      <LoadingIndicator />
                    </div>

                  </SidebarMenuButton>
                </Link>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}
