import axios from "axios";
import type { AxiosResponse } from "axios";
import type { Note, CreateNoteDto } from "@/types/note";



export interface NotesResponse {
  notes: Note[];
  totalPages: number;
}

export interface ApiError {
  message: string;
  error?: string; }


const token = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

const authHeader = {
  headers: {
    Authorization: `Bearer ${token}`,
  },
};

// GET notes
export const fetchNotes = async (params: {
  search?: string;
  tag?: string;
  page?: number;
  perPage?: number;
  sortBy?: "created" | "updated";
}): Promise<NotesResponse> => {
  const response: AxiosResponse<NotesResponse> = await axios.get(
    "/notes",
    {
      params,
      ...authHeader,
    }
  );

  return response.data;
};

// CREATE note
export const createNote = async (
  data: CreateNoteDto
): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.post(
    "/notes",
    data,
    authHeader
  );

  return response.data;
};

// DELETE note
export const deleteNote = async (
  id: string
): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.delete(
    `/notes/${id}`,
    authHeader
  );

  return response.data;
};

//oтримання деталей однієї нотатки за її ідентифікатором.
export const fetchNoteById = async (
  id: string
): Promise<Note> => {
  const response: AxiosResponse<Note> = await axios.get(
    `/notes/${id}`,
    authHeader
  );

  return response.data;
};
