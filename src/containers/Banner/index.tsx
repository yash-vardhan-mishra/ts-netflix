import React, { useEffect, useState } from "react";
import { IResponseResult } from "../../models";
import { truncate } from "../../utils/helperFunctions";
import requests, { getData, IMAGE_BASE_URL } from "../../utils/requests";
import "./styles.css";

const Banner = () => {
  const [movie, setMovie] = useState<IResponseResult>({} as IResponseResult);

  useEffect(() => {
    async function fetchData() {
      try {
        const data = await getData(requests.fetchNetflixOriginals);
        setMovie(
          data.results[Math.floor(Math.random() * data.results.length - 1)]
        );
      } catch (error) {
        console.log("error is,", error);
      }
    }
    fetchData();
  }, []);

  return (
    <header
      className="banner"
      style={{
        backgroundSize: "cover",
        backgroundImage: `url("${IMAGE_BASE_URL}${movie.backdrop_path}")`,
        backgroundPosition: "center center",
      }}
    >
      <div className="banner__contents">
        <h1 className="banner__title">
          {movie?.title || movie?.name || movie?.original_name}
        </h1>
        <div className="banner__buttons">
          <button className="banner__button">Play</button>
          <button className="banner__button">My List</button>
        </div>
        <h1 className="banner__description">
          {truncate(movie?.overview, 150)}
        </h1>
      </div>
      {/* to give a fade effect */}
      <div className="banner--fadeBottom" />
    </header>
  );
};

export default Banner;
