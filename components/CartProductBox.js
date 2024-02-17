import React, { useContext, useEffect, useState } from "react";
import Image from "next/image";
import EllipsisWrapper from "@/components/EllipsisWrapper";
import Button from "@/components/Button";
import { CartContext } from "@/components/CartContext";
import axios from "axios";
import styled from "styled-components";

const ProductInfoCell = styled.td`
    padding: 10px 0;
    button {
        padding: 0 !important;
    }
`;

const ProductImageBox = styled.div`
    width: 70px;
    height: 100px;
    padding: 2px;
    border: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 10px;
    @media screen and (min-width: 768px) {
        padding: 10px;
        width: 100px;
        height: 100px;
    }
`;

const QuantityLabel = styled.span`
    padding: 0 15px;
    display: flex;
    align-items: center;
    @media screen and (min-width: 768px) {
        display: flex;
        align-items: center;
        padding: 0 6px;
    }
`;

function CartProductBox(props) {
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


  useEffect(() => {
    if (cartProducts.length > 0) {
      axios.post("/api/cart", { ids: cartProducts }).then((response) => {
        setProducts(response.data);
      });
    } else {
      setProducts([]);
    }
  }, [cartProducts]);

  function moreOfThisProduct(id) {
    addProduct(id);
  }
  function lessOfThisProduct(id) {
    removeProduct(id);
  }

  return (
    <>
      {products.map((product) => {
        const quantity = cartProducts.filter((id) => id === product._id).length;
        return (
          quantity > 0 && (
            <tr key={product._id} className="countButtWrapper">
              <ProductInfoCell>
                <ProductImageBox>
                  <Image src={product.images?.[0]} width={120} height={80} alt="img" />
                </ProductImageBox>
                <EllipsisWrapper>{product.title}</EllipsisWrapper>
              </ProductInfoCell>
              <td>
                <div className="countButts">
                  <Button onClick={() => lessOfThisProduct(product._id)}>-</Button>
                  <QuantityLabel>{quantity}</QuantityLabel>
                  <Button onClick={() => moreOfThisProduct(product._id)}>+</Button>
                </div>
              </td>
              <td>
                {(quantity * product.price).toLocaleString("ru")} тг
              </td>
            </tr>
          )
        );
      })}
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

export default CartProductBox;
