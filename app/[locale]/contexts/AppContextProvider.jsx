"use client";
import { FC, PropsWithChildren, useEffect, useState } from "react";
import AppContext from ".";
import Cookies from "js-cookie";

const AppContextProvider = (props) => {
  // const storedUser = typeof window != "undefined" ? Cookies.get("user") : "";
  // const storedToken = typeof window != "undefined" ? Cookies.get("token") : "";
  // const storedCart = typeof window !== "undefined" ? Cookies.get("cart") : "";

  // Auth State
  const [isAuth, setIsAuth] = useState(false);
  const [cart, setCart] = useState([]); // Initialize as an empty array
  const [user, setUser] = useState(undefined);
  const [token, setToken] = useState(undefined);

  useEffect(() => {
    const storedCart = Cookies.get("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }

    const storedUser = Cookies.get("user");
    const storedToken = Cookies.get("token");

    if (storedUser && storedToken) {
      setUser(JSON.parse(storedUser));
      setToken(storedToken);
      setIsAuth(true);
    }
  }, []);

  // Auth Functions
  const login = ({ user, token }) => {
    if (user && token && token.length > 0) {
      setUser(user);
      setToken(token);
      Cookies.set("user", JSON.stringify(user), { expires: 7, path: "/" });
      Cookies.set("token", token, { expires: 7, path: "/" });
    }
  };

  const logout = () => {
    setUser(undefined);
    setToken(undefined);
    setIsAuth(false);
    Cookies.remove("user");
    Cookies.remove("cart");
    Cookies.remove("token");
  };

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);
      if (existingItem) {
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, qty: cartItem.qty + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, qty: 1 }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateCartItemQuantity = (itemId, quantity) => {
    setCart((prevCart) =>
      prevCart.map((item) =>
        item.id === itemId ? { ...item, quantity } : item
      )
    );
  };

  // Effects
  useEffect(() => {
    console.log("check is auth");
    if (user && token && token.length > 0) {
      console.log("LoggedIn");
      setUser(user);
      setToken(token);
      // router.replace({ pathname: "/" });
      setIsAuth(true);
    }
  }, [user, token]);

  useEffect(() => {
    setTimeout(() => {
      Cookies.set("cart", JSON.stringify(cart), { expires: 2 }); // Store cart for 1 day and make it accessible globally
    }, 800);
  }, [cart]);

  // Dispatched State
  const context = {
    isAuth,
    user,
    token,
    login,
    logout,
    setUser,
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    setCart,
  };
  return (
    <AppContext.Provider value={context}>{props.children}</AppContext.Provider>
  );
};

export default AppContextProvider;
