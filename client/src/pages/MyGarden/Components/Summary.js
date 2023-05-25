import { SummaryContainer, RecordSummary, RecommendationText, ImageContainer } from "../StyledElements/AddPlantElement"
const SummaryComponent = ({plantRecommendations}) => {
    return (
        <SummaryContainer>
        <ImageContainer>
          <img
            src={plantRecommendations.image || plantRecommendations.wiki_image}
            alt={plantRecommendations.description}
          />
        </ImageContainer>
        <RecordSummary>
          <RecommendationText>
            <strong>Plant Type: </strong>
            {plantRecommendations.plant_name}
          </RecommendationText>
          <RecommendationText>
            <strong>Plant Match Probability: </strong>
            {plantRecommendations.probability}%
          </RecommendationText>
          <RecommendationText>
            <strong>Plant Description: </strong>
            {plantRecommendations.description}
          </RecommendationText>
          <a
            href={plantRecommendations.link}
            target="_blank"
            rel="noreferrer"
          >
            <RecommendationText style={{ color: "blue" }}>
              Visit the Wiki for caretips!
            </RecommendationText>
          </a>
          <br></br>
          <RecommendationText>
          <strong>Watering Guidelines: </strong>
          {!plantRecommendations?.minWater ? (
            
              "Please visit the Wiki for guidance on water care"
          ) : plantRecommendations.minWater === 1 ? (
             " Your plant doesn't require too much water"
          ) : plantRecommendations.minWater === 2 ? (
             " Your water required a moderate to high amount of water"
          ) : (
              "Your plant needs a lot water and care, pick carefully!"
          )}
          </RecommendationText>
        </RecordSummary>
  </SummaryContainer>
    )
}

export default SummaryComponent