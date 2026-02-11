import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'sonner';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import Home from './pages/Home';
import Projects from './pages/Projects';
import Restoration from './pages/Restoration';
import Corporate from './pages/Corporate';
import Contact from './pages/Contact';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-white">
        <Navigation />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/projeler" element={<Projects />} />
          <Route path="/restorasyon" element={<Restoration />} />
          <Route path="/kurumsal" element={<Corporate />} />
          <Route path="/iletisim" element={<Contact />} />
        </Routes>
        <Footer />
        <Toaster 
          position="bottom-right"
          toastOptions={{
            style: {
              background: '#1a1a1a',
              border: '1px solid #333',
              color: 'white',
            },
          }}
        />
      </div>
    </Router>
  );
}

export default App;
