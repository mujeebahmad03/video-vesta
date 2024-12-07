"use server";

import { currentUser } from "@clerk/nextjs/server";
import { WORKSPACE_TYPE } from "@prisma/client";

import { prismaService } from "@/lib/prisma";

export const onAuthenticatedUser = async () => {
  try {
    const user = await currentUser();

    if (!user) return { status: 403 };
    const { firstName, lastName, emailAddresses, imageUrl, id } = user;

    // Check if the user already exists
    const userExits = await prismaService.user.findUnique({
      where: { clerkId: user.id },
      include: {
        workspace: true,
        subscription: { select: { plan: true } },
      },
    });

    if (userExits) {
      // If the user exists but doesn't have a workspace, create one
      if (!userExits.workspace || userExits.workspace.length === 0) {
        const newWorkspace = await prismaService.workspace.create({
          data: {
            name: `${firstName}'s Workspace`,
            type: WORKSPACE_TYPE.PERSONAL,
            userId: userExits.id,
          },
        });

        // Return the user object with the new workspace
        return {
          status: 200,
          user: {
            ...userExits,
            workspace: [...(userExits.workspace || []), newWorkspace],
          },
        };
      }

      // User exists and has a workspace
      return { status: 200, user: userExits };
    }

    // If the user does not exist, create a new user along with their associated data
    const newUser = await prismaService.user.create({
      data: {
        firstName,
        lastName,
        email: emailAddresses[0].emailAddress,
        image: imageUrl,
        clerkId: id,
        studio: { create: {} },
        subscription: { create: {} },
        workspace: {
          create: {
            name: `${firstName}'s Workspace`,
            type: WORKSPACE_TYPE.PERSONAL,
          },
        },
      },
      include: {
        workspace: true,
        subscription: { select: { plan: true } },
      },
    });

    if (newUser) {
      console.log(JSON.stringify(newUser, null, 2));
      return { status: 201, user: newUser };
    }

    return { status: 400 };
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return { status: 500 };
  }
};

export const getNotifications = async () => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const notifications = await prismaService.user.findUnique({
      where: { clerkId: user.id },
      select: {
        notification: true,
        _count: {
          select: {
            notification: true,
          },
        },
      },
    });

    if (notifications && notifications.notification.length > 0)
      return { status: 200, data: notifications };

    return { status: 404, data: [] };
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return { status: 400, data: [] };
  }
};

export const searchUsers = async (query: string) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };

    const users = await prismaService.user.findMany({
      where: {
        OR: [
          { firstName: { contains: query } },
          { email: { contains: query } },
          { lastName: { contains: query } },
        ],
        NOT: [{ clerkId: user.id }],
      },
      select: {
        id: true,
        subscription: {
          select: {
            plan: true,
          },
        },
        firstName: true,
        lastName: true,
        image: true,
        email: true,
      },
    });

    if (users && users.length > 0) {
      return { status: 200, data: users };
    }

    return { status: 404, data: undefined };
  } catch (error) {
    console.error(JSON.stringify(error, null, 2));
    return { status: 500, data: undefined };
  }
};
