import { useMemo } from "react";

import { useQueryData } from "./use-query-data";
import { getWorkspaces } from "@/app/actions/workspace";
import { QueryKeys } from "@/constants";
import { WorkSpaceResponseDto } from "@/types/index.type";

export const useGetWorkspace = (activeWorkspaceId: string) => {
  const { data, isFetched } = useQueryData(
    [QueryKeys.USER_WORKSPACES],
    getWorkspaces
  );

  const { data: userWorkspace } = data as WorkSpaceResponseDto;

  // Memoize current workspace to improve performance
  const currentWorkspace = useMemo(
    () => userWorkspace?.workspace?.find((s) => s.id === activeWorkspaceId),
    [userWorkspace?.workspace, activeWorkspaceId]
  );

  return { isFetched, currentWorkspace, userWorkspace };
};
