import Login from "./components/Login";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ClientSearch from "./components/ClientSearch";
import TherapistBooking from "./components/TherapistBooking";
import VideoSession from "./components/VideoSession";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/search-booking" element={<ClientSearch />} />
        <Route path="/book-therapist" element={<TherapistBooking />} />
        <Route path="/video-session/:meetingId" element={<VideoSession />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
