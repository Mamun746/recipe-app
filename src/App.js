import React, { Component } from "react";
import axios from "axios";
import Recipe from "./components/Recipe";
import "./App.css";

class App extends Component {
  state = {
    search: "",
    recipes: []
  };
 
  handleOnChange = (e) => {
    this.setState({
      search: e.target.value
    });
  };

  getUserQuery = (e) => {
    e.preventDefault();
    const API_ID = "08e859db";
    const API_KEY = "11be6e3cb741906244ce57bf6fdc94f8";
    axios
      .get(
        `https://api.edamam.com/search?q=${this.state.search}&app_id=${API_ID}&app_key=${API_KEY}`
      )
      .then((res) => {
        this.setState({
          recipes: res.data.hits
        });
      })
      .catch((err) => {
        console.log(err);
      });

    this.setState({
      search: ""
    });
  };
  componentDidMount() {
    const json = localStorage.getItem("recipes");
    const recipes = JSON.parse(json);
    this.setState({
      recipes
    });
  }
  componentDidUpdate() {
    const recipes = JSON.stringify(this.state.recipes);
    localStorage.setItem("recipes", recipes);
  }


  render() {
    return (
      <div className='App'>
        <form className='search' onSubmit={this.getUserQuery}>
          <input
            className='search-bar'
            type='text'
            value={this.state.search}
            onChange={this.handleOnChange}
          />
          <button className='search-button' type='submit'>
            Submit
          </button>
        </form>
        <Recipe />
        {this.state.recipes.length ? (
          <div>
            {this.state.recipes.map((recipe) => (
              <Recipe
                key={recipe.recipe.label + recipe.recipe.calories}
                title={recipe.recipe.label}
                calories={recipe.recipe.calories}
                image={recipe.recipe.image}
              />
            ))}
          </div>
        ) : (
          <div>Loading..</div>
        )}
      </div>
    );
  }
}

export default App;
