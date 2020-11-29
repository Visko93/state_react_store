import * as React from "react";

import cartReducer from "../components/reducers/cartReducer";

const CartContext = React.createContext(null); //Criação do context

// Inicialização verificando o local storage
let initialCart;
try {
  const localCart = JSON.parse(localStorage.getItem("cart"));
  initialCart = localCart.find((item) => item.quantity !== String(0)) ?? [];
} catch (error) {
  console.error(`A aplicação não conseguiu recuperar o JSON, por: ${error}`);
  initialCart = [];
}

/**
 *
 * Elemneto principal do contexto que ira ser o provider
 */
export function CartProvider(props) {
  const [cart, dispatch] = React.useReducer(cartReducer, initialCart);

  React.useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart), [cart]);
  });

  const contextValue = {
    cart,
    dispatch,
  };
  return (
    <CartContext.Provider value={contextValue}>
      {props.children}
    </CartContext.Provider>
  );
}

/**
 * Custom hook para acesso aou context
 */

export function useCart() {
  const context = React.useContext(CartContext);
  if (!context) {
    throw new Error(
      "useCart precisa ter um Context Provider implementado. Inclua o componente pai comum dentro de <CartProvider />"
    );
  }
  return context;
}
