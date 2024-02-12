import React from "react";
import CartProductsContainer from "@/components/CartProductsContainer";
import CartProductsTotal from "@/components/CartProductsTotal";
import CartProductBox from "@/components/CartProductBox";

function CartProductsInfo() {
  return (
    <CartProductsContainer>
      <CartProductBox/>
      <CartProductsTotal/>
    </CartProductsContainer>
  );
}

export default CartProductsInfo;