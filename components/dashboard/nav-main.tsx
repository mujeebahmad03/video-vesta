"use client";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { MENU_ITEMS_TYPE } from "@/constants/menu-items";

export function NavMain({ items }: { items: MENU_ITEMS_TYPE[] }) {
  return (
    <SidebarGroup>
      <SidebarGroupLabel>Platform</SidebarGroupLabel>
      <SidebarMenu>
        {items.map(({ title, href, icon }) => (
          <SidebarMenuItem key={title}>
            <SidebarMenuButton asChild tooltip={title}>
              <a href={href}>
                {icon}
                <span>{title}</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
