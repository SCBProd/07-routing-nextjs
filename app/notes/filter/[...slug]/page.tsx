import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import axios from "axios";
import NotesClient from "./Notes.client";
import type { Note } from "@/types/note";

interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

const API_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

type Props = {
  params: {
    slug?: string;
  };
};

export default async function NotesPage({ params }: Props) {
  const queryClient = new QueryClient();

  const page = 1;
  const perPage = 12;
  const search = "";
  const tag = params?.slug && params.slug !== "all" ? params.slug : "";

  await queryClient.prefetchQuery({
    queryKey: ["notes", page, perPage, search, tag],
    queryFn: async () => {
      const res = await axios.get(API_URL, {
        params: {
          page,
          perPage,
          search,
          tag: tag || undefined,
        },
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      return res.data as NotesResponse;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag} />
    </HydrationBoundary>
  );
}