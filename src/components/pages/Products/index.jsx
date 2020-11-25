import * as React from "react";
import { useParams, Link } from "react-router-dom";

import Spinner from "../../atoms/Spinner";
import useFecth from "../../hooks/useFetch";
import NotFound from "../NotFound";

export default function Products() {
  const [size, setSize] = React.useState("");
  const { category } = useParams();

  const { data: products, error, loading } = useFecth(
    `products?category=${category}`
  );
  //Fecth Method
  // React.useEffect(() => {
  //   setLoading(true);
  //   getProducts("shoes")
  //     .then((res) => setProducts(res))
  //     .catch((e) => setError(e))
  //     .finally(() => setLoading(false));
  // }, []);

  // Async Method
  // React.useEffect(() => {
  //   async function init() {
  //     try {
  //       const res = await getProducts("shoes");
  //       setProducts(res);
  //     } catch (e) {
  //       setError(e);
  //     } finally {
  //       setLoading(false);
  //     }
  //   }
  //   init();
  // }, []);

  function renderProduct(prod) {
    return (
      <div key={prod.id} className="product">
        <Link to={`/${category}/${prod.id}`}>
          <img src={`/images/${prod.image}`} alt={prod.name} />
          <h3>{prod.name}</h3>
          <p>${prod.price}</p>
        </Link>
      </div>
    );
  }

  const filteredProducts = size
    ? products.filter((prod) =>
        prod.skus.find((s) => s.size === parseInt(size))
      )
    : products;

  // Caso haja algum erro evita que o componente seja retornado
  if (error) throw error;
  if (loading) return <Spinner />;
  if (products.length === 0) return <NotFound />;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size ? <h2>Found {filteredProducts.length} items</h2> : null}
      </section>
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
}
