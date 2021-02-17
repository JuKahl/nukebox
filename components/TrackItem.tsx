import styles from "../styles/TrackItem.module.css";

type Props = {
  cover: string;
  artist: string;
  song: string;
};

export default function TrackItem(props: Props) {
  return (
    <li className={styles.trackItem}>
      <img className={styles.cover} src={props.cover} />
      <div className={styles.song}>{props.song}</div>
      <div className={styles.artist}>{props.artist}</div>
    </li>
  );
}
