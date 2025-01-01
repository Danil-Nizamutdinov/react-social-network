import { AxiosResponse } from "axios";
import { api } from "./index";
import { commentReaction, CurrentChannel } from "@src/types/main";

const ChannelApi = {
  async subscribe(
    channelId: number,
    userId: number
  ): Promise<AxiosResponse<commentReaction>> {
    try {
      return api.post<commentReaction>("/channel/subscribe", {
        channelId,
        userId,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async getChannel(
    channelId?: number,
    userId?: number
  ): Promise<AxiosResponse<CurrentChannel>> {
    try {
      return api.get<CurrentChannel>("/channel/channel", {
        params: { channelId, userId },
      });
    } catch (error) {
      console.log(error);
    }
  },
  async updateDescription(
    channelId: number,
    description: string
  ): Promise<AxiosResponse<CurrentChannel>> {
    try {
      return api.post<CurrentChannel>("/channel/description", {
        channelId,
        description,
      });
    } catch (error) {
      console.log(error);
    }
  },
  async updateBackground(
    data: FormData
  ): Promise<AxiosResponse<CurrentChannel>> {
    try {
      return api.post<CurrentChannel>("/channel/background", data);
    } catch (error) {
      console.log(error);
    }
  },
};

export default ChannelApi;
