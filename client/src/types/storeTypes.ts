import {
  commentReaction,
  Chat,
  CurrentChannel,
  User,
  Video,
  Comment,
  KnownError,
  ActiveToggle,
} from "./main";

export interface ToggleState {
  activeToggle: ActiveToggle;
  isReg: boolean;
}
export interface VideoState {
  video: Video[];
  currentVideo: Video;
  comments: Comment[];
  emotion: string;
  commentReactions: commentReaction[];
}

export interface ChannelState {
  currentChannel: CurrentChannel;
  isSubscribe: boolean;
}

export interface UserState {
  isAuth: boolean;
  user: User | null;
  error: KnownError;
  isLoading: boolean;
}

export interface ChatState {
  chats: Chat[];
  chat: User | null;
  searchContacts: User[];
}
