import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APITrack, getTrack } from "../../utils/api";
import styles from "../../styles/trackInfo.module.css";

export default function Track() {
  const router = useRouter();
  const { id } = router.query;

  const [track, setTrack] = useState<APITrack>(null);

  useEffect(() => {
    if (typeof id !== "string") {
      return;
    }
    getTrack(id).then((newTrack) => {
      setTrack(newTrack);
    });
  }, [id]);
  if (!track) {
    return <div> Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <button className={styles.homeBtn} onClick={() => history.back()}>
          <img src="/home-btn.svg" />
        </button>
        <p className={styles.nowPlaying}>Now Playing</p>
      </div>
      <div className={styles.trackInfo}>
        <img className={styles.cover} src={track.cover} />
        <div className={styles.song}>{track.song}</div>
        <div className={styles.artist}>{track.artist}</div>
      </div>
      <div className={styles.player}>
        <button className={styles.backBtn}>
          {" "}
          <img src="/fast-forward.svg" />
        </button>
        <button className={styles.playBtn}>
          <img src="/Fill-4.svg" />
        </button>
        <button className={styles.forBtn}>
          <img src="/fast-forward-1.svg" />
        </button>
      </div>
    </div>
  );
}
