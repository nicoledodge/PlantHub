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
  const [plantData,setPlantData] = useState(data?.me.myPlants || [])
  const [deletionId, setDeletionId] = useState(null)
  const userData=data?.me || []
  let currentDate = new Date();
  let currentYear = currentDate.getFullYear();
  let currentMonth = currentDate.getMonth();
  let currentDayOfMonth = currentDate.getDate();
  let numberOfDaysInMonth = new Date(
    currentYear,
    currentMonth + 1,
    0
  ).getDate();
  let ontargetGoal = (currentDayOfMonth / numberOfDaysInMonth) * 100;
  useEffect(() => {
   //Manually filter out the plant to prevent an unnecessary refetch
    if(deletionId){
      setPlantData((prevPlantData)=> prevPlantData.filter(plant => plant._id !== deletionId))
      setDeletionId(null)
      return
    }
    //Manually update percentage to avoid a refresh when water is added
    setPlantData(data?.me?.myPlants.map(plant => {
      return{
      ...plant,
      percentage: ((plant.waterAdded/plant.waterNeeded)*100).toFixed(),
      status: updateStatus((plant.waterAdded/plant.waterNeeded)*100)
    }})|| [])
  }, [data,deletionId]);
  const updateStatus = (value) => {
    if (value === 100) {
      return ("Your plant is all watered up for the month! :D");
    }
    //determine if on target
    if (value >= ontargetGoal) {
      return("Your plant is hydrated!");
    }
    return `I'm thirsty!`
  }

  const [viewPlantModal, setViewPlantModal] = useState(false);
  const closeForm = () => setViewPlantModal(false);
  const openForm = () => setViewPlantModal(true);

  const closeAndUpdate = async () => {
    closeForm();
    await refetch();
  };

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
            <Dashboard plantData={plantData} setDeletionId={setDeletionId} />
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