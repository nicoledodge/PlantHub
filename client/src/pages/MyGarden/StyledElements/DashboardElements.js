import styled from "styled-components";
export const DashboardContainer = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column-reverse;
    align-items: center;
    justify-content: center;
    @media screen and (min-width: 1400px) {
      flex-direction: row;
      flex: 1;
    }
  `;

  export const PlantFeedContainer = styled.div`
    width: 95%;
    padding: 5px 0px;
    max-height: 80vh;
    display: flex;
    justify-content: center;
    align-items: center;
    padding-bottom: 5%;
    @media screen and (min-width: 1400px) {
      width: 30%;
      padding: 1%;
    }
  `;

  export const ScrollableContent = styled.div`
    overflow-y: auto;
    width: 100%;
    max-height:80vh;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;

    /* Scroll Indicator Styles */
    &::-webkit-scrollbar {
      width: 8px;
      
    }

    &::-webkit-scrollbar-track {
      background: #ebdbae;
      padding: 4px;
      width: 10px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: #C5C78B; 
      border-radius: 4px;
    }


    .scroll-indicator {
      position: absolute;
      right: 0;
      top: 0;
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      opacity: 0;
      transition: opacity 0.3s ease-in-out;

      &:hover {
        opacity: 1;
      }
    }

    .scroll-indicator-button {
      display: flex;
      align-items: center;
      justify-content: center;
      background-color: rgba(255, 255, 255, 0.7);
      color: #000;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      margin-bottom: 8px;
      cursor: pointer;
      transition: background-color 0.3s ease-in-out;

      &:hover {
        background-color: rgba(255, 255, 255, 1);
      }
    }
   
  `;

  export const TableContainer = styled.div`
    width: 95%;
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5% 5%;
  `;
  export const CardContainer = styled.div`
    width: 95%;
    margin-top: 5px;
    @media screen and (min-width: 1400px) {
      width: 50%;
      padding: 2px;
      margin-horizontal: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    @media screen and (min-width: 2000px) {
      width: 33%;
      padding: 2px;
      margin-horizontal: 5px;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  `;