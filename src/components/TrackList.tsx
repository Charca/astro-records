import { currentTrack, isPlaying, type Track } from "./state";

type Props = {
  tracks: Track[];
  albumName: string;
  albumId: string;
  artist: string;
  imageUrl: string;
};

const playIcon = (
  <svg
    class="w-6 h-6 ml-1 text-pink-600"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill-rule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
      clip-rule="evenodd"
    />
  </svg>
);

const pauseIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="currentColor"
    class="w-6 h-6 ml-1 text-pink-600"
    aria-hidden="true"
    focusable="false"
  >
    <path
      fill-rule="evenodd"
      d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12zM9 8.25a.75.75 0 00-.75.75v6c0 .414.336.75.75.75h.75a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75H9zm5.25 0a.75.75 0 00-.75.75v6c0 .414.336.75.75.75H15a.75.75 0 00.75-.75V9a.75.75 0 00-.75-.75h-.75z"
      clip-rule="evenodd"
    />
  </svg>
);

export default function TrackList({
  tracks,
  albumId,
  albumName,
  artist,
  imageUrl,
}: Props) {
  return (
    <ul class="text-xl" aria-label="Tracklist">
      {tracks.map((track, index) => {
        const isCurrentTrack = track.id == currentTrack.value?.id;

        return (
          <li class="first:border-t border-b">
            <button
              type="button"
              class="hover:bg-gray-50 focus:ring-2 focus:outline-none focus:ring-black cursor-pointer px-6 py-4 flex basis grow w-full items-center"
              aria-current={isCurrentTrack}
              onClick={() => {
                currentTrack.value = {
                  ...track,
                  albumName,
                  albumId,
                  artist,
                  imageUrl,
                };

                isPlaying.value = isCurrentTrack ? !isPlaying.value : true;
              }}
            >
              <span class="text-gray-500 w-8 mr-2">
                {isCurrentTrack && !isPlaying.value
                  ? pauseIcon
                  : isCurrentTrack && isPlaying.value
                  ? playIcon
                  : track.position}
              </span>

              {isCurrentTrack ? (
                <span class="sr-only">{track.position}</span>
              ) : null}
              <span class="sr-only"> - </span>
              <span class="font-medium">{track.title}</span>
              <span class="sr-only"> - </span>
              <span class="text-gray-500 ml-auto">{track.length}</span>

              <span class="sr-only">
                (press to{" "}
                {isCurrentTrack && isPlaying.value ? "pause)" : "play)"}
              </span>
            </button>
          </li>
        );
      })}
    </ul>
  );
}
