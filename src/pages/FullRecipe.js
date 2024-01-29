import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/fullrecipe.css";

const FullRecipe = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const recipe = location.state?.recipe;
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
        <div className="details">
          <h1 className="title">{recipe.label}</h1>
          <h3>Calories: {recipe.calories}</h3>
          <h3>Meal Type: {recipe.mealType}</h3>
          {recipe.yeild && <h3>Yeild: {recipe.yeild}</h3>}
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
