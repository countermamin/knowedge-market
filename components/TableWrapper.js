import styled from "styled-components";

const StyledTableWrapper = styled.div`
    table thead tr th:nth-child(3),
    table tbody tr td:nth-child(3),
    table tbody tr.subtotal td:nth-child(2) {
        text-align: right;
    }
    table tr.subtotal td {
        padding: 15px 0;
    }
    table tbody tr.subtotal td:nth-child(2) {
        font-size: 1.2rem;
    }
    tr.total td {
        font-weight: bold;
    }
    .countButts {
        display: flex;
        text-align: center;
        @media screen and (max-width: 550px) {
            display: inline-block;
        }
    }
`;


function TableWrapper({ children }) {
    return <StyledTableWrapper>{children}</StyledTableWrapper>;
}

export default TableWrapper;