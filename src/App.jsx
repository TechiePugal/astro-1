import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./components/pages/HomePage";
import BookingPage from "./components/pages/BookingPage"; // 👈 import it

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/booking" element={<BookingPage />} /> {/* 👈 new route */}
      </Routes>
    </Router>
  );
};

export default App;
