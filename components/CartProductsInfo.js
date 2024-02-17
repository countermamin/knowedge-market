import React from "react";
import CartProductsContainer from "@/components/CartProductsContainer";
import CartProductBox from "@/components/CartProductBox";

function CartProductsInfo() {
  return (
    <>
      <CartProductsContainer>
        <CartProductBox/>
      </CartProductsContainer>
    </>
  );
}

export default CartProductsInfo;