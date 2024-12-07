import React, { useEffect, useState } from "react";

import { availableIcons } from "@/components/dashboard";
import { WorkspaceDto } from "@/types/index.type";

export const useIcon = (isFetched: boolean, userWorkspace: WorkspaceDto) => {
  const [iconMap, setIconMap] = useState<Map<string, React.FC>>(new Map());

  // Shuffle and assign icons to workspaces
  useEffect(() => {
    if (isFetched && userWorkspace) {
      // Shuffle icons and assign them to workspaces
      const shuffledIcons = [...availableIcons].sort(() => Math.random() - 0.5);
      const newIconMap = new Map<string, React.FC>();

      userWorkspace.workspace.forEach((workspace, index) => {
        newIconMap.set(
          workspace.id,
          shuffledIcons[index % shuffledIcons.length]
        );
      });

      setIconMap(newIconMap);
    }
  }, [isFetched, userWorkspace]);

  return { iconMap };
};
