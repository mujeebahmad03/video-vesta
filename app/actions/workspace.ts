"use server";

import { currentUser } from "@clerk/nextjs/server";
import { prismaService } from "@/lib/prisma";

export const verifyAccessToWorkspace = async (workspaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 403 };

    const isUserInWorkspace = await prismaService.workspace.findUnique({
      where: {
        id: workspaceId,
        OR: [
          { user: { clerkId: user.id } },
          { members: { every: { user: { clerkId: user.id } } } },
        ],
      },
    });

    return {
      status: 200,
      data: { workspace: isUserInWorkspace },
    };
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return {
      status: 403,
      data: { workspace: null },
    };
  }
};

export const getWorkspaceFolders = async (workSpaceId: string) => {
  try {
    const isFolders = await prismaService.folder.findMany({
      where: { workSpaceId },
      include: { _count: { select: { videos: true } } },
    });

    if (isFolders && isFolders.length > 0) {
      return { status: 200, data: isFolders };
    }

    return { status: 404, data: [] };
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return { status: 403, data: [] };
  }
};

export const getAllUserVideos = async (workSpaceId: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const videos = await prismaService.video.findMany({
      where: {
        OR: [{ workSpaceId }, { folderId: workSpaceId }],
      },
      select: {
        id: true,
        title: true,
        createdAt: true,
        source: true,
        processing: true,
        folder: {
          select: {
            id: true,
            name: true,
          },
        },
        user: {
          select: {
            firstName: true,
            lastName: true,
            image: true,
          },
        },
      },
      orderBy: {
        createdAt: "asc",
      },
    });

    if (videos && videos.length > 0) {
      return { status: 200, data: videos };
    }

    return { status: 404 };
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return { status: 400 };
  }
};

export const getWorkspaces = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 404 };

    const workspaces = await prismaService.user.findUnique({
      where: { clerkId: user.id },
      select: {
        subscription: {
          select: {
            plan: true,
          },
        },
        workspace: {
          select: {
            id: true,
            name: true,
            type: true,
          },
        },
        members: {
          select: {
            workspace: {
              select: {
                id: true,
                name: true,
                type: true,
              },
            },
          },
        },
      },
    });

    if (workspaces) {
      return { status: 200, data: workspaces };
    }
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return { status: 400 };
  }
};
