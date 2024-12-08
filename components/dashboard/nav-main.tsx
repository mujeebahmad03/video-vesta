"use client";

import { getNotifications } from "@/app/actions/user";
import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { QueryKeys } from "@/constants";
import { MENU_ITEMS_TYPE } from "@/constants/menu-items";
import { useQueryData } from "@/hooks";
import { NotificationDto } from "@/types/index.type";

export function NavMain({ items }: { items: MENU_ITEMS_TYPE[] }) {
  const { data: notifications } = useQueryData(
    [QueryKeys.USER_NOTIFICATIONS],
    getNotifications
  );

  const { data: count } = notifications as NotificationDto;

  return (
    <SidebarGroup>
      <SidebarGroupLabel>Menu</SidebarGroupLabel>
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
