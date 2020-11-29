import * as React from "react";
import { useCart } from "../../../context/cartContext";
import { saveShippingAddress } from "../../../services/shippingService";

const amptyAddress = {
  city: "",
  country: "",
};
const STATUS = {
  IDLE: "IDLE",
  SUBMITTING: "SUBMITTING",
  SUBMITTED: "SUBMITTED",
  COMPLETED: "COMPLETED",
};

function CheckoutForm() {
  const [address, setAddress] = React.useState(amptyAddress);
  const [status, setStatus] = React.useState(STATUS.IDLE);
  const [saveError, setSaveError] = React.useState(null);
  const [touched, setTouched] = React.useState({});
  const { cart, dispatch } = useCart();

  // Stato Derivado
  const errors = getErrors(address);
  const isValid = Object.keys(errors).length === 0;

  function handleChange(e) {
    const { name, value } = e.target; // alternative persist the event e.persist();

    setAddress((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }
  console.log(cart);

  function handleBlur(e) {
    const { id } = e.target;

    setTouched((current) => {
      return { ...current, [id]: true };
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus(STATUS.SUBMITTING);
    if (isValid) {
      try {
        await saveShippingAddress(address);
        dispatch({ type: "empty" });
        setStatus(STATUS.COMPLETED);
      } catch (e) {
        setSaveError(e);
      }
    } else {
      setStatus(STATUS.SUBMITTED);
    }
  }

  function getErrors(address) {
    const result = {};
    if (!address.city) result.city = "Precisamos saber qual a cidade.";
    if (!address.country) result.country = "Precisamos saber qual é o País.";
    return result;
  }

  if (saveError) throw saveError;
  if (status === STATUS.COMPLETED) return <h1>Obrigada!!</h1>;

  return (
    <>
      <h1>Informações para entrega</h1>
      {!isValid && status === STATUS.SUBMITTED ? (
        <div role="alert">
          <p>Complete as informações</p>
          <ul>
            {Object.keys(errors).map((key) => {
              return <li key={key}>{errors[key]}</li>;
            })}
          </ul>
        </div>
      ) : null}
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
          <p role="alert">
            {touched.city || status === STATUS.SUBMITTED ? errors.city : null}
          </p>
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
          <p role="alert">
            {touched.country || status === STATUS.SUBMITTED
              ? errors.country
              : null}
          </p>
        </div>

        <div>
          <input
            type="submit"
            value="Salvar informações"
            className="btn btn-primary"
            disabled={status === STATUS.SUBMITTING}
          />
        </div>
      </form>
    </>
  );
}

export default CheckoutForm;
