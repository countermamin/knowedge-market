import React, { useContext, useEffect, useState } from "react";
import Table from "@/components/Table";
import { CartContext } from "@/components/CartContext";
import styled from "styled-components";
import { RevealWrapper } from "next-reveal";
import TableWrapper from "@/components/TableWrapper";
import CartSuccess from "@/components/CartSuccess";


const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    margin-top: 40px;
`;

function CartProductsContainer({children}) {
  const { cartProducts, clearCart } = useContext(CartContext);
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    if (window?.location.href.includes("success")) {
      setIsSuccess(true);
      clearCart();
    }
  }, [])

  if (isSuccess) {
    return (
      <CartSuccess/>
    )
  }

  return (
    <RevealWrapper delay={0}>
      <>
        <TableWrapper>
          <Box>
            <h2>Корзина</h2>
            {!cartProducts?.length && (
              <div>Ваша козина пустая</div>
            )}
            {!!cartProducts?.length && (
              <Table>
                <thead>
                <tr>
                  <th>Товар</th>
                  <th>Количество</th>
                  <th>Цена</th>
                </tr>
                </thead>
                <tbody>
                {children}
                </tbody>
              </Table>
            )}
          </Box>
        </TableWrapper>
      </>
    </RevealWrapper>
  );
}

export default CartProductsContainer;