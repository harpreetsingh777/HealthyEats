import React, { Component } from 'react'

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

    fetchData() {
        let username = UserProfile.getUsername();
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
    }
}

export default FavoritesView