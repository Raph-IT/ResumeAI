export const MainLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="min-h-screen bg-gray-950">
      <Navbar className="fixed top-0 left-0 right-0 z-50" />
      <div className="pt-28">
        <main>
          {children}
        </main>
      </div>
    </div>
  );
}; 