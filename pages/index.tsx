import Head from "next/head";
import Greeting from "../components/Greeting";
import TrackItem from "../components/TrackItem";
import styles from "../styles/Home.module.css";

export default function Home() {
  const tracks = [
    {
      cover:
        "https://images.unsplash.com/photo-1524650359799-842906ca1c06?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      artist: "The Weekend",
      song: "Save Your Tears",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1515333437113-6464312e1885?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80",
      artist: "347 Aiden",
      song: "Dancing in My Room",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1598456448049-1c68e921e8ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=928&q=80",
      artist: "Symba",
      song: "Battlefield Freestyle",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1598456448049-1c68e921e8ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=928&q=80",
      artist: "Mac Miller",
      song: "Ayye",
    },
    {
      cover:
        "https://images.unsplash.com/photo-1598456448049-1c68e921e8ad?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=928&q=80",
      artist: "Juice WRLD",
      song: "Righteous",
    },
  ];
  const trackItems = tracks.map((track) => (
    <TrackItem
      key={`${track.artist}-${track.song}`}
      cover={track.cover}
      artist={track.artist}
      song={track.song}
    />
  ));

  return (
    <div className={styles.container}>
      <Head>
        <title>Nukebox</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Greeting name="Jürgen" />
      <li className={styles.list}>{trackItems}</li>
    </div>
  );
}
