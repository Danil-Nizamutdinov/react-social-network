import { AxiosResponse } from "axios";
import { api } from "./index";
import { Chat } from "@src/types/main";

// Тоже самое что и в channel

const chatApi = {
  async getChats(userId: number): Promise<AxiosResponse<Chat[]>> {
    try {
      return api.get<Chat[]>("/chat/chats", {
        params: {
          userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  async getChat(chatId: number, userId: number): Promise<AxiosResponse<Chat>> {
    try {
      return api.get<Chat>("/chat/chat", {
        params: {
          chatId,
          userId,
        },
      });
    } catch (error) {
      console.log(error);
    }
  },
  async createChat(
    user1Id: number,
    user2Id: number
  ): Promise<AxiosResponse<Chat>> {
    try {
      return api.post<Chat>("/chat/chat", { user1Id, user2Id });
    } catch (error) {
      console.log(error.response.data.message);
    }
  },
  async deleteChat(chatId: number): Promise<void> {
    try {
      return api.delete("/chat/chat", { params: { chatId } });
    } catch (error) {
      console.log(error);
    }
  },
};

export default chatApi;
