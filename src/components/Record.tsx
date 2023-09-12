import { isPlaying, currentTrack } from "./state";

export default function Record({
  albumId,
  artist,
  title,
  imageUrl,
}: {
  albumId: string;
  artist: string;
  title: string;
  imageUrl: string;
}) {
  const isPlayingCurrentRecord =
    isPlaying.value && currentTrack.value.albumId === albumId;
  const className =
    "absolute top-0 opacity-0 vynil-image vynil-animation-in" +
    (isPlayingCurrentRecord ? "-spinning" : "");

  return (
    <div class="relative shadow-xl mr-32 w-72 md:w-auto">
      <img
        src={imageUrl}
        alt={`${artist} - ${title} album cover`}
        aria-hidden="true"
        width="400"
        height="400"
        class="block rounded-md tag-album-cover relative z-10 bg-white"
        style={`view-transition-name: record-${albumId};`}
      />
      <img
        src="/vynil-lp.webp"
        alt=""
        width="400"
        height="400"
        class={className}
        style={`view-transition-name: vinyl-${albumId};`}
        aria-hidden="true"
      />
    </div>
  );
}
