import React, { Component } from 'react'
import { Input, Button } from 'semantic-ui-react'

import RecipeView from './RecipeView.jsx'
import Tabs from '../tabs_view/Tabs.jsx'

import './RecipesView.css'

class RecipesView extends Component {
    constructor() {
        super();
        this.state = {
            recipes: []
        };

        this.searchParam = "";

        this.searchRecipes = this.searchRecipes.bind(this);
        this.searchValueChange = this.searchValueChange.bind(this);
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
                    <Input placeholder='Search...' size='big' id='listInput'
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