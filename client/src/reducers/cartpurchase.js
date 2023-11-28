/* eslint-disable no-unused-expressions */
import Cookies from "js-cookie";

const cart = [];

const handleCart = (state = cart, action) => {
  const product = action.payload;
  switch (action.type) {
    case "ADDITEM":
      // Check if product already in cart
      const exist = state.find((x) => x.stock_id === product.stock_id);
      console.log(exist, "ee");
      if (exist) {
        return state.map((x) => {
          if (x.id === product.id) {
            localStorage.setItem(
              "access_token",
              JSON.stringify([{ ...x, qty: x.qty + 1 }])
            );
          } else {
            localStorage.setItem("access_token", JSON.stringify({ ...x }));
          }
        });
        // return state.map((x) =>
        //   x.id === product.id ? { ...x, qty: x.qty + 1 } : x
        // );
      } else {
        localStorage.setItem(
          "access_token",
          JSON.stringify([...state, { ...product, qty: 1 }])
        );
        return [...state, { ...product, qty: 1 }];
      }
      break;
    case "DELITEM":
      const exist2 = state.find((x) => x.id === product.id);
      if (exist2.qty === 1) {
        return state.filter((x) => x.id !== exist2.id);
      } else {
        return state.map((x) =>
          x.id === product.id ? { ...x, qty: x.qty - 1 } : x
        );
      }
      break;

    default:
      return state;
      break;
  }
};

export default handleCart;
