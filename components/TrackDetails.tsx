import styles from "../styles/audioplayer.module.css";

type Props = {
  cover: string;
  artist: string;
  song: string;
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
