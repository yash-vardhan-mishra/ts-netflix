import axiosInstance from "./axiosInstance";
import { IResponseData, IVideoResult } from "../models";
const API_KEY = "c7cac89cea8a48e5cd3922cb3cffc5ac";
const requests = {
  fetchTrending: `/trending/all/week?api_key=${API_KEY}&language=en-US`,
  fetchNetflixOriginals: `/discover/tv?api_key=${API_KEY}&with_networks=213`,
  fetchTopRated: `/movie/top_rated?api_key=${API_KEY}&language=en-US`,
  fetchActionMovies: `/discover/movie?api_key=${API_KEY}&with_genres=28`,
  fetchComedyMovies: `/discover/movie?api_key=${API_KEY}&with_genres=35`,
  fetchHorrorMovies: `/discover/movie?api_key=${API_KEY}&with_genres=27`,
  fetchRomanceMovies: `/discover/movie?api_key=${API_KEY}&with_genres=10749`,
  fetchDocumentaries: `/discover/movie?api_key=${API_KEY}&with_genres=99`,
};
export default requests;

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

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

export const getData = async (url: string): Promise<IResponseData> => {
  try {
    const res = await axiosInstance.get(url);
    return res.data;
  } catch (error) {
    console.log(error);
    return error.message;
  }
};
