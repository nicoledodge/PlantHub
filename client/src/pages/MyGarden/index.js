import React, { useState,useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import Auth from "../../utils/auth";
import { Typography } from "@mui/material/";
import {
  GardenContainer,
  DashboardHeader,
} from "./StyledElements/GardenElements";
import Dashboard from "./Components/Dashboard";
import { Button, Modal } from "semantic-ui-react";
import AddPlantForm from "./Components/AddPlant";

const MyGarden = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);
  const [userData, setUserData] = useState(data?.me || [])
  const [plantData,setPlantData] = useState(data?.me.myPlants || [])
 
  useEffect(() => {
    //Manually update percentage to avoid a refresh when water is added
    setPlantData(data?.me?.myPlants.map(plant => {
      return{
      ...plant,
      percentage: ((plant.waterAdded/plant.waterNeeded)*100).toFixed()
    }})|| [])
    setUserData(data?.me || [])
  }, [data]);

  const [viewPlantModal, setViewPlantModal] = useState(false);
  const closeForm = () => setViewPlantModal(false);
  const openForm = () => setViewPlantModal(true);

  const closeAndUpdate = async () => {
    closeForm();
    await triggerRefetch();
  };

  const triggerRefetch = async () => {
    await refetch();
  }

  const HeaderText = ({ children }) => {
    return (
      <>
        <Typography
          gutterBottom
          variant="h4"
          style={{
            textAlign: "center",
            fontFamily: "Oswald, sans-serif",
            color: "#EBDBAE",
          }}
        >
          {children}
        </Typography>
      </>
    );
  };

  return (
    <GardenContainer>
       {!Auth.loggedIn() ? (
      <HeaderText>Please Login or SignUp To Create Your Garden!</HeaderText>
    ) : loading ? (
      <DashboardHeader>
        <HeaderText>Loading Your Garden!</HeaderText>
      </DashboardHeader>
    ) : (
      <>
        <DashboardHeader>
          <HeaderText>
            Hello {userData?.username}, welcome to your garden
          </HeaderText>
          <Button onClick={openForm}>Add to Garden</Button>
        </DashboardHeader>
        {!plantData.length ? (
          <HeaderText>
            It's a little empty in here, so add a plant!
          </HeaderText>
        ) : (
          <>
            <Dashboard plantData={plantData} user={userData?.username} triggerRefetch={triggerRefetch} />
          </>
        )}
      </>
    )}
      <Modal
        open={viewPlantModal}
        onClose={closeForm}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddPlantForm closeForm={closeForm} closeAndUpdate={closeAndUpdate} />
      </Modal>
    </GardenContainer>
  );
};

export default MyGarden;