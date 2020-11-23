import * as React from "react";

import Footer from "./components/organisms/Footer";
import Header from "./components/organisms/Header";

import { getProducts } from "./services/productService";

import "./App.css";

export default function App() {
  const [size, setSize] = React.useState("");
  const [products, setProducts] = React.useState([]);
  const [error, setError] = React.useState(null);

  React.useEffect(() => {
    getProducts("shoes")
      .then((res) => {
        setProducts(res);
      })
      .catch((e) => {
        setError(e);
      });
  }, [size]);

  function renderProduct(prod) {
    return (
      <div key={prod.id} className="product">
        <a href="/">
          <img src={`/images/${prod.image}`} alt={prod.name} />
          <h3>{prod.name}</h3>
          <p>${prod.price}</p>
        </a>
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

  return (
    <>
      <div className="content">
        <Header />
        <main>
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
        </main>
      </div>
      <Footer />
    </>
  );
}
