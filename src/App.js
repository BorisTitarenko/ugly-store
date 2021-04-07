import './App.css';
import React from 'react'
import ProductList from "./ProductStore/components/ProductList";
import {BrowserRouter, Switch, Route} from "react-router-dom";
import ProductDetails from "./ProductStore/components/ProductDetails";

function App() {
  return (
    <div className="App">
        <BrowserRouter>
            <Switch>
                <Route path="/products/:productId">
                    <ProductDetails/>
                </Route>
                <Route path="/">
                    <ProductList/>
                </Route>

            </Switch>
        </BrowserRouter>
    </div>
  );
}

export default App;
