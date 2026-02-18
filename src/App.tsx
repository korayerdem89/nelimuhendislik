import { useEffect, lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import { Toaster } from "sonner";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";

// Lazy load pages for better initial load performance
const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Restoration = lazy(() => import("./pages/Restoration"));
const Corporate = lazy(() => import("./pages/Corporate"));
const Contact = lazy(() => import("./pages/Contact"));
const Career = lazy(() => import("./pages/Career"));
const Finance = lazy(() => import("./pages/Finance"));

// Loading fallback component
function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-cream-50">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-neli-600/20 border-t-neli-600 rounded-full animate-spin" />
        <p className="text-sm text-foreground/60">Yükleniyor...</p>
      </div>
    </div>
  );
}

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-cream-200/50">
        <div className="mx-auto min-h-screen max-w-[1440px] bg-white shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)]">
          <ScrollToTop />
          <Navigation />
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/projeler" element={<Projects />} />
              <Route path="/projeler/:slug" element={<ProjectDetail />} />
              <Route path="/restorasyon" element={<Restoration />} />
              <Route path="/kurumsal" element={<Corporate />} />
              <Route path="/kariyer" element={<Career />} />
              <Route path="/finans" element={<Finance />} />
              <Route path="/iletisim" element={<Contact />} />
            </Routes>
          </Suspense>
          <Footer />
          <Toaster
            position="bottom-right"
            toastOptions={{
              style: {
                background: "#1a1a1a",
                border: "1px solid #333",
                color: "white",
              },
            }}
          />
        </div>
      </div>
    </Router>
  );
}

export default App;
