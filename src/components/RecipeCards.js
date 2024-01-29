import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import Card from "./Card";
import Pagination from "./Pagination";

const RecipeCards = (props) => {
  const recipes = useSelector((state) => state.recipes);
  const cardsPerPage = 3;

  // State to manage the current page
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate the total number of pages based on the number of recipes
  const totalPages = Math.ceil(recipes.length / cardsPerPage);

  // Calculate the start and end index for the current page
  const startIndex = (currentPage - 1) * cardsPerPage;
  const endIndex = currentPage * cardsPerPage;

  // Get the subset of recipes for the current page
  const currentRecipes = recipes.slice(startIndex, endIndex);

  // State to manage favorites
  const [favorites, setFavorites] = useState([]);

  // Load favorites from local storage on component mount
  useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setFavorites(storedFavorites);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [recipes]);

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

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };
  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
  };

  return (
    <div>
      <h2>Looking for an inspiration?</h2>
      <div className="card-container">
        {/* Previous page */}
        <button
          className="invisible__btn page__btn"
          onClick={handlePrevPage}
          disabled={currentPage === 1 || currentRecipes.length === 0}
        >
          <i className="fa-solid fa-backward"></i>
        </button>
        {currentRecipes.length === 0 ? (
          <div className="not__found">
            Sorry, The search did not yield any Result. Please try another
            Search.
          </div>
        ) : (
          currentRecipes.map((recipe, index) => (
            <Card
              key={index}
              recipe={recipe.recipe}
              favorite={favorites.some(
                (fav) => fav.label === recipe.recipe.label
              )}
              toggleFavorite={() => toggleFavorite(recipe.recipe)}
            />
          ))
        )}
        {/* Next page */}
        <button
          className="invisible__btn page__btn"
          onClick={handleNextPage}
          disabled={currentPage === totalPages || currentRecipes.length === 0}
        >
          <i className="fa-solid fa-forward"></i>
        </button>
      </div>
      {/* To handle pagination in the bottom of cards */}
      {currentRecipes.length === 0 ? null : (
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
    </div>
  );
};

export default RecipeCards;
