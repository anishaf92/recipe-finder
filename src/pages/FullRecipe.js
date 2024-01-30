import React,{useState} from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/fullrecipe.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { faHeart as faHeartRegular } from "@fortawesome/free-regular-svg-icons"; 

const FullRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;
  
  const [favorites, setFavorites] = useState(JSON.parse(localStorage.getItem("favorites")) || []);
  const [isFavorite, setIsFavorite] = useState(favorites.some(
    (fav) => fav.label === recipe.label
  ))


  const handleToggleFavorite = () => {
    const isFavorite = favorites.some((fav) => fav.label === recipe.label);
    if (isFavorite) {
      // Remove recipe from favorites
      const updatedFavorites = favorites.filter(
        (fav) => fav.label !== recipe.label
      );
      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      setFavorites(updatedFavorites);
      setIsFavorite(false)
    } else {
      // Add recipe to favorites
      localStorage.setItem("favorites", JSON.stringify([...favorites, recipe]));
      const updatedFavorites = [...favorites, recipe];
      setFavorites(updatedFavorites);
      setIsFavorite(true)
  }
}

  return (
    <div className="recipe__detail">
      <h2 className="cook">
        LET'S COOK 
        {/* Button to navigate to homepage */}
        <button
          className="invisible__btn"
          onClick={() => {
            navigate("/");
          }}
        >
          X
        </button>
      </h2>
      <div className="recipe__card">
        <img alt={recipe.label} className="recipe__img" src={recipe.image} />
        <button
            className="invisible__btn mobile"
            onClick={handleToggleFavorite}
          >
            <FontAwesomeIcon
              icon={isFavorite ? faHeart : faHeartRegular}
              className={isFavorite ? "favorite" : ""}
            />
          </button>
        <div className="details">
          <h1 className="title">{recipe.label}</h1>
          <h3>Calories: {recipe.calories}</h3>
          <h3>Meal Type: {recipe.mealType}</h3>
          {recipe.yield && <h3>Yield: {recipe.yield}</h3>}
          <h3>
            Caution:
            {Array.isArray(recipe.cautions) &&
              recipe.cautions.map((item, index) => (
                <div className="keyword" key={index}>
                  <li>{item}</li>
                </div>
              ))}
          </h3>
          <h3>Source: {recipe.source}</h3>
          {/* Favorite button */}
          <button
            className="invisible__btn full__screen"
            onClick={handleToggleFavorite}
          >
            <FontAwesomeIcon
              icon={isFavorite ? faHeart : faHeartRegular}
              className={isFavorite ? "favorite" : ""}
            />
          </button>
        </div>
      </div>
      <h3>Ingredients</h3>
      <ul>
        <div className="ingredients">
          {Array.isArray(recipe.ingredients) &&
            recipe.ingredients.map((item, index) => (
              <div className="" key={index}>
                <li>{item.text}</li>
              </div>
            ))}
        </div>
      </ul>
      <h3>Instructions</h3>
      <div className="instructions">
        <ol>
          {Array.isArray(recipe.ingredientLines) &&
            recipe.ingredientLines.map((item, index) => (
              <div className="instruction" key={index}>
                <li>{item}</li>
              </div>
            ))}
        </ol>
      </div>
       {/* Button to navigate to homepage */}
      <button
        className="back__btn"
        onClick={() => {
          navigate("/");
        }}
      >
        Back
      </button>
    </div>
  );
};

export default FullRecipe;
