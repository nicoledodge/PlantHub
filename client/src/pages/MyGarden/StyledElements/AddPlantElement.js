import styled from "styled-components";

export const SummaryContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 10px;
`;

export const ImageContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 35%;
  max-height: 100%;
  img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
    border-radius: 10px;
  }

  @media-screen and (min-width: 800px) {
    max-height: 350px;
    max-width: 35%;
  }
`;

export const RecordSummary = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: flex-start;
  width: 60%;
  padding: 0% 1%;
  height: 100%;
`;

export const RecommendationText = styled.p`
  font-family: "Arial", sans-serif;
  font-size: 12px;
  font-weight: 400;
  color: #333333;

  @media-screen and (min-width: 800px) {
    font-size: 18px;
  }
  @media-screen and (min-width: 800px) {
    font-size: 24px;
  }
`;
