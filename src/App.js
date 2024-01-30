import React,{useEffect} from 'react'; 
import Navbar from './components/Navbar';
import {BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Home from './pages/Home';
import FullRecipe from './pages/FullRecipe';
import FavoritePage from './pages/FavoritePage';

function App() {
  useEffect(() => {
    // Add event listener for the beforeunload event
    const handleBeforeUnload = () => {
      // Clear local storage
      localStorage.clear();
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    // Clean up the event listener when the component unmounts
    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
  return (
    <div>
      <Router>
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/:label" element={<FullRecipe />} />
          <Route path="/favourites" element={<FavoritePage />} />
         
        </Routes>
      </Router>
    </div>
  );
}

export default App;
