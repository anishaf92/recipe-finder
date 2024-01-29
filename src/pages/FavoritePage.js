import React, { useState, useEffect } from "react";
import Card from "../components/Card";
import Pagination from "../components/Pagination";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons";

const FavoritePage = (props) => {
  const [favorites, setFavorites] = useState([]);
  const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
  const cardsPerPage = 3;

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages based on the number of recipes
  const totalPages = Math.ceil(storedFavorites.length / cardsPerPage);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = currentPage * cardsPerPage;

  // Get the subset of recipes for the current page
  const currentFavorites = storedFavorites.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  const toggleFavorite = (recipe) => {
    const isFavorite = favorites.some((fav) => fav.label === recipe.label);

    if (isFavorite) {
      // Remove recipe from favorites
      const updatedFavorites = favorites.filter(
        (fav) => fav.label !== recipe.label
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
    } else {
      // Add recipe to favorites
      localStorage.setItem("favorites", JSON.stringify([...favorites, recipe]));
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
    }
  };
  return (
    <div>
      <div className="card-container">
        {currentFavorites.length === 0 ? (
          <div className="not__found">
            You dont have any favourite recipe, you can add recipes to
            favourites by clicking on the heart{" "}
            <FontAwesomeIcon icon={faHeartRegular} />{" "}
          </div>
        ) : (
          currentFavorites.map((recipe, index) => (
            <Card
              key={index}
              recipe={recipe}
              favorite={favorites.some((fav) => fav.label === recipe.label)}
              toggleFavorite={() => toggleFavorite(recipe)}
            />
          ))
        )}
      </div>
      {currentFavorites.length === 0 ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};
export default FavoritePage;
