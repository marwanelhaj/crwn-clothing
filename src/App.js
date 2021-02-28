import React from 'react'
import { Switch, Route } from 'react-router-dom'
import './App.css';

import Homepage from './components/pages/homepage/homepage.component'
import ShopPage from './components/pages/shop/shop.component.jsx'


function App() {
  return (
    <div>
     <Switch>
       <Route exact path='/' component={Homepage} /> 
       <Route  path='/shop' component={ShopPage} /> 
     </Switch> 
    </div>
  );
}

export default App;
