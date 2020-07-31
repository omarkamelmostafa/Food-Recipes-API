import React, { useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { Recipe } from './Recipe';
import './App.css';

export const App = () => {
  const APP_ID = '3b505c4a';
  const APP_KEY = '1db0edd829aa3856dfde15c9a39abfcb';

  const [recipes, setRecipes] = useState([]);
  const [search, setSearch] = useState('');
  const [query, setQuery] = useState('chicken'); // default search will be about chicken

  useEffect(() => {
    getRecipes();
  }, [query])

  const getRecipes = async () => {
    const response = await fetch(`https://api.edamam.com/search?q=${query}&app_id=${APP_ID}&app_key=${APP_KEY}`);
    const data = await response.json();
    setRecipes(data.hits);
    console.log(data.hits);
  }
  const updateSearch = (e) => {
    setSearch(e.target.value);
    // console.log(search);
  }

  const getSearch = (e) => {
    e.preventDefault();
    setQuery(search);
    // setSearch(''); // will delete search query after hit enter
  }
  return (
    <div className='App'>
      <form onSubmit={getSearch} className='search-form'>
        <input className='search-bar' type='text' value={search} onChange={updateSearch} placeholder='try lemon, Pizza, Mango...'/>
        <button
          className='search-button'
          type='submit' >
          Search
        </button>
      </form>
        <div className='recipes'>
        {recipes.map((recipe) => (
          <Recipe
            key={uuidv4()}
            title={recipe.recipe.label}
            calories={recipe.recipe.calories}
            image={recipe.recipe.image} 
            ingredients={recipe.recipe.ingredients} 
            />
        ))}
        </div>
    </div>
  )
}



    // another way: fetch data from jsonplaceholder.com and Obj Destructing

    // const response = await fetch(`https://jsonplaceholder.typicode.com/todos/`);
    // fetch('https://jsonplaceholder.typicode.com/users/')
    //   .then(response => response.json())
    //   .then(data => {data.map(item =>  {
    //     const {id, name, phone, username, website, email, company:{name: companyName, catchPhrase, bs}, address:{street, suite, city, zipcode, geo: { lat, lng }} } = item ;
    //     console.table(item); 
    //     console.log(id); 
    //     console.log(`name is  ${name}`); 
    //     console.log(`phone is  ${phone}`); 
    //     console.log(`username is  ${username}`); 
    //     console.log(`email is  ${email}`); 
    //     console.log(`website is  ${website}`); 
    //     console.log(`companyName is  ${companyName}`); 
    //     console.log(`catchPhrase is  ${catchPhrase}`); 
    //     console.log(`bs is ${bs}`);
    //     console.log(`street is ${street}`); 
    //     console.log(`suite is ${suite}`); 
    //     console.log(`city is ${city}`); 
    //     console.log(`zipCode is ${zipcode}`); 
    //     console.log(`latitude is ${lat}`); 
    //     console.log(`longtude is ${lng}`); 
    //   }
    // )})