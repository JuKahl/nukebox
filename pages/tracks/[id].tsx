import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { APITrack, getTracks } from "../../utils/api";
import AudioPlayer from "../../components/AudioPlayer";

export default function Track() {
  const router = useRouter();
  const { id } = router.query;

  //   const [track, setTrack] = useState<APITrack>(null);
  const [tracks, setTracks] = useState<APITrack[]>(null);

  useEffect(() => {
    getTracks().then((newTracks) => {
      setTracks(newTracks);
    });
  }, [id]);
  if (!tracks) {
    return <div> Loading...</div>;
  }

  return <AudioPlayer tracks={tracks} initialID={id} />;
}
