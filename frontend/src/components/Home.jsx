import React, { Component } from 'react'
import {Input, Button} from 'semantic-ui-react'

import styles from './Home.css'
class Home extends Component {
	constructor() {
        super();
        this.state = {
            value: "",
            recipes: [],
            filteredRecipes: [],
            filteredIngredients: []
        };
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
    }

    componentDidMount() {
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
  	}

    inputChangeHandler(event){
        this.setState({value: event.target.value});
    }

    clickHandler(){
        let tempRecipe = [];
        let tempIngredients = [];
        this.state.recipes.map((recipe) =>{
            let recipeURL = '/recipes/ingredients/' + recipe.recipe_name + "/"
            console.log(recipeURL)
            fetch(recipeURL)
            .then((response) => response.json())
            .then((jsonResponse) => jsonResponse.data)
            .then((ingredientsData) =>{
                ingredientsData.map( (ingredient) => {
                    if(ingredient.name == this.state.value){
                        tempRecipe.push(recipe);
                        tempIngredients.push(ingredientsData);
                        this.setState({
                            filteredRecipes: tempRecipe,
                            filteredIngredients: tempIngredients
                        })
                    }
                })
            })
            .catch((error) => {
                console.log(error);
            })
        })
    }
    render() {
        return(
            <div className="Home">
                <h1>Welcome to HealthyEats!</h1>
                 <Input onChange = {this.inputChangeHandler} placeholder = "Put in an ingredient!" value = {this.state.value} />
                <Button onClick = {this.clickHandler}>Search</Button>
                {this.state.recipes.map(recipe =>
          			<div key={recipe.recipe_name}>{recipe.recipe_name}</div>
        		)}
            </div>
        )
    }
}

export default Home
