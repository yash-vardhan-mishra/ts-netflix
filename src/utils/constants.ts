export const API_KEY = "c7cac89cea8a48e5cd3922cb3cffc5ac";

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

export const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/original/";

export const NAV_LOGO = "https://assets.stickpng.com/images/580b57fcd9996e24bc43c529.png"

export const NAV_AVATAR = "https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"

export default requests;

