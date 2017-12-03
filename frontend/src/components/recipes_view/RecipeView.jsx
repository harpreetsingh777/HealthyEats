import React, { Component } from 'react'
import './RecipeView.css'
import { Button } from 'semantic-ui-react'


class RecipeView extends Component {
    render() {
        return (
            <div className="listRecipeContainer" onClick={this.props.recipeClick}>
                <div className="listRecipeImageContainer">
                    <img className="listRecipeImage" src={this.props.imageUrl} alt="Recipe"/>
                </div>
                <div className="listRecipeContent">
                    <h3>{this.props.recipeName}</h3>
                    <p>{"Calories: " + this.props.calories}</p>
                    <Button id="favorite" onClick={this.props.favoriteClick}>
                        {this.props.favoriteButtonString}
                    </Button>
                </div>
            </div>
        )
    }
}

export default RecipeView