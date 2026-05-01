"use client";

import Modal from "@/components/Modal/Modal";
import { useRouter } from "next/navigation";
import NoteDetailsClient from "@/app/notes/[id]/NoteDetails.client";

export default function Page() {
  const router = useRouter();

  return (
    <Modal onClose={() => router.back()}>
      <NoteDetailsClient />
    </Modal>
  );
}