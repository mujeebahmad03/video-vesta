import { PlusCircle } from "lucide-react";
import { Button } from "../ui/button";

export const InviteUserTrigger = () => {
  return (
    <Button>
      <PlusCircle size={15} className="text-blue-800/90 fill-blue-500" />
      <span className="text-blue-400 font-semibold text-xs">
        Invite To Workspace
      </span>
    </Button>
  );
};
