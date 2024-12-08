/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { currentUser } from "@clerk/nextjs/server";
import { WORKSPACE_TYPE } from "@prisma/client";
import nodemailer from "nodemailer";

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

export const sendEmail = async (
  to: string,
  subject: string,
  text: string,
  html?: string
) => {
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAILER_EMAIL,
      pass: process.env.MAILER_PASSWORD,
    },
  });

  const mailOptions = {
    to,
    subject,
    text,
    html,
  };
  return { transporter, mailOptions };
};

export const inviteMembers = async (
  workspaceId: string,
  receiverId: string,
  email: string
) => {
  try {
    const user = await currentUser();
    if (!user) return { status: 404 };
    const senderInfo = await prismaService.user.findUnique({
      where: {
        clerkId: user.id,
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
      },
    });

    if (senderInfo?.id) {
      const workspace = await prismaService.workspace.findUnique({
        where: {
          id: workspaceId,
        },
        select: {
          name: true,
        },
      });
      if (workspace) {
        const invitation = await prismaService.invite.create({
          data: {
            senderId: senderInfo.id,
            receiverId,
            workSpaceId: workspaceId,
            content: `You are invited to join ${workspace.name} Workspace, click accept to confirm`,
          },
          select: {
            id: true,
          },
        });

        await prismaService.user.update({
          where: {
            clerkId: user.id,
          },
          data: {
            notification: {
              create: {
                content: `${user.firstName} ${user.lastName} invited ${senderInfo.firstName} into ${workspace.name}`,
              },
            },
          },
        });
        if (invitation) {
          const { transporter, mailOptions } = await sendEmail(
            email,
            "You got an invitation",
            "You are invited to join ${workspace.name} Workspace, click accept to confirm",
            `<a href="${process.env.NEXT_PUBLIC_HOST_URL}/invite/${invitation.id}" style="background-color: #000; padding: 5px 10px; border-radius: 10px;">Accept Invite</a>`
          );

          transporter.sendMail(mailOptions, (error: any) => {
            if (error) {
              console.log("🔴", JSON.stringify(error.message, null, 2));
            } else {
              console.log("✅ Email send");
            }
          });
          return { status: 200, data: "Invite sent" };
        }
        return { status: 400, data: "invitation failed" };
      }
      return { status: 404, data: "workspace not found" };
    }
    return { status: 404, data: "recipient not found" };
  } catch (error) {
    console.log("Server Error: ", JSON.stringify(error, null, 2));
    return { status: 400, data: "Oops! something went wrong" };
  }
};
