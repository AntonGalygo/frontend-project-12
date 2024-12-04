import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './components/pages/Home';
import NotFound from './components/pages/NotFound';
import Login from './components/pages/Login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/notFound" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
