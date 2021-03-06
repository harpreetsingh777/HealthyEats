import React from 'react';
import {render} from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Login from './components/login/Login.jsx';
import SignUp from './components/signup/SignUp.jsx'
import RecipesView from "./components/recipes_view/RecipesView";
import DetailsView from "./components/details_view/DetailsView";
import FavoritesView from "./components/favorites_view/FavoritesView"
import SettingsView from "./components/settings_view/SettingsView"
import SuggestedView from "./components/suggested_view/SuggestedView"

render(<Router>
        <div className="mainContainer">
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/recipes" component={RecipesView} />
            <Route path="/favorites" component={FavoritesView} />
            <Route path="/details" component={DetailsView} />
            <Route path="/settings" component={SettingsView} />
            <Route path="/suggested" component={SuggestedView} />
        </div>
    </Router>, document.getElementById('root'));
