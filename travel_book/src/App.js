
import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home"
import Register from './components/Register';
import Sidebar from './components/Sidebar';

function App() {
  return (
    <div className="App body">
      <BrowserRouter>
     
      <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* <Route path="/profile/me" element={<MyProfile />} /> */}
        </Routes>
      </BrowserRouter>
     
     </div>
  );
}

export default App;
