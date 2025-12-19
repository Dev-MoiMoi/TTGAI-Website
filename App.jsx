import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import About from './pages/About';
import Team from './pages/Team';
import Operations from './pages/Operations';
import Sponsorship from './pages/Sponsorship';
import Linkages from './pages/Linkages';
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="team" element={<Team />} />
          <Route path="operations" element={<Operations />} />
          <Route path="sponsorship" element={<Sponsorship />} />
          <Route path="linkages" element={<Linkages />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
