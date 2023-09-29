import Header from "@/components/Header";
import Title from "@/components/Title";
import Center from "@/components/Center";
import { signIn, signOut, useSession } from "next-auth/react";
import Button from "@/components/Button";
import styled from "styled-components";
import WhiteBox from "@/components/WhiteBox";
import { RevealWrapper } from "next-reveal";
import Input from "@/components/Input";
import { useEffect, useState } from "react";
import axios from "axios";
import Spinner from "@/components/Spinner";
import ProductBox from "@/components/ProductBox";
import Tabs from "@/components/Tabs";
import SingleOrder from "@/components/SingleOrder";
import AdaptiveFooter from "@/components/Footer";

const ColsWrapper = styled.div`
  display:grid;
  grid-template-columns: 1.2fr .8fr;
  gap: 40px;
  margin: 40px 0;
  p{
    margin:5px;
  } 
  @media (max-width: 680px) {
    grid-template-columns: 1fr; /* Change to a single column layout */
    gap: 20px; /* Reduce the gap between items */
    margin: 20px 0; /* Adjust margin as needed */
    p {
      margin: 5px;
    }
  }
`;

const CityHolder = styled.div`
  display:flex;
  gap: 5px;
`;

const WishedProductsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 40px;
`;

const WrapperForAll = styled.div`
  overflow-y: auto; /* Добавление вертикальной прокрутки по мере необходимости */
  max-height: calc(100vh - (70px + 146px));
  @media (max-width: 476px) {
    max-height: calc(100vh - (70px + 220px));
  }
`;

export default function AccountPage() {
  const { data: session } = useSession();
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [city, setCity] = useState('')
  const [country, setCountry] = useState('')
  const [addressLoaded, setAddressLoaded] = useState(true);
  const [wishlistLoaded, setWishlistLoaded] = useState(true);
  const [orderLoaded, setOrderLoaded] = useState(true);
  const [wishedProducts, setWishedProducts] = useState([]);
  const [activeTab, setActiveTab] = useState('Заказы');
  const [orders, setOrders] = useState([]);

  async function logout() {
    await signOut({
      callbackUrl: process.env.NEXT_PUBLIC_URL,
    });
  }
  async function login() {
    await signIn('google');
  }
  function saveAddress() {
    const data = {
      name, email, phoneNumber, address, zipCode, city, country
    };
    axios.put('/api/address', data);
  }
  useEffect(() => {
    if (!session) {
      return;
    }
    setAddressLoaded(false);
    setWishlistLoaded(false);
    setOrderLoaded(false);
    axios.get('/api/address').then(response => {
      if (response.data.length === 0) {
        return setAddressLoaded(true);
      } else {
        setName(response.data.name);
        setEmail(response.data.email);
        setCity(response.data.city);
        setZipCode(response.data.zipCode);
        setAddress(response.data.address);
        setCountry(response.data.country);
        setPhoneNumber(response.data.phoneNumber);
        setAddressLoaded(true);
      }
    });
    axios.get('/api/wishlist').then(response => {
      setWishedProducts(response.data.map(wp => wp.product));
      setWishlistLoaded(true);
    });
    axios.get('/api/orders').then(response => {
      setOrders(response.data);
      setOrderLoaded(true);
    });
  }, [session]);
  function productRemovedFromWishlist(idToRemove) {
    setWishedProducts(products => {
      return [...products.filter(p => p._id.toString() !== idToRemove)];
    });
  }
  return (
    <>
      <Header />
      <WrapperForAll>
        <Center>
          <ColsWrapper>
            <div>
              <RevealWrapper delay={0}>
                <WhiteBox>
                  <Tabs
                    tabs={['Заказы', 'Избранное']}
                    active={activeTab}
                    onChange={setActiveTab}
                  />
                  {activeTab === 'Заказы' && (
                    <>
                      {!orderLoaded && (
                        <Spinner fullWidth={true} />
                      )}
                      {orderLoaded && (
                        <div>
                          {orders.length === 0 && (
                            <p>Авторизуйтесь чтобы увидеть свои заказы</p>
                          )}
                          {orders.length > 0 && orders.map(o => (
                            <SingleOrder key={o._id} {...o} />
                          ))}
                        </div>
                      )}
                    </>
                  )}
                  {activeTab === 'Избранное' && (
                    <>
                      {!wishlistLoaded && (
                        <Spinner fullWidth={true} />
                      )}
                      {wishlistLoaded && (
                        <>
                          <WishedProductsGrid>
                            {wishedProducts.length > 0 && wishedProducts.map(wp => (
                              <ProductBox key={wp._id} {...wp} wished={true} onRemoveFromWishlist={productRemovedFromWishlist} />
                            ))}
                          </WishedProductsGrid>
                          {wishedProducts.length === 0 && (
                            <>
                              {session && (
                                <p>В избранные ничего не добавлено</p>
                              )}
                              {!session && (
                                <p>Авторизуйтесь чтобы добавлять в избранное</p>
                              )}
                            </>
                          )}
                        </>
                      )}
                    </>
                  )}
                </WhiteBox>
              </RevealWrapper>
            </div>
            <div>
              <RevealWrapper delay={100}>
                {/* ДЕТАЛИ АККАУНТА */}
                <WhiteBox>
                  <h2>{session ? 'Детали аккаунта' : 'Логин'}</h2>
                  {!addressLoaded && (
                    <Spinner fullWidth={true} />
                  )}
                  {addressLoaded && session && (
                    <>
                      <Input type="text" placeholder={'Имя'}
                        value={name}
                        name={"name"}
                        onChange={e => setName(e.target.value)} />
                      <Input type="email" placeholder={'Электронная почта'}
                        value={email}
                        name={"email"}
                        onChange={e => setEmail(e.target.value)} />
                      <Input type="number" placeholder={'Номер телефона'}
                        value={phoneNumber}
                        name={"phoneNumber"}
                        onChange={e => setPhoneNumber(e.target.value)} />
                      <Input type="text" placeholder={'Адрес'}
                        value={address}
                        name="address"
                        onChange={e => setAddress(e.target.value)} />
                      <CityHolder>
                        <Input type="text" placeholder={'Почтовый индекс'}
                          value={zipCode}
                          name={"zipCode"}
                          onChange={e => setZipCode(e.target.value)} />
                        <Input type="text" placeholder={'Город'}
                          value={city}
                          name={"city"}
                          onChange={e => setCity(e.target.value)} />
                      </CityHolder>
                      <Input type="text" placeholder={'Страна'}
                        value={country}
                        name={"country"}
                        onChange={e => setCountry(e.target.value)} />
                      <Button black block
                        onClick={saveAddress}>
                        Сохранить
                      </Button>
                      <hr />
                    </>
                  )}
                  {session && (
                    <Button primary onClick={logout}>Выйти</Button>
                  )}
                  {!session && (
                    <Button primary onClick={login}>Войти через Google</Button>
                  )}
                </WhiteBox>
              </RevealWrapper>
            </div>
          </ColsWrapper>
        </Center>
      </WrapperForAll>
      <AdaptiveFooter bottom={1} />
    </>
  );
}