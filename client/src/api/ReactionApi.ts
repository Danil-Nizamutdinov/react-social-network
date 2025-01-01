import { AxiosResponse } from "axios";
import { api } from "./index";
import { AddReactionResponse, ReactionResponse } from "@src/types/main";

const ReactionApi = {
  async getReaction(
    type: string,
    contentId: number,
    userId: number
  ): Promise<AxiosResponse<ReactionResponse>> {
    try {
      return api.get<ReactionResponse>("/reaction/reaction", {
        params: { type, contentId, userId },
      });
    } catch (error) {
      console.log(error);
    }
  },
  async getReactions(
    type: string,
    userId: number
  ): Promise<AxiosResponse<ReactionResponse[]>> {
    try {
      return api.get<ReactionResponse[]>("/reaction/reactions", {
        params: { type, userId },
      });
    } catch (error) {
      console.log(error);
    }
  },
  async addReaction(
    type: string,
    contentId: number,
    userId: number,
    emotion: number
  ): Promise<AxiosResponse<AddReactionResponse>> {
    try {
      return api.post<AddReactionResponse>("/reaction/reaction", {
        type,
        contentId,
        userId,
        emotion,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default ReactionApi;
