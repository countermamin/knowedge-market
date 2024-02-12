"use client";
import React, { useContext, useEffect, useState } from "react";
import Input from "@/components/Input";
import Button from "@/components/Button";
import styled from "styled-components";
import axios from "axios";
import { useSession } from "next-auth/react";
import { RevealWrapper } from "next-reveal";
import { CartContext } from "@/components/CartContext";


const Box = styled.div`
    background-color: #fff;
    border-radius: 10px;
    padding: 30px;
    margin-top: 40px;
`;

const CityHolder = styled.div`
    display: flex;
    gap: 5px;
`;

function BuyerInfo(props) {
  const { cartProducts } =
    useContext(CartContext);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [address, setAddress] = useState("");
  const [zipCode, setZipCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");
  const { data: session } = useSession();

  useEffect(() => {
    if (!session) {
      return;
    }
    axios.get("/api/address").then((response) => {
      setName(response.data.name);
      setEmail(response.data.email);
      setCity(response.data.city);
      setZipCode(response.data.zipCode);
      setAddress(response.data.address);
      setCountry(response.data.country);
      setPhoneNumber(response.data.phoneNumber);
    });
  }, [session]);

  async function goToPayment() {
    const response = await axios.post("/api/checkout", {
      name,
      email,
      phoneNumber,
      address,
      zipCode,
      city,
      country,
      cartProducts,
    });
    if (response.data.url) {
      window.location = response.data.url;
    }
  }

  return (
    <>
      {!!cartProducts?.length ? (
        <RevealWrapper delay={100}>
          <Box>
            <h2>Заказ</h2>
            <Input
              type="text"
              placeholder={"Имя"}
              value={name}
              name={"name"}
              onChange={(e) => setName(e.target.value)}
            />
            <Input
              type="email"
              placeholder={"Электронная почта"}
              value={email}
              name={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              type="number"
              placeholder={"Номер телефона"}
              value={phoneNumber}
              name={"phoneNumber"}
              onChange={(e) =>
                setPhoneNumber(e.target.value)
              }
            />
            <Input
              type="text"
              placeholder={"Адрес"}
              value={address}
              name="address"
              onChange={(e) => setAddress(e.target.value)}
            />
            <CityHolder>
              <Input
                type="text"
                placeholder={"Почтовый индекс"}
                value={zipCode}
                name={"zipCode"}
                onChange={(e) =>
                  setZipCode(e.target.value)
                }
              />
              <Input
                type="text"
                placeholder={"Город"}
                value={city}
                name={"city"}
                onChange={(e) =>
                  setCity(e.target.value)
                }
              />
            </CityHolder>
            <Input
              type="text"
              placeholder={"Страна"}
              value={country}
              name={"country"}
              onChange={(e) => setCountry(e.target.value)}
            />
            <Button
              black={"1"}
              block={"1"}
              onClick={goToPayment}
            >
              Перейти к оплате
            </Button>
          </Box>
        </RevealWrapper>
      ) : null}
    </>
  );
}

export default BuyerInfo;