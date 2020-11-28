import React from "react";
import { useNavigate } from "react-router-dom";

import useFetchAll from "../../hooks/useFetchAll";
import Spinner from "../../atoms/Spinner";

export default function Cart({ cart, updateQuantity }) {
  const urls = cart.map((i) => `products/${i.id}`);
  const { data: products, loading, error } = useFetchAll(urls);

  const navigate = useNavigate();

  function renderItem(itemInCart) {
    const { id, sku, quantity } = itemInCart;
    const { price, name, image, skus } = products.find(
      (p) => p.id === parseInt(id)
    );
    const { size } = skus.find((s) => s.sku === sku);

    if (parseInt(quantity) === 0) {
      localStorage.removeItem((item) => item.find((i) => i.quantity === 0));
      return;
    }
    return (
      <li key={sku} className="cart-item">
        <img src={`/images/${image}`} alt={name} />
        <div>
          <h3>{name}</h3>
          <p>${price}</p>
          <p>Size: {size} </p>
          <p>
            <select
              aria-label={`Select quantity for ${name} size ${size}`}
              onChange={(e) => updateQuantity(sku, e.target.value)}
              value={quantity}
            >
              <option value="0">Remove</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </p>
        </div>
      </li>
    );
  }

  if (loading) return <Spinner />;
  if (error) throw error;

  const numItemsInCart = cart.reduce(
    (acc, item) => acc + parseInt(item.quantity),
    0
  );
  return (
    <section id="cart">
      <h1>
        {numItemsInCart === 0
          ? "O seu carrinho está vazio"
          : `${numItemsInCart} Item${
              numItemsInCart > 1 ? "s já estão" : " já está"
            }  no seu carrinho !`}
      </h1>
      <ul>{cart.map(renderItem)}</ul>
      {Object.entries(cart).length !== 0 ? (
        <button
          className="btn btn-primary"
          onClick={() => navigate("/checkout")}
        >
          Confirmar pedido
        </button>
      ) : null}
    </section>
  );
}
