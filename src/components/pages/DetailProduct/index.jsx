import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import { useCart } from "../../../context/cartContext";

import NotFound from "../NotFound";
import Spinner from "../../atoms/Spinner";

export default function Detail() {
  const { dispatch } = useCart();
  const { id } = useParams();
  const navigate = useNavigate();
  const [sku, setSku] = React.useState("");

  const { data: product, error, loading } = useFetch(`products/${id}`);

  if (loading) return <Spinner />;
  if (!product) return <NotFound />;
  if (error) throw error;

  return (
    <>
      <div id="detail">
        <h1>{product.name}</h1>
        <p>{product.description}</p>
        <p id="price">$ {product.price}</p>
        <select
          id="size"
          value={sku}
          onChange={(e) => {
            setSku(e.target.value);
          }}
        >
          <option value="">Escolha o tamanho</option>
          {product.skus.map((item) => (
            <option key={item.sku} value={item.sku}>
              {item.size}
            </option>
          ))}
        </select>
        <p>
          <button
            disabled={!sku}
            className="btn btn-primary"
            onClick={() => {
              dispatch({ type: "add", id, sku });
              navigate("/cart");
            }}
          >
            Adicionar ao carrinho
          </button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category} />
      </div>
    </>
  );
}
