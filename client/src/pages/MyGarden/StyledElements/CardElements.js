import styled from "styled-components";

export const ContentContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
`;

export const ImageContainer = styled.div`
display: flex;
justify-content: center;
align-items: center;
width: 250px;
background-color: blue;
@media screen and (min-width: 1400px) {
  flex-direction: column;
}
`;

export const MainLayout = styled.div`
display: none;
@media screen and (min-width: 1400px) {
  display: flex;
  flex-direction: column;
}
`;

export const ListLayout = styled.div`
display: flex;
width: 100%;
background-color: blue;
@media screen and (min-width: 1400px) {
  display: none;
}
`;

export const NameBox = styled.div`
width: 30%;
display: flex;
align-items: center;
background-color: red;
`;

export const WaterBox = styled.div`
width: 55%;
display: flex;
align-items: center;
`;

export const IconBox = styled.div`
width: 15%;
display: flex;
justify-content: center;
align-items: center;
`;