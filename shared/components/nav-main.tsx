"use client"

import {
  // IconCirclePlusFilled, 
  // IconMail, 
  type Icon
} from "@tabler/icons-react"
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { Button } from "@/shared/components/ui/button"
import {
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/shared/components/ui/sidebar"

export function NavMain({
  items,
}: {
  items: {
    title: string
    url: string
    icon?: Icon
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
                <Link href={item.url} passHref>
                  <SidebarMenuButton
                    tooltip={item.title}
                    asChild
                    data-active={isActive}
                  >
                    <span>
                      {item.icon && <item.icon />}
                      <span>{item.title}</span>
                    </span>
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
