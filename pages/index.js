import Featured from "@/components/Featured";
import { Product } from "@/models/Product";
import { mongooseConnect } from "@/lib/mongoose";
import NewProducts from "@/components/NewProducts";
import { WishedProduct } from "@/models/WishedProduct";
import { getServerSession } from "next-auth";
import { authOptions } from "@/pages/api/auth/[...nextauth]";
import { Setting } from "@/models/Setting";
import Head from "next/head";

export default function HomePage({
    featuredProduct,
    newProducts,
    wishedNewProducts,
}) {
    return (
        <>
            <Head>
                <title>Главная | KnowEdge Market</title>
                <meta property="og:url" content="site.ru" />
                <meta property="og:type" content="website" />
                <meta property="og:locale" content="ru_RU" />
                <meta
                    property="og:title"
                    content="Онлайн магазин электронных товаров"
                />
                <meta
                    property="og:image"
                    content={featuredProduct.images?.[0]}
                />
                <meta property="og:site_name" content="KnowEdge Market" />
                <meta
                    property="og:description"
                    content="Онлайн магазин электронных товаров - это лучшее место для покупки смартфонов, ноутбуков, планшетов, наушников, колонок и других электронных устройств по выгодным ценам. У нас есть широкий выбор брендов и моделей, быстрая доставка и гарантия качества. Закажи сейчас и получи скидку 10% на первый заказ!"
                />
            </Head>
            <Featured product={featuredProduct} />
            <NewProducts
                products={newProducts}
                wishedProducts={wishedNewProducts}
            />
        </>
    );
}

export async function getServerSideProps(ctx) {
    await mongooseConnect();
    const featuredProductSetting = await Setting.findOne({
        name: "featuredProductId",
    });
    const featuredProductId = featuredProductSetting.value;
    const featuredProduct = await Product.findById(featuredProductId);
    const newProducts = await Product.find({}, null, {
        sort: { _id: -1 },
        limit: 10,
    });
    const session = await getServerSession(ctx.req, ctx.res, authOptions);
    const wishedNewProducts = session?.user
        ? await WishedProduct.find({
              userEmail: session.user.email,
              product: newProducts.map((p) => p._id.toString()),
          })
        : [];
    return {
        props: {
            featuredProduct: JSON.parse(JSON.stringify(featuredProduct)),
            newProducts: JSON.parse(JSON.stringify(newProducts)),
            wishedNewProducts: wishedNewProducts.map((i) =>
                i.product.toString()
            ),
        },
    };
}
