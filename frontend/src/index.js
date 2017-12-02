import React from 'react';
import {render} from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Home from './components/Home.jsx';
import Login from './components/login/Login.jsx';
import SignUp from './components/signup/SignUp.jsx'

render(<Router>
        <div className="mainContainer">
            <Route path="/recipes" component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
        </div>
    </Router>, document.getElementById('root'));
