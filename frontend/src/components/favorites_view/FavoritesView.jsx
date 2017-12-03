import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'

import RecipeView from '../recipes_view/RecipeView.jsx'
import Tabs from '../tabs_view/Tabs.jsx'
import UserProfile from '../UserProfile'

import '../recipes_view/RecipesView.css'

class FavoritesView extends Component {
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
                    favoriteButtonString="Remove Favorite"
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
                    <Input placeholder='Search Favorites...' size='big' id='listInput'
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

        let unfavoritedRecipe = this.state.recipes[idx];

        let username = UserProfile.getUsername();
        let recipeName = unfavoritedRecipe.recipe_name;
        let imageUrl = unfavoritedRecipe.image_url;

        let deleteObject = {
            username: username,
            recipe_name: recipeName,
            image_url: imageUrl
        };

        let data = JSON.stringify(deleteObject);

        let url = '/favorites';

        fetch(url, {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: data
        }).then((response) => this.fetchData())
    }

    searchRecipes(e) {
        this.fetchData();
    }

    searchValueChange(e) {
        this.searchParam = e.target.value;
    }

    fetchData() {
        let searchParam = this.searchParam;
        let username = UserProfile.getUsername();

        if (!searchParam) {
            let url = '/favorites/' + username;
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
        } else {
            let url = '/favorites/' + username + "/" + searchParam;
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

export default FavoritesView