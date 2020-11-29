export default function cartReducer(cart, action) {
  switch (action.type) {
    case "empty":
      return [];
      break;
    case "add":
      {
        const { id, sku } = action;
        const itemInCart = cart.find((i) => i.sku === sku);
        return itemInCart
          ? cart.map((item) =>
              item.sku === sku ? { ...item, quantity: item.quantity + 1 } : item
            )
          : [...cart, { id, sku, quantity: 1 }];
      }
      break;
    case "update":
      const { sku, quantity } = action;
      return quantity === 0
        ? cart.filter((item) => item.sku !== sku)
        : cart.map((item) => (item.sku === sku ? { ...item, quantity } : item));
      break;
    default:
      throw new Error("Unhandled action " + action.type);
      break;
  }
}
