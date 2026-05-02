"use client";

import { useQuery } from "@tanstack/react-query";
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

type Props = {
  tag?: string;
};

const NoteDetailsClient = ({ tag }: Props) => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  const { data: note, isLoading, error } = useQuery({
    queryKey: ["note", id, tag],
    queryFn: () => fetchNoteById(id),
  });

  const handleClose = () => {
    router.back();
  };

  if (isLoading) return null;

  if (error || !note) return <p>Some error..</p>;

  const formattedDate = note.updatedAt
    ? `Updated at: ${note.updatedAt}`
    : `Created at: ${note.createdAt}`;

  return (
    <Modal onClose={handleClose}>
      <h2>{note.title}</h2>
      <p>{note.content}</p>
      <p>{formattedDate}</p>
    </Modal>
  );
};

export default NoteDetailsClient;