import styles from "../styles/audioplayer.module.css";
import AudioControls from "./AudioControls";
import TrackDetails from "./TrackDetails";
import { useEffect, useState, useRef } from "react";
import { APITrack } from "../utils/api";
import useLocalStorage from "../hooks/localStorage";

type AudioItems = {
  tracks: APITrack[];
  initialID: string | string[];
};

const AudioPlayer = ({ tracks, initialID }: AudioItems) => {
  const initialTrackIndex = tracks.findIndex((track) => track.id === initialID);

  const [trackIndex, setTrackIndex] = useState(initialTrackIndex);
  const [trackProgress, setTrackProgress] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const { audioSrc, cover, artist, song } = tracks[trackIndex];

  const audioRef = useRef(new Audio(audioSrc));
  const intervalRef = useRef();
  const isReady = useRef(false);

  const { duration } = audioRef.current;

  const id = typeof initialID === "string" ? initialID : initialID[0];

  const [favoriteSongs, setFavoriteSongs] = useLocalStorage<string[]>(
    "favoriteSongs",
    []
  );

  const favorite = favoriteSongs.includes(id);

  const handleFavorteClick = () => {
    if (favorite) {
      const newFavoriteSongs = favoriteSongs.filter(
        (favoriteSong) => favoriteSong !== initialID
      );
      setFavoriteSongs(newFavoriteSongs);
    } else {
      setFavoriteSongs([...favoriteSongs, id]);
    }
  };

  const toPrevTrack = () => {
    if (trackIndex - 1 < 0) {
      setTrackIndex(tracks.length - 1);
    } else {
      setTrackIndex(trackIndex - 1);
    }
  };

  const toNextTrack = () => {
    if (trackIndex < tracks.length - 1) {
      setTrackIndex(trackIndex + 1);
    } else {
      setTrackIndex(0);
    }
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    return () => {
      audioRef.current.pause();
      clearInterval(intervalRef.current);
    };
  }, []);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    } else {
      isReady.current = true;
    }
  }, [trackIndex]);

  const startTimer = () => {
    clearInterval(intervalRef.current);

    intervalRef.current = setInterval(() => {
      if (audioRef.current.ended) {
        toNextTrack();
      } else {
        setTrackProgress(audioRef.current.currentTime);
      }
    }, [1000]);
  };

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
      startTimer();
    } else {
      clearInterval(intervalRef.current);
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    audioRef.current.pause();

    audioRef.current = new Audio(audioSrc);
    setTrackProgress(audioRef.current.currentTime);

    if (isReady.current) {
      audioRef.current.play();
      setIsPlaying(true);
      startTimer();
    }
  }, [trackIndex]);

  const onScrub = (value) => {
    clearInterval(intervalRef.current);
    audioRef.current.currentTime = value;
    setTrackProgress(audioRef.current.currentTime);
  };

  const onScrubEnd = () => {
    if (!isPlaying) {
      setIsPlaying(true);
    }
    startTimer();
  };

  const currentPercentage = duration
    ? `${(trackProgress / duration) * 100}%`
    : "0%";
  const trackStyling = `-webkit-gradient(linear, 0% 0%, 100% 0%, color-stop(${currentPercentage}, #fff), color-stop(${currentPercentage}, #777))
      `;

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.homeBtn} onClick={() => history.back()}>
          <img src="/home-btn.svg" />
        </button>
        <p className={styles.nowPlaying}>Now Playing</p>
        <button className={styles.likeBtn} onClick={handleFavorteClick}>
          {favorite ? "💘" : "🖤"}
        </button>
      </div>
      <TrackDetails cover={cover} artist={artist} song={song} />
      <div className={styles.player}>
        <input
          type="range"
          value={trackProgress}
          step="1"
          min="0"
          max={duration ? duration : `${duration}`}
          className={styles.progress}
          onChange={(e) => onScrub(e.target.value)}
          onMouseUp={onScrubEnd}
          onKeyUp={onScrubEnd}
          style={{ background: trackStyling }}
        />
        <AudioControls
          isPlaying={isPlaying}
          onPrevClick={toPrevTrack}
          onNextClick={toNextTrack}
          onPlayPauseClick={setIsPlaying}
        />
      </div>
    </div>
  );
};
export default AudioPlayer;
