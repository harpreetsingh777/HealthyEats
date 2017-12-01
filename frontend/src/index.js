import React from 'react';
import {render} from 'react-dom';
import './index.css';
import {BrowserRouter as Router, Route, Link} from 'react-router-dom'

import Home from './components/Home.jsx';
import Login from './components/Login.jsx';

render(<Router>
        <div className="mainContainer">
            <div className="topContainer">
                <div className="buttonsContainer">
                    <Link to="/recipes"></Link>
                    <Link to="/users"></Link>
                </div>
            </div>

            <Route path="/recipes" component={Home} />
            <Route path="/users" component={Login} />
        </div>
    </Router>, document.getElementById('root'));
