
import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home"
import Register from './components/Register';

import TripDetails from './components/TripDetails';
import AddVisitedCountry from './components/AddVisitedCountry';
import EditVisitedCountry from './components/EditVisitedCountry';


function App() {
  return (
    <div className="App body">
      <BrowserRouter>
     
      <Routes>

          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/visitedCountry" element={<AddVisitedCountry />} />
          <Route path="/visitedCountry/:visitedCountry" element={<EditVisitedCountry/>} />
          <Route path="/travels/:travelId" element={<TripDetails />} />
          
          {/* <Route path="/profile/me" element={<MyProfile />} /> */}
          
        </Routes>
      </BrowserRouter>
     
     </div>
  );
}

export default App;
