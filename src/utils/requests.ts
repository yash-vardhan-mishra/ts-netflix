import axiosInstance from "./axiosInstance";
import { IResponseData, IVideoResult } from "../models";
import { API_KEY } from "./constants";

export const fetchVideo = async (movie_id: number): Promise<IVideoResult> => {
  try {
    const res = await axiosInstance.get(
      `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${API_KEY}&language=en-US&type=Trailer&site=YouTube`
    );
    return res.data.results[0];
  } catch (error) {
    console.log("error in fetching movie video", error);
    return error.status_message;
  }
};

export const getData = async (url: string): Promise<IResponseData> => {
  try {
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
