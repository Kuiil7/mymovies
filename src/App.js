import React from 'react';
import { Routes, Route} from "react-router-dom";
import Movies from "./components/movieapis/Movies";
import People from "./components/movieapis/People";
import TVShows from "./components/movieapis/TVShows";
import Header from "./Header";
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