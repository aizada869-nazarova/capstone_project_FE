
import './App.css';
import Login from './components/Login';
import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home"
import Register from './components/Register';

import TripDetails from './components/TripDetails';
import AddVisitedCountry from './components/AddVisitedCountry';
import EditVisitedCountry from './components/EditVisitedCountry';
import PackingList from './components/PackingList';
import SingleList from './components/SingleList';
import SingleItinerary from './components/SingleItinerary';
import AddItinerary from './components/AddItinerary';
import AddVisitPlace from './components/AddVisitPlace';
import SinglePlace from './components/SinglePlace';
import MainHome from './components/MainHome';
import Overview from './components/Overview';
import Checklist from './components/Checklist';


function App() {
  return (
    <div className="App body">
      <BrowserRouter>
     
      <Routes>

          <Route path="/" element={<MainHome />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/visitedCountry" element={<AddVisitedCountry />} />
          <Route path="/visitedCountry/:visitedCountry" element={<EditVisitedCountry/>} />
          <Route path="/travels" element={<Home />} />
          <Route path="/travels/:travelId" element={<TripDetails />} />
          <Route path="/travels/:travelId/pakinglist" element={<PackingList />} />
          <Route path="/travels/:travelId/pakinglist/:pakinglistId" element={<SingleList />} />
          <Route path="/itinerary/:travelId" element={<AddItinerary />} />
          <Route path="/itinerary/:travelId/:itineraryId" element={<SingleItinerary />} />
          <Route path="/itinerary/:itineraryId/place" element={<AddVisitPlace/>} />
          <Route path="/itinerary/:itineraryId/place/:placeId" element={<SinglePlace/>} />
          <Route path="/travels/:travelId/overview" element={<Overview/>} />
          <Route path="/travels/:travelId/checklist" element={<Checklist/>} />
          

          
          {/* <Route path="/profile/me" element={<MyProfile />} /> */}
          
        </Routes>
      </BrowserRouter>
     
     </div>
  );
}

export default App;
