import { DashboardContainer,PlantFeedContainer,ScrollableContent,CardContainer,TableContainer } from "../StyledElements/DashboardElements";
import PlantCard from "./Card";
import PlantTable from "./Table";
const Dashboard = ({ plantData,setDeletionId }) => {
  return (
    <DashboardContainer>
      <PlantFeedContainer id="plant-feed">
        <ScrollableContent>
          {plantData?.map((plant) => (
            <CardContainer key={plant._id}>
              <PlantCard plant={plant} setDeletionId={setDeletionId}/>
            </CardContainer>
          ))}
        </ScrollableContent>
      </PlantFeedContainer>
      <TableContainer id="plant-table">
        <PlantTable plantData={plantData}/>
      </TableContainer>
    </DashboardContainer>
  );
};

export default Dashboard;
