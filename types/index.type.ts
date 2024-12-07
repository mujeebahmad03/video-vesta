import { SUBSCRIPTION_PLAN, WORKSPACE_TYPE, User } from "@prisma/client";

export type WorkspaceType = {
  id: string;
  name: string;
  type: WORKSPACE_TYPE;
};

export type WorkspaceDto = {
  subscription: {
    plan: SUBSCRIPTION_PLAN;
  } | null;
  workspace: WorkspaceType[];
  members: {
    workspace: {
      id: string;
      name: string;
      type: WORKSPACE_TYPE;
    };
  }[];
};

export type WorkSpaceResponseDto = {
  data: WorkspaceDto;
};

export type NotificationDto = {
  status: number;
  data: {
    _count: {
      notification: number;
    };
  };
};

export type FolderDto = {
  status: number;
  data: {
    name: string;
    _count: {
      videos: number;
    };
  };
};

export type VideosDto = {
  status: number;
  data: {
    user: {
      firstName: string | null;
      lastName: string | null;
      image: string | null;
    } | null;
    id: string;
    processing: boolean;
    folder: {
      id: string;
      name: string;
    } | null;
    createdAt: Date;
    title: string | null;
    source: string;
  }[];
};

export type VideoDto = {
  status: number;
  data: {
    user: {
      firstName: string | null;
      lastName: string | null;
      image: string | null;
      clerkId: string;
      trial: boolean;
      subscription: {
        plan: SUBSCRIPTION_PLAN;
      } | null;
    } | null;
    title: string | null;
    description: string | null;
    source: string;
    views: number;
    createdAt: Date;
    processing: boolean;
    summery: string;
  };
  author: boolean;
};

export type CommentRepliesDto = {
  id: string;
  comment: string;
  createdAt: Date;
  commentId: string | null;
  userId: string | null;
  videoId: string | null;
  user: User | null;
};

export type VideoCommentDto = {
  data: {
    user: User | null;
    reply: CommentRepliesDto[];
    id: string;
    comment: string;
    createdAt: Date;
    commentId: string | null;
    userId: string | null;
    videoId: string | null;
  }[];
};
