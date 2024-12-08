import { Bell, CreditCard, Home, LibraryBig, Settings2 } from "lucide-react";

export type MENU_ITEMS_TYPE = {
  title: string;
  href: string;
  icon: React.ReactNode;
};

export const MENU_ITEMS = (workspaceId: string): MENU_ITEMS_TYPE[] => [
  { title: "Home", href: `/dashboard/${workspaceId}`, icon: <Home /> },
  {
    title: "My Library",
    href: `/dashboard/${workspaceId}/library`,
    icon: <LibraryBig />,
  },
  {
    title: "Notifications",
    href: `/dashboard/${workspaceId}/notifications`,
    icon: <Bell />,
  },
  {
    title: "Billing",
    href: `/dashboard/${workspaceId}/billing`,
    icon: <CreditCard />,
  },
  {
    title: "Settings",
    href: `/dashboard/${workspaceId}/settings`,
    icon: <Settings2 />,
  },
];
