import * as React from "react";

import Footer from "./components/organisms/Footer";
import Header from "./components/organisms/Header";
import Routing from "./router";

import "./App.css";

export default function App() {
  return (
    <>
      <div className="content">
        <Header />
        <main>
          <Routing />
        </main>
      </div>
      <Footer />
    </>
  );
}
