export default function FilterLayout({ children, sidebar }) {
  return (
    <div style={{ display: 'flex', gap: '20px' }}>
      <aside style={{ width: '250px' }}>
        {sidebar}
      </aside>

      <main style={{ flex: 1 }}>
        {children}
      </main>
    </div>
  );
}