import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'

import RecipeView from './RecipeView.jsx'
import Tabs from '../tabs_view/Tabs.jsx'

import './RecipesView.css'
import UserProfile from "../UserProfile";

class RecipesView extends Component {
    constructor() {
        super();
        this.state = {
            recipes: []
        };

        this.searchParam = "";

        this.searchRecipes = this.searchRecipes.bind(this);
        this.searchValueChange = this.searchValueChange.bind(this);
        this.recipeClick = this.recipeClick.bind(this);
        this.favoriteClick = this.favoriteClick.bind(this);
    }

    componentDidMount() {
        this.fetchData();
    }

    render() {
        return this.renderRecipes();
    }

    renderRecipes() {
        let recipeCards = this.state.recipes.map((recipe, idx) => {
            let recipeName = recipe.recipe_name;
            let imageUrl = recipe.image_url;
            let calories = recipe.calories;
            let totalWeight = recipe.total_weight;

            return (
                <RecipeView
                    recipeName={recipeName}
                    imageUrl={imageUrl}
                    calories={calories}
                    totalWeight={totalWeight}
                    key={idx}
                    recipeClick={this.recipeClick.bind(this, idx)}
                    favoriteClick={this.favoriteClick.bind(this, idx)}
                    favoriteButtonString="Add Favorite"
                />
            );
        });
        // Finished populating recipes

        return (
            <div className="listMainContainer">
                <div className="tabsContainer">
                    <Tabs />
                </div>
                <div className="listButtonsContainer">
                    <Input placeholder='Search Recipes...' size='big' id='listInput'
                           onChange={this.searchValueChange}/>
                    <Button id="searchButton" onClick={this.searchRecipes}>
                        Search
                    </Button>
                </div>
                <div className="listRecipesContainer">
                    {recipeCards}
                </div>
            </div>
        )
    }

    recipeClick(idx) {
        this.props.history.push({
            pathname: '/details',
            recipes: this.state.recipes,
            currIndex: idx
        });
    }

    favoriteClick(idx, e) {
        e.stopPropagation();

        let favoritedRecipe = this.state.recipes[idx];

        let username = UserProfile.getUsername();
        let recipeName = favoritedRecipe.recipe_name;
        let imageUrl = favoritedRecipe.image_url;

        let postObject = {
            username: username,
            recipe_name: recipeName,
            image_url: imageUrl
        };

        let data = JSON.stringify(postObject);

        let url = '/favorites';

        fetch(url, {
            method: 'post',
            headers: {'Content-Type': 'application/json'},
            body: data
        })
    }

    searchRecipes(e) {
        this.fetchData();
    }

    searchValueChange(e) {
        this.searchParam = e.target.value;
    }

    fetchData() {
        let searchParam = this.searchParam;

        if (!searchParam) {
            fetch('/recipes')
                .then((response) => response.json())
                .then((jsonResponse) => jsonResponse.data)
                .then ((recipesData) => {
                    this.setState({
                        recipes: recipesData
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        } else {
            let url = '/recipes/' + searchParam;
            fetch(url)
                .then((response) => response.json())
                .then((jsonResponse) => jsonResponse.data)
                .then ((recipesData) => {
                    this.setState({
                        recipes: recipesData
                    });
                })
                .catch((error) => {
                    console.log(error);
                })
        }
    }
}

export default RecipesView