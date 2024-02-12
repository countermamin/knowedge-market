import styled from "styled-components";
import { ButtonStyle } from "@/components/Button";
import { primary } from "@/lib/colors";
import { CartContext } from "@/components/CartContext";
import { memo, useContext, useEffect, useRef, useState } from "react";
import Image from "next/image";

const FlyingButtonWrapper = styled.div`
    button {
        ${ButtonStyle};
        ${(props) =>
            props.main
                ? `
      background-color: ${primary};
      color:white;
    `
                : `
      background-color: transparent;
      border: 1px solid ${primary};
      color:${primary};
    `}
        ${(props) =>
            props.white &&
            `
      background-color: white;
      border: 1px solid white;
      font-weight:500;
    `}
    }
    @keyframes fly {
        100% {
            top: 0;
            left: 65%;
            opacity: 0;
            display: none;
            max-width: 50px;
            max-height: 50px;
        }
    }
    @media (max-width: 1200px) {
        @keyframes fly {
            100% {
                top: 0;
                left: 65%;
                opacity: 0;
                display: none;
                max-width: 50px;
                max-height: 50px;
            }
        }
    }
    @media (max-width: 768px) {
        @keyframes fly {
            100% {
                top: 0;
                left: 90%;
                opacity: 0;
                display: none;
                max-width: 50px;
                max-height: 50px;
            }
        }
    }
    img {
        display: none;
        max-width: 100px;
        max-height: 100px;
        opacity: 1;
        position: fixed;
        z-index: 5;
        animation: fly 1s;
        border-radius: 10px;
    }
`;

export default function FlyingButton(props) {
    const { addProduct } = useContext(CartContext);
    const imgRef = useRef();
    function sendImageToCart(ev) {
        imgRef.current.style.display = "inline-block";
        imgRef.current.style.left = ev.clientX - 50 + "px";
        imgRef.current.style.top = ev.clientY - 50 + "px";
        setTimeout(() => {
            imgRef.current.style.display = "none";
        }, 1000);
    }
    useEffect(() => {
        const interval = setInterval(() => {
            const reveal = imgRef.current?.closest("div[data-sr-id]");
            if (reveal?.style.opacity === "1") {
                // visible
                reveal.style.transform = "none";
            }
        }, 100);

        return () => clearInterval(interval);
    }, []);
    return (
        <>
            <FlyingButtonWrapper
                white={props.white}
                main={props.main}
                onClick={() => addProduct(props._id)}
            >
                <Image
                    ref={imgRef}
                    src={props.src}
                    width={100}
                    height={100}
                    alt="img"
                    style={{ maxHeight: 100, maxWidth: 100 }}
                />
                <button onClick={(ev) => sendImageToCart(ev)} {...props} />
            </FlyingButtonWrapper>
        </>
    );
}
