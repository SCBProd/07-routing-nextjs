import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import axios from "axios";
import NotesClient from "./Notes.client";
import type { Note } from "@/types/note"


 interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const API_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

export default async function NotesPage() {
  const queryClient = new QueryClient();

  const page = 1;
  const perPage = 12;
  const search = "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, perPage, search],
    queryFn: async () => {
      const res = await axios.get(API_URL, {
        params: { page, perPage, search },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      return res.data as NotesResponse;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient />
    </HydrationBoundary>
  );
}