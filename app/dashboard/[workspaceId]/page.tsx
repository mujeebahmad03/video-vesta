export type WorkspaceProps = {
  params: Promise<{ workspaceId: string }>;
};

const Page = async ({ params }: WorkspaceProps) => {
  const workspaceId = (await params).workspaceId;
  console.log({ workspaceId });
  return (
    <div className="">
      <h1 className="text-2xl font-bold text-white w-full">{workspaceId}</h1>
    </div>
  );
};

export default Page;
