import { Header } from "./header";
import { Footer } from "./footer";

interface MainLayoutProps {
  children: React.ReactNode;
}

export const MainLayout = ({ children }: MainLayoutProps) => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />z
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
};