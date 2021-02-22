import styles from "../styles/trackInfo.module.css";

type Props = {
  //   id: string;
  cover: string;
  artist: string;
  song: string;
  //   audioSrc: string;
};

export default function TrackDetails(props: Props) {
  return (
    <div className={styles.trackInfo}>
      <img className={styles.cover} src={props.cover} />
      <div className={styles.song}>{props.song}</div>
      <div className={styles.artist}>{props.artist}</div>
    </div>
  );
}
