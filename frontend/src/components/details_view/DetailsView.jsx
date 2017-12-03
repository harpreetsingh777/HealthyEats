import React, { Component } from 'react'
import { Button, Label } from 'semantic-ui-react'

import './DetailsView.css'
import Tabs from '../tabs_view/Tabs.jsx'

class DetailsView extends Component {
    constructor() {
        super();
        this.state = {
            recipes: null,
            currIndex: 0
        };

        this.moveLeft = this.moveLeft.bind(this);
        this.moveRight = this.moveRight.bind(this);
    }

    componentDidMount() {
        let location = this.props.location;
        this.setState({
            recipes: location.recipes,
            currIndex: location.currIndex
        })
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
                        <p>{calories}</p>
                        <p>{totalWeight}</p>
                    </div>
                </div>
            </div>
        );
    }

    // Handler functions
    moveLeft() {
        if (this.state.currIndex === 0) {
            this.setState({
                currIndex: this.state.recipes.length - 1
            })
        } else {
            this.setState({
                currIndex: this.state.currIndex - 1
            })
        }
    }

    moveRight() {
        if (this.state.currIndex === (this.state.recipes.length-1)) {
            this.setState({
                currIndex: 0
            })
        } else {
            this.setState({
                currIndex: this.state.currIndex + 1
            })
        }
    }
}

export default DetailsView