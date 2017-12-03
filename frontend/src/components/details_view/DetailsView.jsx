import React, { Component } from 'react'
import { Button, Label } from 'semantic-ui-react'

import './DetailsView.css'
import Tabs from '../tabs_view/Tabs.jsx'

class DetailsView extends Component {
    constructor() {
        super();
        this.state = {
            recipes: null,
            currIndex: 0,
            ingredients: []
        };

        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
    }

    componentDidMount() {
        let location = this.props.location;

        this.setState({
            recipes: location.recipes,
            currIndex: location.currIndex
        });

        if (location.recipes != null && location.currIndex != null) {
            this.fetchIngredients(location.recipes[location.currIndex].recipe_name);
        }
    }

    render() {
        if (this.state.recipes == null || this.state.currIndex == null) {
            return this.emptyRenderView();
        }

        return this.renderMovies();
    }

    emptyRenderView() {
        return (
            <Label>No Recipe Found</Label>
        );
    }

    renderMovies() {
        let recipe = this.state.recipes[this.state.currIndex];

        let recipeName = recipe.recipe_name;
        let imageUrl = recipe.image_url;
        let calories = recipe.calories;
        let totalWeight = recipe.total_weight;

        let ingredientCards = this.state.ingredients.map((ingredient, idx) => {
            let ingredientName = ingredient.ingredient_name;

            return (
                <div key={idx}>{ingredientName}</div>
            );
        });
        // Finished populating recipes

        return (
            <div>
                <div className="tabsContainer">
                    <Tabs />
                </div>
                <div className="detailsButtonsContainer">
                    <Button id="detailsPrevious" onClick={this.moveLeft}>
                        Previous
                    </Button>
                    <Button id="detailsNext" onClick={this.moveRight}>
                        Next
                    </Button>
                </div>
                <div className="detailsRecipeContainer">
                    <div className="detailsRecipeImageContainer">
                        <img className="detailsRecipeImage" src={imageUrl} alt="recipe"/>
                    </div>
                    <div className="detailsRecipeContent">
                        <h3>{recipeName}</h3>
                        <p>{"Calories: " + calories}</p>
                        <p>{"Total Weight: " + totalWeight}</p>
                        <h5>Ingredients</h5>
                        <div>{ingredientCards}</div>
                    </div>
                </div>
            </div>
        );
    }

    // Handler functions
    moveLeft() {
        let newIndex;
        if (this.state.currIndex === 0) {
            newIndex = this.state.recipes.length - 1;
        } else {
            newIndex = this.state.currIndex - 1;
        }

        this.setState({
            currIndex: newIndex,
            ingredients: []
        });

        this.fetchIngredients(this.state.recipes[newIndex].recipe_name);
    }

    moveRight() {
        let newIndex;
        if (this.state.currIndex === (this.state.recipes.length-1)) {
            newIndex = 0;
        } else {
            newIndex = this.state.currIndex + 1;
        }

        this.setState({
            currIndex: newIndex,
            ingredients: []
        });

        this.fetchIngredients(this.state.recipes[newIndex].recipe_name);
    }

    fetchIngredients(recipeName) {
        let url = '/recipes/ingredients/' + recipeName;
        fetch(url)
            .then((response) => response.json())
            .then((jsonResponse) => jsonResponse.data)
            .then ((ingredientsData) => {
                this.setState({
                    ingredients: ingredientsData
                });
            })
            .catch((error) => {
                console.log(error);
            })
    }
}

export default DetailsView