import React, { useReducer } from "react";
import { knitProductsApi } from "../helpers/const";

export const UserContext = React.createContext();

function reducer(state, action) {
  if (action.type === "GET_PRODUCTS") {
    return {
      ...state,
      knitProducts: action.payload,
    };
  }
  if (action.type === "GET_KNIT_PRODUCTS_FROM_BASKET") {
    return {
      ...state,
      basketKnitProducts: action.payload,
    };
  }

  return state;
}

function UserProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, {
    knitProducts: [],
    basketKnitProducts: {
      products: [],
      totalPrice: 0,
    },
  });

  const [filterByPrice, setFilterByPrice] = React.useState([0, 999999]);
  const [minmax, setMinMax] = React.useState([0, 99999]);
  const [searchWord, setSearchWord] = React.useState("");

  const limit = 3;
  const [pagesCount, setPagesCount] = React.useState(1);
  const [currentPage, setCurrentPage] = React.useState(1);

  const getKnitProducts = () => {
    fetch(
      `${knitProductsApi}?q=${searchWord}&price_gte=${filterByPrice[0]}&price_lte=${filterByPrice[1]}&_limit=${limit}&_page=${currentPage}`
    )
      .then((res) => {
        let count = Math.ceil(res.headers.get("X-total-Count") / limit);
        setPagesCount(count);
        return res.json();
      })
      .then((data) => {
        let action = {
          type: "GET_PRODUCTS",
          payload: data,
        };
        dispatch(action);
      });
  };

  // ! Basket
  const addKnitProductToBasket = (newProduct) => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        totalPrice: 0,
        products: [],
      };
    }
    let productToBasket = {
      ...newProduct,
      count: 1,
      subPrice: newProduct.price,
    };

    let check = basket.products.find((item) => {
      return item.id === productToBasket.id;
    });
    if (check) {
      basket.products = basket.products.map((item) => {
        if (item.id === productToBasket.id) {
          item.count++;
          item.subPrice = item.count * item.price;
          return item;
        }
        return item;
      });
    } else {
      basket.products.push(productToBasket);
    }
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    localStorage.setItem("basket", JSON.stringify(basket));
    let action = {
      type: "GET_KNIT_PRODUCTS_FROM_BASKET",
      payload: basket,
    };
    dispatch(action);
    getBasketCount();
  };

  // ! price
  const getPrices = () => {
    fetch(knitProductsApi)
      .then((res) => res.json())
      .then((data) => {
        data.sort((a, b) => a.price - b.price);
        let max = +data[data.length - 1].price;
        let min = +data[0].price;
        setFilterByPrice([min, max]);
        setMinMax([min, max]);
      });
  };

  // ! otobrajenie v navbare

  const getBasketCount = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (!basket) {
      basket = {
        products: [],
      };
    }
    let action = {
      type: "GET_BASKET_COUNT",
      payload: basket.products.length,
    };
    dispatch(action);
  };

  const getKnitProductsFromBasket = () => {
    let basket = JSON.parse(localStorage.getItem("basket"));
    if (basket) {
      let action = {
        type: "GET_KNIT_PRODUCTS_FROM_BASKET",
        payload: basket,
      };
      dispatch(action);
    } else {
      let basket2 = {
        products: [],
        totalCount: 0,
      };
      let action = {
        type: "GET_KNIT_PRODUCTS_FROM_BASKET",
        payload: basket2,
      };
      dispatch(action);
    }
  };

  const deleteKnitProductsFromBasket = (id) => {
    let basket = JSON.parse(localStorage.getItem("basket"));

    basket.products = basket.products.filter((item) => {
      //todo #1 вернуть все продукты кроме того id item совпадает айди из аргумента функции
      return item.id !== id;
    });

    // заново считает общую стоимость всех товаров в корзине
    basket.totalPrice = basket.products.reduce((prev, item) => {
      return prev + item.subPrice;
    }, 0);
    // обратно закидывает товары в локал сторэдж
    localStorage.setItem("basket", JSON.stringify(basket));

    //todo #1 вызвать функцию стягивания корзины из лк get
    getKnitProductsFromBasket();
  };

  React.useEffect(() => {
    getPrices();
    getBasketCount();
  }, []);

  const data = {
    knitProducts: state.knitProducts,
    minmax,
    limit,
    pagesCount,
    currentPage,
    filterByPrice,
    basketKnitProducts: state.basketKnitProducts,
    minmax,
    basketCount: state.basketCount,
    searchWord,
    addKnitProductToBasket,
    deleteKnitProductsFromBasket,
    setMinMax,
    getBasketCount,
    getKnitProductsFromBasket,
    getKnitProducts,
    setFilterByPrice,
    setPagesCount,
    setCurrentPage,
    setSearchWord,
  };

  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
}

export default UserProvider;
