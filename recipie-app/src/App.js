import React, { useEffect, useState } from 'react';
import Recipe from "./recipe";
import './App.css';

const App = () => {

  const APP_ID = "a751476d";
  const APP_KEY = "ca00785b4dabf8bb999c01dfa12b3137";

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken');

  useEffect(() => {
    getRecipes();
  }, [query]);

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
  }; 

  const updateSearch = e => {
    setSearch(e.target.value);
    console.log(search);
  }

  const getSearch = e => {
    e.preventDefault();
    setQuery(search);
    setSearch('');
  }


  return (
    <div className="App">
      <form 
        className="search-form"
        onSubmit={getSearch}
      >
        <input 
          type="text" 
          className="search-bar" 
          value={search}
          onChange={updateSearch}
        />
        <button
          type="submit"
          className="search-button"
          onClick={getSearch}
        >
          Search
        </button>
      </form>
      <div className="recipes">
      {recipes.map(recipe => (
        <Recipe 
        key={recipe.recipe.label}
        title={recipe.recipe.label}
        calories={recipe.recipe.calories}
        image={recipe.recipe.image}
        ingredients={recipe.recipe.ingredients}
        />
      ))} 
      </div>
    </div>
  );
}

export default App;
