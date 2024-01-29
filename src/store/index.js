import { createStore } from 'redux';
import recipeReducer from '../reducers/recipeReducer';

const store = createStore(recipeReducer);

export default store;