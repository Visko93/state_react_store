import * as React from "react";
import { Route, Routes } from "react-router-dom";

import Products from "./components/pages/Products";
import DetailProduct from "./components/pages/DetailProduct";
import Cart from "./components/pages/Cart";
import CheckoutForm from "./components/organisms/CheckoutForm";

function Routing() {
  const [cart, setCart] = React.useState(() => {
    try {
      return JSON.parse(localStorage.getItem("cart")) ?? [];
    } catch (error) {
      console.error(
        `A aplicação não conseguiu recuperar o JSON, por: ${error}`
      );
      return [];
    }
  });

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart), [cart]);
  });

  function addToCart(id, sku) {
    setCart((prevCart) => {
      const itemInCart = prevCart.find((i) => i.sku === sku);
      return itemInCart
        ? cart.map((item) =>
            item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
          )
        : [...prevCart, { id, sku, quantity: 1 }];
    });
  }
  function updateQuantity(sku, quantity) {
    setCart((prevState) => {
      if (quantity === 0) {
        return prevState.filter((item) => item.sku !== sku);
      }
      return prevState.map((item) =>
        item.sku === sku ? { ...item, quantity } : item
      );
    });
  }
  return (
    <Routes>
      <Route exact path="/">
        <h1>Um mundo de descobertas a cada mordida</h1>
      </Route>
      <Route path="/:category" element={<Products />} />
      <Route
        path="/:category/:id"
        element={<DetailProduct addToCart={addToCart} />}
      />
      <Route
        path="/cart"
        element={<Cart cart={cart} updateQuantity={updateQuantity} />}
      />
      <Route path="/checkout" element={<CheckoutForm cart={cart} />} />
    </Routes>
  );
}

export default Routing;
