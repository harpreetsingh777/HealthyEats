import React, { Component } from 'react'
import { Button, Card } from 'semantic-ui-react'

class RecipeView extends Component {
	constructor(){
		super();
		this.clickFavoriteHandler = this.clickFavoriteHandler.bind(this)
	}

	clickFavoriteHandler(){

    }

    render() {
    	let ingredientsView;
    	if(this.props.recipe.length === 0){
    		return <div>No Recipe!</div>
    	}
    	else{
    		 ingredientsView = this.props.recipe.ingredients.map( (ingredient) =>{
    			return <p>{ingredient} </p>
    		})
    	}
    	return(
    	<Card className="RecipeView">
            <Card.Content>
            	<Card.Header>
                    {this.props.recipe.recipe_name}
                </Card.Header>
                <img src={this.props.recipe.image_url} />
                <h4>Ingredients</h4>
                {ingredientsView}
                <Button onClick = {this.clickFavoriteHandler}> Favorite </Button>
             </Card.Content>
           </Card>
       )
    }
}

export default RecipeView