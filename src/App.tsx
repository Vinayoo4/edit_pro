import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { Home } from './pages/Home';
import { Admin } from './pages/Admin';
import { Gallery } from './pages/Gallery';
import { SharePublicPage } from './modules/share/SharePublicPage';
import { Hexagon } from 'lucide-react';

function App() {
  const location = useLocation();
  const isPublicShareRoute = location.pathname.startsWith('/share/');

  if (isPublicShareRoute) {
    return (
      <Routes>
        <Route path="/share/:type/:id" element={<SharePublicPage />} />
        <Route path="/share/:type" element={<SharePublicPage />} />
      </Routes>
    );
  }

  return (
    <div className="min-h-screen bg-neutral-50 flex flex-col">
      <header className="bg-white border-b border-neutral-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Hexagon className="h-8 w-8 text-blue-600" />
              <span className="font-bold text-xl text-neutral-900">HexCoaster</span>
            </Link>
            <nav className="flex space-x-4">
              <Link to="/" className="text-neutral-600 hover:text-neutral-900 px-3 py-2 rounded-md text-sm font-medium">Design</Link>
              <Link to="/gallery" className="text-neutral-600 hover:text-neutral-900 px-3 py-2 rounded-md text-sm font-medium">Gallery</Link>
              <Link to="/admin" className="text-neutral-600 hover:text-neutral-900 px-3 py-2 rounded-md text-sm font-medium">Admin</Link>
            </nav>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/admin" element={<Admin />} />
        </Routes>
      </main>
    </div>
  );
}

export default App;
