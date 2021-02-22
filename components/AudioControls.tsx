import styles from "../styles/trackInfo.module.css";

const AudioControls = ({
  isPlaying,
  onPlayPauseClick,
  onPrevClick,
  onNextClick,
}) => (
  <div className={styles.audiocontrols}>
    <button className={styles.backBtn} onClick={onPrevClick}>
      <img src="/fast-backward.svg" />
    </button>
    {isPlaying ? (
      <button
        className={styles.playBtn}
        onClick={() => onPlayPauseClick(false)}
      >
        <img src="/Fill-4.svg" />
      </button>
    ) : (
      <button className={styles.playBtn} onClick={() => onPlayPauseClick(true)}>
        <img src="/Fill-4.svg" />
      </button>
    )}
    <button className={styles.forBtn} onClick={onNextClick}>
      <img src="/fast-forward.svg" />
    </button>
  </div>
);
export default AudioControls;
