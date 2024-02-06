import Link from "next/link";
import styled from "styled-components";
import { ButtonStyle } from "@/components/Button";
import { memo } from "react";

const StyledLink = styled(Link)`
    ${ButtonStyle}
`;

const MemoizedStyledLink = memo(StyledLink);

export default function ButtonLink(props) {
    return <MemoizedStyledLink {...props} />;
}
