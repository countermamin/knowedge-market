import React from "react";
import styled from "styled-components";
import Center from "./Center";

const FooterContainer = styled.footer`
    background-color: #000;
    color: #fff;
    margin-top: 26px;
`;

const FooterInfo = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    justify-content: space-between;
    gap: 10px;
    flex-wrap: wrap;
    margin-bottom: 0;
`;

const StyledText = styled.p`
    color: #fff;
    text-decoration: none;
    transition: color 0.2s;
    cursor: pointer;

    &:hover {
        color: #888;
    }
`;

const AdaptiveFooter = (props) => {
    return (
        <FooterContainer>
            <Center>
                <FooterInfo>
                    <li>
                        <h4>Контактная информация</h4>
                        <StyledText>+7 777 777 77 77</StyledText>
                        <StyledText>orzu.maminov9@gmail.com</StyledText>
                    </li>
                    <li>
                        <h4>© 2024 Все права защищены</h4>
                    </li>
                </FooterInfo>
            </Center>
        </FooterContainer>
    );
};

export default AdaptiveFooter;
