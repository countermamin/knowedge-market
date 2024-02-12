import React from "react";
import Head from "next/head";
import Center from "@/components/Center";
import TableWrapper from "@/components/TableWrapper";
import styled from "styled-components";

const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    margin-top: 40px;
`;

function CartSuccess(props) {
  return (
    <>
      <Head>
        <title>Корзина | KnowEdge Market</title>
      </Head>
      <Center>
        <TableWrapper>
          <Box>
            <h1>Спасибо за покупку!</h1>
            <p>
              Мы сообщим вам как только ваш товар будет
              отправлен.
            </p>
          </Box>
        </TableWrapper>
      </Center>
    </>
  );
}

export default CartSuccess;