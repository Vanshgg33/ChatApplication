import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import LoginRegister from './Login/login.jsx';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<LoginRegister />} />
        {/* <Route path="/chathome" element={<ChatHome />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
