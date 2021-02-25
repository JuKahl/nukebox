import Head from "next/head";
import { useEffect, useState } from "react";
import Greeting from "../components/Greeting";
import TrackItem from "../components/TrackItem";
import styles from "../styles/Home.module.css";
import { APITrack, getTracks } from "../utils/api";
import Link from "next/Link";

export default function Home() {
  const [tracks, setTracks] = useState<APITrack[]>([]);

  useEffect(() => {
    console.log("Homepage ist mounted");
    getTracks().then((newTracks) => {
      setTracks(newTracks);
    });
  }, []);

  const trackItems = tracks.map((track) => (
    <Link href={`/tracks/${track.id}`} key={track.id}>
      <a>
        <TrackItem
          cover={track.cover}
          artist={track.artist}
          song={track.song}
        />
      </a>
    </Link>
  ));

  return (
    <div className={styles.container}>
      <Head>
        <title>Nukebox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Greeting name="Jürgen" />
      <div className={styles.list}>{trackItems}</div>
    </div>
  );
}
