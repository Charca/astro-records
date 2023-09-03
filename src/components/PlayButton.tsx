import { currentTrack, isPlaying, type Track } from './state'

type Props = {
  tracks: Track[]
  albumId: string
  artist: string
  imageUrl: string
}

export default function PlayButton({
  tracks,
  albumId,
  artist,
  imageUrl,
}: Props) {
  return (
    <button
      type="button"
      class="text-pink-600 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-lg px-10 py-3 text-center inline-flex items-center dark:focus:ring-gray-500 mr-4"
      onClick={() => {
        currentTrack.value = {
          ...tracks[0],
          albumId,
          artist,
          imageUrl,
        }

        isPlaying.value = true
      }}
    >
      <svg
        aria-hidden="true"
        class="w-6 h-6 mr-2 -ml-1 text-pink-600"
        fill="currentColor"
        viewBox="0 0 20 20"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          fill-rule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
          clip-rule="evenodd"
        ></path>
      </svg>
      Play
    </button>
  )
}
