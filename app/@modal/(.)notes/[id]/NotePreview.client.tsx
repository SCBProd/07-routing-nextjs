"use client";

import { useParams, useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

type Note = {
  id: string;
  title: string;
  content: string;
  tags?: string[];
};

export default function NotePreview() {
  const params = useParams();
  const router = useRouter();

  const id = params?.id as string;

  const { data, isLoading, isError } = useQuery<Note>({
    queryKey: ["note", id],
    queryFn: async () => {
      const res = await axios.get(`https://your-api-url/notes/${id}`);
      return res.data;
    },
    enabled: !!id,
  });

  return (
    <div>
      <div>
        <button onClick={() => router.back()}>Close</button>
      </div>

      {isLoading && <p>Loading...</p>}

      {isError && <p>Failed to load note</p>}

      {data && (
        <div>
          <h2>{data.title}</h2>
          <p>{data.content}</p>

          {data.tags?.length ? (
            <ul>
              {data.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
          ) : null}
        </div>
      )}
    </div>
  );
}