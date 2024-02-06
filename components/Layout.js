import React from "react";
import Header from "./Header";
import AdaptiveFooter from "./Footer";
import styled from "styled-components";

const FlexBox = styled.div`
    display: flex;
    flex-direction: column;
    min-height: 100vh;
`;

const MainBox = styled.div`
    flex: 1 0 auto;
`;

const FooterBox = styled.div`
    flex: 0 0 auto;
`;

function Layout({ children }) {
    return (
        <FlexBox>
            <Header />
            <MainBox>{children}</MainBox>
            <FooterBox>
                <AdaptiveFooter />
            </FooterBox>
        </FlexBox>
    );
}

export default Layout;
