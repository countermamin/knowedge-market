import Header from "@/components/Header";
import Center from "@/components/Center";
import Input from "@/components/Input";
import styled from "styled-components";
import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import ProductsGrid from "@/components/ProductsGrid";
import { debounce } from "lodash";
import Spinner from "@/components/Spinner";
import AdaptiveFooter from "@/components/Footer";

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const HeaderBox = styled.div`
  flex: 0 0 auto;
`;

const MainBox = styled.div`
  flex: 1 0 auto;
`;

const FooterBox = styled.div`
  flex: 0 0 auto;
`;

const SearchInput = styled(Input)`
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 1.4rem;
`;
const InputWrapper = styled.div`
  margin: 25px 0;
  padding: 5px 0;
  background-color: #eeeeeeaa;
`;


export default function SearchPage() {
  const [phrase, setPhrase] = useState("");
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const debouncedSearch = useCallback(
    debounce((searchPhrase) => {
      if (searchPhrase.length > 0) {
        searchProducts(searchPhrase);
      } else {
        // If the search phrase is empty, clear the products
        setProducts([]);
      }
    }, 500),
    []
  );

  useEffect(() => {
    // Trigger the debounced search when the phrase changes
    debouncedSearch(phrase);

    // Cleanup function to cancel the ongoing debounced search if the phrase becomes empty
    return () => debouncedSearch.cancel();
  }, [phrase, debouncedSearch]);

  function searchProducts(phrase) {
    axios
      .get("/api/products?phrase=" + encodeURIComponent(phrase))
      .then((response) => {
        setProducts(response.data);
        setIsLoading(false);
      });
  }
  return (
    <FlexBox>
      <HeaderBox>
        <Header />
      </HeaderBox>
      <MainBox>
        <Center>
          <InputWrapper>
            <SearchInput
              autoFocus
              value={phrase}
              onChange={(ev) => setPhrase(ev.target.value)}
              placeholder="Поиск товара..."
            />
          </InputWrapper>
          {!isLoading && phrase !== "" && products.length === 0 && (
            <h2>Не найдено товаров по запросу &quot;{phrase}&quot;</h2>
          )}
          {isLoading && <Spinner fullWidth={true} />}
          {!isLoading && products.length > 0 && (
            <ProductsGrid products={products} />
          )}
        </Center>
      </MainBox>
      <FooterBox>
        <AdaptiveFooter />
      </FooterBox>
    </FlexBox>
  );
}
