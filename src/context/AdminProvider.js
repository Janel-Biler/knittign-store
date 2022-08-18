import React from "react";
import { knitProductsApi } from "../helpers/const";

export const AdminContext = React.createContext();

const reducer = (state, action) => {
  if (action.type === "GET_KNIT_PRODUCTS") {
    return {
      ...state,
      knitProducts: action.payload,
    };
  }

  if (action.type === "GET_EDIT_KNIT_PRODUCT") {
    return {
      ...state,
      savedEditedProduct: action.payload,
    };
  }

  return state;
};

function AdminProvider({ children }) {
  const [state, dispatch] = React.useReducer(reducer, {
    knitProducts: [],
    savedEditedProduct: null,
  });

  const addNewProduct = (newProduct) => {
    fetch(knitProductsApi, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newProduct),
    }).then(() => {
      getKnitProducts();
    });
  };

  const getKnitProducts = () => {
    fetch(knitProductsApi)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_KNIT_PRODUCTS",
          payload: data,
        };
        dispatch(action);
      });
  };

  const deleteKnitProduct = (id) => {
    fetch(`${knitProductsApi}/${id}`, {
      method: "DELETE",
    }).then(() => getKnitProducts());
  };

  const getEditKnitProduct = (id) => {
    fetch(`${knitProductsApi}/${id}`)
      .then((res) => res.json())
      .then((data) => {
        let action = {
          type: "GET_EDIT_KNIT_PRODUCT",
          payload: data,
        };
        dispatch(action);
      });
  };

  const toSaveEditedKnitProduct = (editedProduct) => {
    fetch(`${knitProductsApi}/${editedProduct.id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(editedProduct),
    });
  };

  const data = {
    knitProducts: state.knitProducts,
    savedEditedKnitProduct: state.savedEditedKnitProduct,
    savedEditedProduct: state.savedEditedProduct,
    deleteKnitProduct,
    getKnitProducts,
    addNewProduct,
    getEditKnitProduct,
    toSaveEditedKnitProduct,
  };

  return <AdminContext.Provider value={data}>{children}</AdminContext.Provider>;
}

export default AdminProvider;
