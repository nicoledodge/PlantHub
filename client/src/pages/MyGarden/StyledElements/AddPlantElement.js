import styled from "styled-components";

export const SummaryContainer = styled.div`
display: flex;
justify-content: space-around;
align-items: flex-end;
padding: 10px;
`;

export const ImageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 40%;
height: 100%;
flex-direction: column;
// @media screen and (min-width: 1400px) {
//   flex-direction: column;
// }
`;

export const RecordSummary = styled.div`
display: flex;
height: 100%;
flex-direction: column;
justify-content: center;
flex-wrap: wrap;
align-items: flex-start;
width: 60%;
background-color: pink;
padding-left: 10%;
`;