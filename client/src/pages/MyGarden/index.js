import React, {useState } from "react";
import { useQuery} from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import {Typography } from "@mui/material/";
import { GardenContainer,DashboardHeader } from "./StyledElements/GardenElements";
import Dashboard from "./Components/Dashboard";
import { Button,Modal } from "semantic-ui-react";
import AddPlantForm from "./Components/AddPlant";
const MyGarden = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const plantData = data?.me.myPlants || [];
  const userData = data?.me || [];
  const [viewPlantModal, setViewPlantModal] = useState(false);
  const closeForm = () => setViewPlantModal(false);
  const openForm = () => setViewPlantModal(true);
  const closeAndUpdate = async () => {
    closeForm()
    await refetch()
  }

  return (
    <GardenContainer>
      {loading? <DashboardHeader>
        <Typography
          gutterBottom
          variant="h4"
          style={{
            textAlign: "center",
            fontFamily: "Oswald, sans-serif",
            color: "#EBDBAE",
          }}
        >
          Loading Your Garden!
        </Typography>
      </DashboardHeader>

      : !plantData.length 
      ?<>
              <Button onClick={openForm}>Add to Garden</Button>

      </>
      :<><DashboardHeader>
        <Typography
          gutterBottom
          variant="h4"
          style={{
            textAlign: "center",
            fontFamily: "Oswald, sans-serif",
            color: "#EBDBAE",
          }}
        >
          Hello {userData?.username}, welcome to your garden
        </Typography>
        <Button onClick={openForm}>Add to Garden</Button>
      </DashboardHeader>
      <Dashboard plantData={plantData} user={userData?.username} />
      <Modal
        open={viewPlantModal}
        onClose={closeForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddPlantForm closeForm={closeForm} closeAndUpdate={closeAndUpdate}/>
      </Modal>
      </>}
    </GardenContainer>
  );
};

export default MyGarden;
