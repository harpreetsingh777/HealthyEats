import React from 'react';
import {render} from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Login from './components/login/Login.jsx';
import SignUp from './components/signup/SignUp.jsx'
import RecipesView from "./components/recipes_view/RecipesView";
import DetailsView from "./components/details_view/DetailsView";
import FavoritesView from "./components/favorites_view/FavoritesView"

render(<Router>
        <div className="mainContainer">
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/recipes" component={RecipesView} />
            <Route path="/favorites" component={FavoritesView} />
            <Route path="/details" component={DetailsView} />
        </div>
    </Router>, document.getElementById('root'));
