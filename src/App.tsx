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
import AuthProvider from "./components/panel/AuthProvider";
import ProtectedRoute from "./components/panel/ProtectedRoute";

const Home = lazy(() => import("./pages/Home"));
const Projects = lazy(() => import("./pages/Projects"));
const ProjectDetail = lazy(() => import("./pages/ProjectDetail"));
const Blog = lazy(() => import("./pages/Blog"));
const BlogDetail = lazy(() => import("./pages/BlogDetail"));
const Corporate = lazy(() => import("./pages/Corporate"));
const Contact = lazy(() => import("./pages/Contact"));
const Randevu = lazy(() => import("./pages/Randevu"));
const Career = lazy(() => import("./pages/Career"));
const Finance = lazy(() => import("./pages/Finance"));

const Showcase = lazy(() => import("./pages/Showcase"));

const PanelLayout = lazy(() => import("./pages/panel/PanelLayout"));
const PanelLogin = lazy(() => import("./pages/panel/Login"));
const Dashboard = lazy(() => import("./pages/panel/Dashboard"));
const BlogList = lazy(() => import("./pages/panel/BlogList"));
const BlogEditor = lazy(() => import("./pages/panel/BlogEditor"));
const ProjectList = lazy(() => import("./pages/panel/ProjectList"));
const ProjectEditor = lazy(() => import("./pages/panel/ProjectEditor"));
const MapPins = lazy(() => import("./pages/panel/MapPins"));
const MediaLibrary = lazy(() => import("./pages/panel/MediaLibrary"));
const ActivityLog = lazy(() => import("./pages/panel/ActivityLog"));
const Settings = lazy(() => import("./pages/panel/Settings"));
const Guide = lazy(() => import("./pages/panel/Guide"));
const PanelMilestones = lazy(() => import("./pages/panel/Milestones"));

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

function PublicLayout() {
  const location = useLocation();
  const hidden =
    location.pathname.startsWith("/panel") ||
    location.pathname.startsWith("/showcase");

  if (hidden) return null;

  return (
    <>
      <Navigation />
    </>
  );
}

function PublicFooter() {
  const location = useLocation();
  const hidden =
    location.pathname.startsWith("/panel") ||
    location.pathname.startsWith("/showcase");

  if (hidden) return null;
  return <Footer />;
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-cream-200/50">
          <div className="mx-auto min-h-screen max-w-[1440px] bg-white shadow-[0_0_60px_-15px_rgba(0,0,0,0.1)]">
            <ScrollToTop />
            <PublicLayout />
            <Suspense fallback={<PageLoader />}>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/projeler" element={<Projects />} />
                <Route path="/projeler/:slug" element={<ProjectDetail />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/blog/:slug" element={<BlogDetail />} />
                <Route path="/kurumsal" element={<Corporate />} />
                <Route path="/kariyer" element={<Career />} />
                <Route path="/finans" element={<Finance />} />
                <Route path="/iletisim" element={<Contact />} />
                <Route path="/randevu" element={<Randevu />} />
                <Route path="/showcase" element={<Showcase />} />

                <Route path="/panel/login" element={<PanelLogin />} />
                <Route
                  path="/panel"
                  element={
                    <ProtectedRoute>
                      <PanelLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Dashboard />} />
                  <Route path="blog" element={<BlogList />} />
                  <Route path="blog/:id" element={<BlogEditor />} />
                  <Route path="projeler" element={<ProjectList />} />
                  <Route path="projeler/:id" element={<ProjectEditor />} />
                  <Route path="harita" element={<MapPins />} />
                  <Route path="medya" element={<MediaLibrary />} />
                  <Route path="etkinlik" element={<ActivityLog />} />
                  <Route path="milestones" element={<PanelMilestones />} />
                  <Route path="ayarlar" element={<Settings />} />
                  <Route path="rehber" element={<Guide />} />
                </Route>
              </Routes>
            </Suspense>
            <PublicFooter />
            <Toaster
              position="bottom-right"
              theme="light"
              richColors
              className="sonner-neli"
              toastOptions={{
                style: {
                  background: "#ffffff",
                  border: "1px solid #ebe5dc",
                },
              }}
            />
          </div>
        </div>
      </AuthProvider>
    </Router>
  );
}

export default App;
