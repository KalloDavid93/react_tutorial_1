import React, { useEffect, useState } from 'react';
import Recipe from "./recipe";
import './App.css';

const App = () => {

  const APP_ID = "a751476d";
  const APP_KEY = "ca00785b4dabf8bb999c01dfa12b3137";

  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    getRecipes();
  }, []);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=chicken&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }; 

  return (
    <div className="App">
      <form className="search-form">
        <input type="text" className="search-bar" />
        <button
          type="submit"
          className="search-button"
        >
        </button>
      </form>
      {recipes.map(recipe => (
        <Recipe 
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        />
      ))}
    </div>
  );
}

export default App;
