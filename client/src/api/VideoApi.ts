import { AxiosResponse } from "axios";
import { api, apiDefault } from "./index";
import { Video, VideoResponse } from "@src/types/main";

const VideoApi = {
  async getVideos(
    page?: number,
    limit?: number
  ): Promise<AxiosResponse<VideoResponse>> {
    try {
      return apiDefault.get<VideoResponse>("/video/videos", {
        params: { page, limit },
      });
    } catch (error) {
      console.log(error);
    }
  },
  async getVideo(videoId: number): Promise<AxiosResponse<VideoResponse>> {
    try {
      return apiDefault.get<VideoResponse>("/video/video", {
        params: { videoId },
      });
    } catch (error) {
      console.log(error);
    }
  },
  async addVideo(data: FormData): Promise<AxiosResponse<Video>> {
    try {
      return await api.post<Video>("/video/video", data);
    } catch (error) {
      console.log(error);
    }
  },
  async createComment(
    userId: number,
    videoId: number,
    content: string
  ): Promise<AxiosResponse<Comment>> {
    try {
      return api.post<Comment>("comment/comment", {
        userId,
        videoId,
        content,
      });
    } catch (error) {
      console.log(error);
    }
  },
};

export default VideoApi;
