import * as React from "react";
import { Route, Routes } from "react-router-dom";

import Products from "./components/pages/Products";
import DetailProduct from "./components/pages/DetailProduct";
import Cart from "./components/pages/Cart";

function Routing() {
  return (
    <Routes>
      <Route exact path="/">
        <h1>Um mundo de descobertas a cada mordida</h1>
      </Route>
      <Route path="/:category" element={<Products />} />
      <Route path="/:category/:id" element={<DetailProduct />} />
      <Route path="/cart" element={<Cart />} />
    </Routes>
  );
}

export default Routing;
