import React, { Component } from 'react'
import './RecipeView.css'

class RecipeView extends Component {
    render() {
        return (
            <div className="listRecipeContainer">
                <div className="listRecipeImageContainer">
                    <img className="listRecipeImage" src={this.props.imageUrl} alt="Recipe"/>
                </div>
                <div className="listRecipeContent">
                    <h3>{this.props.recipeName}</h3>
                    <p>{"Calories: " + this.props.calories}</p>
                </div>
            </div>
        )
    }
}

export default RecipeView