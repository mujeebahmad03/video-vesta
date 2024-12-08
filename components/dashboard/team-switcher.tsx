"use client";

import { ChevronsUpDown } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";

import { useGetWorkspace, useIcon } from "@/hooks";
import { WORKSPACES } from "@/redux/slices/workspaces";
import { WorkspaceIcon } from "./workspace-icon";

export function TeamSwitcher({
  activeWorkspaceId,
}: {
  activeWorkspaceId: string;
}) {
  const { isMobile } = useSidebar();
  const dispatch = useDispatch();
  const { push } = useRouter();

  const { isFetched, userWorkspace, currentWorkspace } =
    useGetWorkspace(activeWorkspaceId);

  const { iconMap } = useIcon(isFetched, userWorkspace);

  // Handle workspace change
  const onChangeActiveWorkspace = (value: string) => {
    push(`/dashboard/${value}`);
  };

  // Dispatch workspaces to Redux store when data is fetched
  useEffect(() => {
    if (isFetched && userWorkspace) {
      dispatch(WORKSPACES({ workspaces: userWorkspace.workspace }));
    }
  }, [isFetched, userWorkspace, dispatch]);

  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <SidebarMenuButton
              size="lg"
              className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              {/* Current Workspace Icon */}
              <div className="flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground">
                <WorkspaceIcon
                  workspace={currentWorkspace}
                  iconMap={iconMap}
                  className="size-4 text-accent-primary"
                />
              </div>

              {/* Current Workspace Details */}
              <div className="grid flex-1 text-left text-sm leading-tight">
                <span className="truncate font-semibold">
                  {currentWorkspace?.name}
                </span>
                <span className="truncate text-xs">
                  {userWorkspace.subscription?.plan}
                </span>
              </div>
              <ChevronsUpDown className="ml-auto" />
            </SidebarMenuButton>
          </DropdownMenuTrigger>

          {/* Dropdown Content */}
          <DropdownMenuContent
            className="w-[--radix-dropdown-menu-trigger-width] min-w-56 rounded-lg"
            align="start"
            side={isMobile ? "bottom" : "right"}
            sideOffset={4}
          >
            {/* Owned Workspaces */}
            <DropdownMenuLabel className="text-xs text-muted-foreground">
              Workspace
            </DropdownMenuLabel>
            {userWorkspace.workspace?.map((ws, index) => (
              <DropdownMenuItem
                key={ws.id}
                onClick={() => onChangeActiveWorkspace(ws.id)}
                className="gap-2 p-2"
              >
                <WorkspaceIcon workspace={ws} iconMap={iconMap} />
                {ws.name}
                <DropdownMenuShortcut>⌘{index + 1}</DropdownMenuShortcut>
              </DropdownMenuItem>
            ))}

            {/* Member Workspaces */}
            {userWorkspace.members.length > 0 && (
              <>
                <DropdownMenuSeparator />
                {userWorkspace.members
                  .filter((member) => member.workspace)
                  .map(({ workspace }) => (
                    <DropdownMenuItem
                      className="gap-2 p-2"
                      key={workspace!.id}
                      onClick={() => onChangeActiveWorkspace(workspace!.id)}
                    >
                      <WorkspaceIcon
                        workspace={workspace}
                        iconMap={iconMap}
                        className="size-4 shrink-0 text-green-500"
                      />
                      {workspace!.name}
                    </DropdownMenuItem>
                  ))}
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
