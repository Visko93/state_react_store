import * as React from "react";
import { useParams, useNavigate } from "react-router-dom";

import useFetch from "../../hooks/useFetch";
import NotFound from "../NotFound";
import Spinner from "../../atoms/Spinner";

export default function Detail() {
  const { id } = useParams();
  const navigate = useNavigate();
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
        <p>
          <button className="btn btn-primary" onClick={() => navigate("/cart")}>
            Adicionar ao carrinho
          </button>
        </p>
        <img src={`/images/${product.image}`} alt={product.category} />
      </div>
    </>
  );
}

/**
 * TODO: Desiplay these products details
 * return (
 *  <div id="detail">
 *    <h1>{product.name}</h1>
 *    <p>{product.description}</p>
 *    <p id="price">$ {product.price}</p>
 *    <img src{`/images/${product.image}`} alt={product.category }/>
 *  </div>
 * )
 */
