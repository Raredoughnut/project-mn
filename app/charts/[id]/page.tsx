import { notFound } from "next/navigation";

import { getSupabaseServer } from "@/lib/supabase";
import {
  mapSongDetailRow,
  type SongDetailRow,
} from "@/src/client/sections/charts/types";
import { SongDetailView } from "@/src/client/sections/charts/views/song-detail-view";

export default async function SongDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const songId = Number.parseInt(id, 10);
  if (!Number.isInteger(songId)) notFound();

  const { data, error } = await getSupabaseServer()
    .from("songs")
    .select("*")
    .eq("id", songId)
    .maybeSingle<SongDetailRow>();

  if (error) throw new Error(error.message);
  if (!data) notFound();

  return <SongDetailView song={mapSongDetailRow(data)} />;
}
