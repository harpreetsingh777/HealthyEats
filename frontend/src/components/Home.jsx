import React, { Component } from 'react'

class Home extends Component {
	constructor() {
        super();
        this.state = {
            recipes: []
        };
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

    render() {
        return(
            <div className="Home">
                <h1>Welcome to HealthyEats!</h1>
                {this.state.recipes.map(recipe =>
          			<div key={recipe.name}>{recipe.name}</div>
        		)}
            </div>
        )
    }
}

export default Home
