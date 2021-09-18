import './App.css';
import React, { createContext, useState } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import Home from './Component/Home/Home';
import Orders from './Component/Orders/Orders';
import NoMatch from './Component/NoMatch/NoMatch';
import ManageProduct from './Component/ManageProduct/ManageProduct';
import AddProduct from './Component/AddProduct/AddProduct';
import Login from './Component/Login/Login';
import CheckOut from './Component/Orders/CheckOut';
import PrivetRoute from './Component/PrivetRoute/PrivetRoute';

export const ProductContext = createContext();

function App() {
 
  const [loggedInUser, setLoggedInUser] = useState({});
 

  return (
    <ProductContext.Provider value={[loggedInUser, setLoggedInUser]} className="App">
      <Router>
        <Switch>
          <Route path="/home">
            <Home></Home>
          </Route>
          <PrivetRoute path="/orders">
            <Orders></Orders>
          </PrivetRoute>
          <Route exact path="/">
            <Home />
          </Route>
          <PrivetRoute path="/manageProduct">
            <ManageProduct></ManageProduct>
          </PrivetRoute>
          <Route path="/login">
            <Login></Login>
          </Route>
          <PrivetRoute path="/addProduct">
            <AddProduct></AddProduct>
          </PrivetRoute>
          <PrivetRoute path="/checkout/:id">
            <CheckOut></CheckOut>
          </PrivetRoute>
          <Route path="*">
            <NoMatch />
          </Route>
        </Switch>
      </Router>
    </ProductContext.Provider>
  );
}

export default App;
