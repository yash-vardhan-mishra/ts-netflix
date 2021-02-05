import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IResponseResult } from "../../models";
import { selectPlayerState, setVideoData } from "../../features/videoPlayer";
import { truncate } from "../../utils/helperFunctions";
import { fetchVideo, getData } from "../../utils/requests";
import "./styles.css";
import { openPlayer } from "../../features/videoPlayer";
import { IMAGE_BASE_URL } from "../../utils/constants";

interface RowProps {
  title: string;
  fetchUrl: string;
  isLargeRow: boolean;
}
function Row({ title, fetchUrl, isLargeRow }: RowProps) {
  const dispatch = useDispatch();
  const isPlayerOpened = useSelector(selectPlayerState);
  const [movies, setMovies] = useState<IResponseResult[]>([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(fetchUrl);
        setMovies(data.results);
      } catch (error) {
        console.log("error is, ", error);
      }
    }
    fetchData();
  }, [fetchUrl]);

  async function getVideo(id: number) {
    try {
      const res = await fetchVideo(id);
      if (res.key) {
        dispatch(setVideoData(res));
        dispatch(openPlayer());
      }
    } catch (error) {
      console.log("error is, ", error);
    }
  }

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row__posters">
        {movies.map((movie) => {
          const movieName = movie.title || movie.name || movie.original_name;
          return (isLargeRow && movie.poster_path) ||
            (!isLargeRow && movie.backdrop_path) ? (
            <span
              key={movie.id}
              className={`image__container ${
                isLargeRow && "largeImage__container"
              }`}
            >
              <img
                onClick={!isPlayerOpened ? () => getVideo(movie.id) : undefined}
                className={`row__poster ${isLargeRow && "row__posterLarge"}`}
                src={`${IMAGE_BASE_URL}${
                  isLargeRow ? movie.poster_path : movie.backdrop_path
                }`}
                alt={movie.name}
              />
              <p className="movie_name">{truncate(movieName, 36)}</p>
            </span>
          ) : null;
        })}
      </div>
    </div>
  );
}

Row.defaultProps = {
  isLargeRow: false,
};

export default Row;
