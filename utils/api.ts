export type APITrack = {
  id: string;
  cover: string;
  artist: string;
  song: string;
};

export async function getTracks() {
  const response = await fetch("/api/tracks");
  const tracks: APITrack[] = await response.json();
  return tracks;
}
