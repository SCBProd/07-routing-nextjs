import { QueryClient, dehydrate, HydrationBoundary } from "@tanstack/react-query";
import axios from "axios";
import Modal from "@/components/Modal/Modal";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

const API_URL = "https://notehub-public.goit.study/api/notes";
const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

type Props = {
  params: Promise<{ id: string }>;
};

export default async function Page({ params }: Props) {
  const { id } = await params;

  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["note", id],
    queryFn: async () => {
      const res = await axios.get(`${API_URL}/${id}`, {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      });

      return res.data;
    },
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <Modal onClose={() => {}}>
        <NoteDetailsClient id={id} />
      </Modal>
    </HydrationBoundary>
  );
}