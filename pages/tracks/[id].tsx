import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APITrack, getTracks } from "../../utils/api";
import AudioPlayer from "../../components/AudioPlayer";

export default function Track() {
  const router = useRouter();
  const { id: idQuery } = router.query;
  const id = typeof idQuery === "string" ? idQuery : idQuery[0];

  const [tracks, setTracks] = useState<APITrack[]>(null);

  useEffect(() => {
    getTracks().then((newTracks) => {
      setTracks(newTracks);
    });
  }, [id]);
  if (!tracks) {
    return <div> Loading...</div>;
  }

  return (
    <div>
      <main>
        <AudioPlayer tracks={tracks} initialID={id} />
      </main>
      <footer>
        {/* <button onClick={() => setFavorite(!favorite)}>
          {favorite ? "💘" : "🖤"}
        </button> */}
      </footer>
    </div>
  );
}
