async function fetchNotes(tag) {
  let url = 'https://your-backend-url/notes';

  // якщо НЕ all → додаємо query
  if (tag !== 'all') {
    url += `?tag=${tag}`;
  }

  const res = await fetch(url, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch notes');
  }

  return res.json();
}

export default async function NotesPage({ params }) {
  const { tag } = params;

  const notes = await fetchNotes(tag);

  return (
    <div>
      <h2>{tag === 'all' ? 'All notes' : `Tag: ${tag}`}</h2>

      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <h3>{note.title}</h3>
            <p>{note.content}</p>
            <small>{note.tag}</small>
          </li>
        ))}
      </ul>
    </div>
  );
}