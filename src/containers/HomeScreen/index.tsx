import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  closePlayer,
  selectPlayerState,
  selectVideoData,
} from "../../features/videoPlayer";
import VideoPlayerComponent from "../../components/VideoPlayerComponent";
import { CATEGORIES } from "../../models";
import requests from "../../utils/requests";
import Banner from "../Banner";
import Nav from "../Nav";
import Row from "../Row";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const videoData = useSelector(selectVideoData);
  const isPlayerOpened = useSelector(selectPlayerState);
  const handleBackdropPress = () => {
    if (isPlayerOpened) {
      dispatch(closePlayer());
    }
  };
  return (
    <div className="homeScreen" onClick={handleBackdropPress}>
      {/* NAV */}
      <Nav />
      {/* BANNER */}
      <Banner />
      {/* ROW */}
      <VideoPlayerComponent
        selectedVideo={videoData}
        isOpen={isPlayerOpened}
        onRequestClose={() => dispatch(closePlayer())}
      />
      <Row
        isLargeRow
        title={CATEGORIES.TRENDING}
        fetchUrl={requests.fetchTrending}
      />
      <Row title={CATEGORIES.TOP} fetchUrl={requests.fetchTopRated} />
      <Row title={CATEGORIES.ACTION} fetchUrl={requests.fetchActionMovies} />
      <Row title={CATEGORIES.COMEDY} fetchUrl={requests.fetchComedyMovies} />
      <Row title={CATEGORIES.HORROR} fetchUrl={requests.fetchHorrorMovies} />
      <Row title={CATEGORIES.ROMANCE} fetchUrl={requests.fetchRomanceMovies} />
      <Row
        title={CATEGORIES.DOCUMENTARIES}
        fetchUrl={requests.fetchDocumentaries}
      />
    </div>
  );
};

export default HomeScreen;
