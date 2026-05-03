"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchNotes } from "@/lib/api";

import SearchBox from "@/components/SearchBox/SearchBox";
import NoteList from "@/components/NoteList/NoteList";
import Pagination from "@/components/Pagination/Pagination";
import NoteForm from "@/components/NoteForm/NoteForm";
import Modal from "@/components/Modal/Modal";

type Props = {
  tag?: string;
};

export default function NotesClient({ tag }: Props) {
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const [page, setPage] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // debounce
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 300);

    return () => clearTimeout(timer);
  }, [search]);

  const { data, isLoading, error } = useQuery({
    queryKey: ["notes", page, tag, debouncedSearch],
    queryFn: () =>
      fetchNotes({
        page,
        tag: tag || undefined,
        search: debouncedSearch || undefined,
      }),
    refetchOnMount: false,
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error loading notes</p>;

  return (
    <>
      <SearchBox value={search} onChange={setSearch} />

      <button onClick={() => setIsModalOpen(true)}>
        Create note
      </button>

      <NoteList notes={data?.notes ?? []} />

      <Pagination
        currentPage={page}
        totalPages={data?.totalPages ?? 1}
        setPage={setPage}
      />

      {isModalOpen && (
        <Modal onClose={() => setIsModalOpen(false)}>
          <NoteForm onClose={() => setIsModalOpen(false)} />
        </Modal>
      )}
    </>
  );
}