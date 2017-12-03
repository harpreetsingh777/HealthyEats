import React, { Component } from 'react'

import RecipeView from '../recipes_view/RecipeView.jsx'
import Tabs from '../tabs_view/Tabs.jsx'

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

export default FavoritesView