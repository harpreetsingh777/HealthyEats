import React from 'react';
import {render} from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'

import Login from './components/login/Login.jsx';
import SignUp from './components/signup/SignUp.jsx'
import RecipesView from "./components/recipes_view/RecipesView";

render(<Router>
        <div className="mainContainer">
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
            <Route path="/recipes" component={RecipesView} />
        </div>
    </Router>, document.getElementById('root'));
