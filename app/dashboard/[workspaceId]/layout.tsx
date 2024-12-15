import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { redirect } from "next/navigation";

import { AppSidebar } from "@/components/dashboard";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";

import { onAuthenticatedUser } from "@/app/actions/user";
import {
  getWorkspaces,
  verifyAccessToWorkspace,
} from "@/app/actions/workspace";
import { QueryKeys } from "@/constants";

type LayoutProps = {
  params: Promise<{ workspaceId: string }>;
  children: React.ReactNode;
};

export default async function Layout({ params, children }: LayoutProps) {
  const workspaceId = (await params).workspaceId;

  const auth = await onAuthenticatedUser();

  if (!auth.user?.workspace) redirect("/sign-in");

  if (!auth.user.workspace.length) redirect("/sign-in");

  const hasAccess = await verifyAccessToWorkspace(workspaceId);

  if (hasAccess.status !== 200) {
    redirect(`/dashboard/${auth.user?.workspace[0].id}`);
  }

  if (!hasAccess.data?.workspace) return null;

  const query = new QueryClient();

  await query.prefetchQuery({
    queryKey: [QueryKeys.USER_WORKSPACES],
    queryFn: () => getWorkspaces(),
  });

  return (
    <HydrationBoundary state={dehydrate(query)}>
      <SidebarProvider>
        <AppSidebar activeWorkspaceId={workspaceId} />
        <SidebarInset>
          <header className="flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-12">
            <div className="flex items-center gap-2 px-4">
              <SidebarTrigger className="-ml-1" />
              <Separator orientation="vertical" className="mr-2 h-4" />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem className="hidden md:block">
                    <BreadcrumbLink href="#">
                      Building Your Application
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  <BreadcrumbSeparator className="hidden md:block" />
                  <BreadcrumbItem>
                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                  </BreadcrumbItem>
                </BreadcrumbList>
              </Breadcrumb>
            </div>
          </header>

          <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
            <div className="grid auto-rows-min gap-4 md:grid-cols-3">
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
              <div className="aspect-video rounded-xl bg-muted/50" />
            </div>
            <div className="min-h-[100vh] flex-1 rounded-xl bg-muted/50 md:min-h-min" />
            {children}
          </div>
        </SidebarInset>
      </SidebarProvider>
    </HydrationBoundary>
  );
}
