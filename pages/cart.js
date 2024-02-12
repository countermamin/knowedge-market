import styled from "styled-components";
import Center from "@/components/Center";
import Head from "next/head";
import BuyerInfo from "@/components/BuyerInfo";
import CartProductsInfo from "@/components/CartProductsInfo";

const ColumnsWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
        grid-template-columns: 1.2fr 0.8fr;
    }
    gap: 20px;
`;

export default function CartPage() {
    return (
        <>
            <Head>
                <title>Корзина | KnowEdge Market</title>
            </Head>
            <Center>
                <ColumnsWrapper>
                    <CartProductsInfo/>
                    <BuyerInfo/>
                </ColumnsWrapper>
            </Center>
        </>
    );
}
