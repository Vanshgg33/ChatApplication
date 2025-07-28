import logo from './logo.svg';
import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
 <Router>
<Routes>
  <Route path="/" element={<Home/>} />
  <Route path="/login" element={<Login />} />
  <Route path="/chathome" element={<ChatHome />} />
</Routes>
 </Router>
  );
}

export default App;
