export type KnownError = {
  errorMessage: string | null;
};

export enum ActiveToggle {
  SEARCH = "search",
  MENU = "menu",
  PROFILE = "profile",
  LOGIN = "login",
  ADD_VIDEO = "addVideo",
  DESCRIPTION = "description",
  BACKGROUND = "background",
  NONE = null,
}

export interface Video {
  channel?: CurrentChannel;
  channelId: number;
  createdAt: string;
  description: string;
  dislike: number;
  id: number;
  like: number;
  preview: string;
  title: string;
  updatedAt: string;
  video: string;
}

export interface commentReaction {
  contentId: number;
  createdAt: string;
  emotion: number;
  id: number;
  type: string;
  updatedAt: string;
  userId: number;
}

export interface CurrentChannel {
  avatar: string;
  background: string;
  createdAt: string;
  description: string;
  id: number;
  name: string;
  subscribers: number;
  updatedAt: string;
  user: User;
  userId: number;
  videos?: Video[];
}

export interface Comment {
  content: string;
  createdAt: string;
  dislike: number;
  id: number;
  like: number;
  updatedAt: string;
  user?: User;
  userId: number;
  videoId: number;
}

export interface User {
  avatar: string;
  id: number;
  login: string;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
}

export interface ReactionResponse {
  contentId: number;
  createdAt: string;
  emotion: number;
  id: number;
  type: string;
  updatedAt: string;
  userId: number;
}

export interface AddReactionResponse {
  reaction: ReactionResponse;
  r: Video;
}

export interface VideoResponse {
  comments: Comment[];
  video: Video;
}

export interface Chat {
  id: number;
  lastMessage: string;
  updatedAt: string;
  user1Id: number;
  user2Id: number;
  users: User[];
}
