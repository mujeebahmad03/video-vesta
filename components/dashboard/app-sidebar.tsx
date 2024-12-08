"use client";

import * as React from "react";

import { NavMain } from "@/components/dashboard/nav-main";
import { NavUser } from "@/components/dashboard/nav-user";
import { TeamSwitcher } from "@/components/dashboard/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useGetWorkspace } from "@/hooks";
import { Modal } from "./modal";
import { Search } from "./search";

import { MENU_ITEMS } from "@/constants";
import { InviteUserTrigger } from "./invite-user-trigger";

export function AppSidebar({
  activeWorkspaceId,
  ...props
}: React.ComponentProps<typeof Sidebar>) {
  const workspaceId = activeWorkspaceId as string;

  const { currentWorkspace, userWorkspace } = useGetWorkspace(workspaceId);

  const menuItems = MENU_ITEMS(workspaceId);

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher activeWorkspaceId={workspaceId} />
      </SidebarHeader>
      <SidebarContent>
        {currentWorkspace?.type === "PUBLIC" &&
          userWorkspace.subscription?.plan == "PRO" && (
            <Modal
              trigger={<InviteUserTrigger />}
              title="Invite To Workspace"
              description="Invite other users to your workspace"
            >
              <Search workspaceId={workspaceId} />
            </Modal>
          )}

        <NavMain items={menuItems} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser workspaceId={workspaceId} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
