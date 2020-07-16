import React from 'react';
import { Route, BrowserRouter, Switch } from 'react-router-dom';

import Home from './pages/home';
import User from './pages/user';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route component={Home} path="/" exact />
            <Route component={User} path="/users/:action/:id?" exact />
        </Switch>
    </BrowserRouter>
);

export default Routes;