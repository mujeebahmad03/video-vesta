import { WorkspaceType } from "@/types/index.type";
import { BriefcaseBusiness } from "lucide-react";

export const WorkspaceIcon = ({
  workspace,
  iconMap,
  className = "size-4 shrink-0 text-blue-500",
}: {
  workspace?: WorkspaceType;
  iconMap: Map<string, React.ComponentType>;
  className?: string;
}) => {
  const IconComponent =
    (workspace && iconMap.get(workspace.id)) || BriefcaseBusiness;

  return (
    <div className="flex size-6 items-center justify-center rounded-sm border">
      <IconComponent className={className} />
    </div>
  );
};
