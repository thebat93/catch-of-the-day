// Главный файл где все собирается + Роутинг
import React from 'react';
import { render } from 'react-dom';
import './css/style.css';


import App from './components/App';
import StorePicker from './components/StorePicker';
import NotFound from './components/NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

// Router component
const Root = () => {
    return (
        <Router>
            <Switch>
                <Route exact path="/" component={StorePicker} />
                <Route path="/store/:storeId" component={App} />
                <Route component={NotFound} />
            </Switch>
        </Router>
    )
}

render(<Root />, document.querySelector('#main'));