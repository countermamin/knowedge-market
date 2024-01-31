import styled from "styled-components";
import Button, { ButtonStyle } from "@/components/Button";
import CartIcon from "@/components/icons/CartIcon";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { CartContext } from "@/components/CartContext";
import { primary } from "@/lib/colors";
import FlyingButton from "@/components/FlyingButton";
import HeartOutlineIcon from "@/components/icons/HeartOutlineIcon";
import HeartSolidIcon from "@/components/icons/HeartSolidIcon";
import axios from "axios";
import { useSession } from "next-auth/react";

const ProductWrapper = styled.div`
  button{
    width: 100%;
    text-align: center;
    justify-content: center;
  }
`;

const WhiteBox = styled(Link)`
  background-color: #fff;
  padding: 20px;
  height: 120px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 10px;
  position: relative;
  img{
    max-width: 100%;
    max-height: 80px;
  }
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
  transition: box-shadow 0.5s ease-in-out;

  &:hover {
    box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  }
`;

const Title = styled(Link)`
width: 100%;
font-weight: normal;
font-size:.9rem;
color:inherit;
text-decoration:none;
margin:0;
overflow: hidden;
text-overflow: ellipsis;
white-space: nowrap;
`;

const ProductInfoBox = styled.div`
  margin-top: 5px;
`;

const PriceRow = styled.div`
  display: flex;
  @media screen and (min-width: 768px) {
    display: flex;
    gap: 5px;
  }
  align-items: center;
  justify-content:space-between;
  margin-top:2px;
`;

const Price = styled.div`
  font-size: 1rem;
  font-weight:400;
  text-align: right;
  @media screen and (min-width: 768px) {
    font-size: 1.2rem;
    font-weight:600;
    text-align: left;
  }
`;

const WishlistButton = styled.button`
  border:0;
  width: 40px !important;
  height: 40px;
  padding: 10px;
  position: absolute;
  top:0;
  right:0;
  background:transparent;
  cursor: pointer;
  ${props => props.wished ? `
    color:red;
  ` : `
    color:black;
  `}
  svg{
    width: 16px;
  }
`;

export default function ProductBox({
  _id, title, description, price, images, wished = false,
  onRemoveFromWishlist = () => { },
}) {
  const { data: session } = useSession();
  const url = '/product/' + _id;
  const [isWished, setIsWished] = useState(wished);
  function addToWishlist(ev) {
    ev.preventDefault();
    ev.stopPropagation();
    if (session) {
      const nextValue = !isWished;
      if (nextValue === false && onRemoveFromWishlist) {
        onRemoveFromWishlist(_id);
      }
      axios.post('/api/wishlist', {
        product: _id,
      }).then(() => { });
      setIsWished(nextValue);
    } else {
      alert('Требуется авторизация');
    }
  }
  return (
    <ProductWrapper>
      <WhiteBox href={url}>
        <div>
          <WishlistButton wished={isWished} onClick={addToWishlist}>
            {isWished ? <HeartSolidIcon /> : <HeartOutlineIcon />}
          </WishlistButton>
          <img src={images?.[0]} alt="img" />
        </div>
      </WhiteBox>
      <ProductInfoBox>
        <Title href={url}>{title}</Title>
        <PriceRow>
          <Price>
            {price.toLocaleString('ru')} тг
          </Price>
          <FlyingButton _id={_id} src={images?.[0]}><CartIcon /></FlyingButton>
        </PriceRow>
      </ProductInfoBox>
    </ProductWrapper>
  );
}