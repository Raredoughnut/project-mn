import { SongItem } from "@/src/client/sections/charts/components/song-item";
import type { Song } from "@/src/client/sections/charts/types";

interface ChartsViewProps {
  songs: Song[];
}

/** 곡목록 (프레젠테이션). props(songs)만 받아 그린다. */
export function ChartsView({ songs }: ChartsViewProps) {
  return (
    <main className="mx-auto w-full max-w-[1440px] px-4 py-8 sm:px-6 lg:px-10">
      <h1 className="mb-4 text-xl font-bold text-foreground">악곡</h1>
      <ul className="flex flex-col gap-2">
        {songs.map((song) => (
          <SongItem key={song.id} song={song} />
        ))}
      </ul>
    </main>
  );
}
