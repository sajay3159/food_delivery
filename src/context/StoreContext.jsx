import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});
  const [food_list, setFood_List] = useState([]);
  const [token, setToken] = useState("");
  const [userName, setUserName] = useState("");
  const url = import.meta.env.VITE_BACKEND_URL;
  console.log("Backend URL:", url);

  const addToCart = async (itemId) => {
    setCartItems((prev) => ({
      ...prev,
      [itemId]: prev[itemId] ? prev[itemId] + 1 : 1,
    }));

    if (token) {
      await axios.post(
        url + "/api/cart/add",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const removeFromCart = async (itemId) => {
    setCartItems((prev) => {
      const newCount = (prev[itemId] || 0) - 1;
      return { ...prev, [itemId]: newCount > 0 ? newCount : 0 };
    });

    if (token) {
      await axios.post(
        url + "/api/cart/remove",
        { itemId },
        { headers: { token } }
      );
    }
  };

  const getTotalCartAmount = () => {
    let total = 0;
    for (const itemId in cartItems) {
      if (cartItems[itemId] > 0) {
        const itemInfo = food_list.find((f) => f._id === itemId);
        if (!itemInfo) continue;
        total += itemInfo.price * cartItems[itemId];
      }
    }
    return total;
  };

  const fetchFoodList = async () => {
    try {
      const res = await axios.get(url + "/api/food/list");
      setFood_List(res.data.data || []);
    } catch (err) {
      console.error("Failed to fetch food list", err);
    }
  };

  const loadCartData = async (token) => {
    try {
      const res = await axios.post(
        url + "/api/cart/get",
        {},
        { headers: { token } }
      );
      setCartItems(res.data.cartData || {});
    } catch (err) {
      console.error("Failed to load cart data", err);
    }
  };

  useEffect(() => {
    async function loadData() {
      await fetchFoodList();
      const localToken = localStorage.getItem("token");
      if (localToken) {
        setToken(localToken);
        await loadCartData(localToken);
      }
    }
    loadData();
  }, []);

  return (
    <StoreContext.Provider
      value={{
        cartItems,
        setCartItems,
        food_list,
        addToCart,
        removeFromCart,
        getTotalCartAmount,
        url,
        token,
        setToken,
        userName,
        setUserName,
      }}
    >
      {children}
    </StoreContext.Provider>
  );
};

export default StoreContextProvider;
