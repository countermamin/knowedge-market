"use client";
import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import axios from "axios";

function CartProductsTotal(props) {
  const { cartProducts, addProduct, removeProduct, clearCart } =
    useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [shippingFee, setShippingFee] = useState(null);

  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  useEffect(() => {
    axios.get("/api/settings?name=shippingFee").then((res) => {
      setShippingFee(res.data.value);
    });
  }, [])

  let productsTotal = 0;
  for (const productId of cartProducts) {
    const price = products.find((p) => p._id === productId)?.price || 0;
    productsTotal += price;
  }

  return (
    <>
      <tr className="subtotal">
        <td colSpan={2}>Товары</td>
        <td>
          {productsTotal.toLocaleString("ru")} тг
        </td>
      </tr>
      <tr className="subtotal">
        <td colSpan={2}>Доставка</td>
        <td>
          {shippingFee?.toLocaleString("ru")} тг
        </td>
      </tr>
      <tr className="subtotal total">
        <td colSpan={2}>Итого</td>
        <td>
          {(
            productsTotal +
            parseInt(shippingFee || 0)
          ).toLocaleString("ru")} тг
        </td>
      </tr>
    </>
  );
}

export default CartProductsTotal;