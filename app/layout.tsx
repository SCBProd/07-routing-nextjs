export default function RootLayout({
  children
}: Readonly<{ children: React.ReactNode; }>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <TanStackProvider>
          <Header />

          <main>{children}</main>

          <Footer />
        </TanStackProvider>

        {/* 👇 ДОДАЙ ОЦЕ */}
        <div id="modal-root"></div>
      </body>
    </html>
  );
}