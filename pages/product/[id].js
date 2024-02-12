import Center from "@/components/Center";
import Title from "@/components/Title";
import { mongooseConnect } from "@/lib/mongoose";
import { Product } from "@/models/Product";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import ProductImages from "@/components/ProductImages";
import CartIcon from "@/components/icons/CartIcon";
import FlyingButton from "@/components/FlyingButton";
import ProductReviews from "@/components/ProductReviews";
import Head from "next/head";

const ColWrapper = styled.div`
    display: grid;
    grid-template-columns: 1fr;
    @media screen and (min-width: 768px) {
        grid-template-columns: 0.8fr 1.2fr;
    }
    gap: 40px;
    margin: 40px 0;
`;
const PriceRow = styled.div`
    display: flex;
    gap: 20px;
    align-items: center;
`;
const Price = styled.span`
    font-size: 1.4rem;
`;

export default function ProductPage({ product }) {
    return (
        <>
            <Head>
                <title>{product.title} | KnowEdge Market</title>
                <meta property="og:url" content="site.ru" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ru_RU" />
                <meta property="og:title" content={product.title} />
                <meta property="og:image" content={product.images?.[0]} />
                <meta property="og:site_name" content="KnowEdge Market" />
                <meta property="og:description" content={product.description} />
            </Head>
            <Center>
                <ColWrapper>
                    <WhiteBox>
                        <ProductImages images={product.images} />
                    </WhiteBox>
                    <div>
                        <Title>{product.title}</Title>
                        <p>{product.description}</p>
                        <PriceRow>
                            <div>
                                <Price>
                                    {product.price.toLocaleString("ru")} тг
                                </Price>
                            </div>
                            <div>
                                <FlyingButton
                                    main
                                    _id={product._id}
                                    src={product.images?.[0]}
                                >
                                    <CartIcon />
                                    Добавить в корзину
                                </FlyingButton>
                            </div>
                        </PriceRow>
                    </div>
                </ColWrapper>
                <ProductReviews product={product} />
            </Center>
        </>
    );
}

export async function getServerSideProps(context) {
    await mongooseConnect();
    const { id } = context.query;
    const product = await Product.findById(id);
    return {
        props: {
            product: JSON.parse(JSON.stringify(product)),
        },
    };
}
