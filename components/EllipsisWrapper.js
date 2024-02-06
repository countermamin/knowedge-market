import styled from "styled-components";
import { memo } from "react";

const StyledEllipsisWrapper = styled.div`
    padding-top: 3px;
    overflow: hidden;
    width: 160px;
    white-space: nowrap;
    text-overflow: ellipsis;
`;

function EllipsisWrapper({ children }) {
    return <StyledEllipsisWrapper>{children}</StyledEllipsisWrapper>;
}

export default memo(EllipsisWrapper);
