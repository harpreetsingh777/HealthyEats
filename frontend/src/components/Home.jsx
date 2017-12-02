import React, { Component } from 'react'
import {Input, Button, Card} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import styles from './Home.css'
import RecipeView from './RecipeView.jsx'

class Home extends Component {
	constructor() {
        super();
        this.state = {
            value: "",
            recipes: [],
            filteredRecipe: [],
            calories: "",
            restriction: ""
        };
        this.inputChangeHandler = this.inputChangeHandler.bind(this);
        this.clickHandler = this.clickHandler.bind(this);
        this.clickAdvanceHandler = this.clickAdvanceHandler.bind(this)
        this.inputCalorieChangeHandler = this.inputCalorieChangeHandler.bind(this)
        this.inputDietChangeHandler = this.inputDietChangeHandler.bind(this)
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
        let tempIngredients = [];
        let tempRecipes = [];
        this.state.recipes.map((recipe) =>{
            if (recipe.recipe_name === this.state.value){
                let tempRecipe = {
                    recipe_name: recipe.recipe_name,
                    image_url: recipe.image_url,
                    calories: recipe.calories,
                    ingredients: []
                }
                let recipeURL = '/recipes/ingredients/' + recipe.recipe_name + "/"
                fetch(recipeURL)
                .then((response) => response.json())
                .then((jsonResponse) => jsonResponse.data)
                .then((ingredientsData) =>{
                    ingredientsData.map( (ingredient) => {
                        tempIngredients.push(ingredient.ingredient_name);
                        tempRecipe.ingredients = tempIngredients
                    })
                    tempRecipes.push(tempRecipe);
                    this.setState({ filteredRecipe: tempRecipes})
                    console.log(this.state.filteredRecipe)
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        })
    }

    inputCalorieChangeHandler(event){
        this.setState({calorie: event.target.value})
    }

    inputDietChangeHandler(event){
        this.setState({ restriction: event.target.value})
    }
//Need to finish filtering by calories and dietary restrictions

    clickAdvanceHandler(){
        let tempIngredients = [];
        this.state.recipes.map((recipe) =>{
            if (this.state.calories.length == 0 || recipe.calories <= this.state.calories){
                let recipeURL = '/recipes/ingredients/' + recipe.recipe_name + "/"
                fetch(recipeURL)
                .then((response) => response.json())
                .then((jsonResponse) => jsonResponse.data)
                .then((ingredientsData) =>{
                    ingredientsData.map( (ingredient) => {
                        tempIngredients.push(ingredient.ingredient_name);
                        this.setState({
                            filteredIngredients: tempIngredients
                        })
                        console.log(tempIngredients);
                    })
                })
                .catch((error) => {
                    console.log(error);
                })
            }
        })
    }
    //RecipeView not rendering for some reason
    render() {
        return(
            <div className="Home">
                <h1>Welcome to HealthyEats!</h1>
                 <Input onChange = {this.inputChangeHandler} placeholder = "Put in a recipe!" value = {this.state.value} />
                <Button onClick = {this.clickHandler}>Search</Button>
                <h3> OR </h3>
                 <Input onChange = {this.inputCalorieChangeHandler} placeholder = "Put in a calorie amount!" value = {this.state.calories} />
                <Input onChange = {this.inputDietChangeHandler} placeholder = "Put in a dietary restriction!" value = {this.state.restriction} />
                 <Button onClick = {this.clickAdvanceHandler}>Search</Button>
                 { this.state.filteredRecipe.map((recipe) => {
                    <RecipeView recipe = {recipe}></RecipeView>
                    })
                } 
            </div>
        )
    }
}

export default Home
