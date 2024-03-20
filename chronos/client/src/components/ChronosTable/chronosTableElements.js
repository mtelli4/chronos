import styled from "styled-components";

export const ChronosTableWrapper = styled.div`
    width: ${props => props.width}%;
    max-height: 80vh;
    overflow: auto;
    border-radius: 10px;
    padding-right: 5px;
`;

export const ChronosTableCont = styled.table`
    border: none;
    outline: none;
    border-spacing: 0px;
    border-radius: 10px;
    min-width: 100%;
    background: linear-gradient(90deg, #AD6DFF, #8734DB);
   // background: linear-gradient(135deg, #AD6DFF, #8734DB);
`;

export const ChronosTableHead = styled.thead`
`;

export const ChronosTableBody = styled.tbody`

`;

export const ChronosTableHeader = styled.tr`
    position: sticky;
    top: 0;
    background: linear-gradient(90deg, #AD6DFF, #8734DB);
`;

export const ChronosTableButtonCont = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
`;

export const ChronosTableH = styled.th`
    padding: 15px 15px;
    background: none;
    min-width: 300px;
    color: #fff;
    font-weight: normal;
    position: ${props => props.sticky ? "sticky" : "relative"};
    left : ${props => props.sticky ? "0" : ""};
    background: ${props => props.rowCell ? "linear-gradient(270deg, #AD6DFF, #8734DB);" : "none"};

    /* text-align: ${props => props.centered ? "center" : "left"}; */
    text-align: left;
    border-top-right-radius: ${props => props.rightCorner ? "10px" : "0px"};
    border-top-left-radius: ${props => props.leftCorner ? "10px" : "0px"};
`;

export const ChronosTableRow = styled.tr`
    width: 100%;
`;

export const ChronosTableCell = styled.td`
    padding: 10px 15px;
    text-align: center;
    background: ${props => props.num % 2 == 0 ? "#eee" : "#fff"};
    border-top-left-radius: ${props => props.leftCorner ? "5px" : "0px"};
`;

