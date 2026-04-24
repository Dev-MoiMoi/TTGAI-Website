import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Operations from './pages/Operations';
import Sponsorship from './pages/Sponsorship';
import Linkages from './pages/Linkages';
import History from './pages/History';
import Newsletter from './pages/Newsletter';
import Apply from './pages/Apply';
import AdminNewsletters from './pages/AdminNewsletters';
import Unsubscribe from './pages/Unsubscribe';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        {/* Admin & utility pages — full-page, no shared Layout */}
        <Route path="/admin/newsletters" element={<AdminNewsletters />} />
        <Route path="/unsubscribe" element={<Unsubscribe />} />

        {/* Main site with Navbar + Footer */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="operations" element={<Operations />} />
          <Route path="sponsorship" element={<Sponsorship />} />
          <Route path="linkages" element={<Linkages />} />
          <Route path="history" element={<History />} />
          <Route path="newsletter" element={<Newsletter />} />
          <Route path="apply" element={<Apply />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
