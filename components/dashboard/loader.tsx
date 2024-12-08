import React from "react";

import { cn } from "@/lib/utils";
import { Loader2 } from "lucide-react";

type Props = {
  state: boolean;
  className?: string;
  color?: string;
  children?: React.ReactNode;
};

const Loader = ({ state, className, children }: Props) => {
  return state ? (
    <div className={cn(className)}>
      <Loader2 className="animate-spin" />
    </div>
  ) : (
    children
  );
};

export default Loader;
