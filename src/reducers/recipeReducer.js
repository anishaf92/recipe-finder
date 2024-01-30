import { SET_RECIPES } from '../actions/recipeActions';

const initialState = {
  recipes: []
};

const recipeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_RECIPES:
      return { ...state, recipes: action.payload };

    default:
      return state;
  }
};

export default recipeReducer;