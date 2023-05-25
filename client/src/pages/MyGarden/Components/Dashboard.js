import { DashboardContainer,PlantFeedContainer,ScrollableContent,CardContainer,TableContainer } from "../StyledElements/DashboardElements";
import PlantCard from "./Card";
import PlantTable from "./Table";
const Dashboard = ({ plantData,user,triggerRefetch }) => {
  return (
    <DashboardContainer>
      <PlantFeedContainer id="plant-feed">
        <ScrollableContent>
          {plantData?.map((plant) => (
            <CardContainer key={plant._id}>
              <PlantCard user={user} plant={plant} triggerRefetch={triggerRefetch}/>
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
