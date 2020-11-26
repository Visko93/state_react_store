import * as React from "react";

const amptyAddress = {
  city: "",
  country: ",",
};

function CheckoutForm() {
  const [address, setAddress] = React.useState(amptyAddress);

  function handleChange(e) {}

  function handleBlur(e) {}

  function handleSubmit(e) {}
  return (
    <>
      <h1>Informações para entrega</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="city">Cidade</label>
          <br />
          <input
            name="city"
            id="city"
            type="text"
            value={address.city}
            onBlur={handleBlur}
            onChange={handleChange}
          />
        </div>

        <div>
          <label htmlFor="country">Pais</label>
          <br />
          <select
            name="country"
            id="country"
            value={address.country}
            onBlur={handleBlur}
            onChange={handleChange}
          >
            <option value="">Selecione um país</option>
            <option value="China">China</option>
            <option value="India">India</option>
            <option value="Reino Unido">Reino Unido</option>
            <option value="EUA">EUA</option>
          </select>
        </div>

        <div>
          <input
            type="submit"
            value="Salvar informações"
            className="btn btn-primary"
          />
        </div>
      </form>
    </>
  );
}

export default CheckoutForm;
