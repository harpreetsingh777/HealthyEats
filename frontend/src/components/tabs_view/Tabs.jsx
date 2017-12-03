import React, { Component } from 'react'
import { Button, Label } from 'semantic-ui-react'
import {Link} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

import './Tabs.css'

class Tabs extends Component {

    render() {
        return(
            <div className="mainContainer">
                <div className="topContainer">
                    <div>
                        <Label size='massive' color='black'>HealthyEats</Label>
                    </div>
                    <div className="buttonsContainer">
                        <Link to="/recipes">
                            <Button inverted={false} size='big'
                                    id="recipesButton">All Recipes</Button>
                        </Link>
                        <Link to="/favorites">
                            <Button inverted={false} size='big'
                                    id="favoritesButton">Favorites</Button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }
}

export default Tabs