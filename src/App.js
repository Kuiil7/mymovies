import React from 'react';
import { Routes, Route} from "react-router-dom";
import Movies from "./components/Movies";
import People from "./components/People";
import TVShows from "./components/TVShows";
import Header from "./components/Header";
import Main from "./components/Main";

require('dotenv').config()

function App() {
  return (
    <div className="container">
<Header />
<Routes>
<Route path="/" element={<Main />}  />
<Route path="movies" element={<Movies/>} />
<Route path="people" element={<People />} />
<Route path="tvshows" element={<TVShows />} />
</Routes>
   </div>
  );
}
export default App;