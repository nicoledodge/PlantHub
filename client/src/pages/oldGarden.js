import React, { useEffect, useState } from "react";
import {
  Progress,
  Button,
  Icon,
  Table,
  Segment,
  Grid,
  List,
  Modal,
} from "semantic-ui-react";
import { Box, Typography } from "@mui/material/";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { ADD_WATER, REMOVE_PLANT } from "../utils/mutations";
import AddPlantForm from "../components/AddPlant";
import Auth from "../utils/auth";
import PlantTable from "./MyGarden/Components/Table";
import PlantCard from "./MyGarden/Components/Card";
import { lightBlue } from "@mui/material/colors";

// export default 
function MyGarden() {
  const { loading, data, refetch } = useQuery(QUERY_ME);

  const [addWater, { error }] = useMutation(ADD_WATER);

  const [removePlant, { err }] = useMutation(REMOVE_PLANT);

  const [plantToggle, setPlantToggle] = useState(false);

  const handlePlantModal = () => {
    setPlantToggle(false);
    refetch();
  };

  const plantData = data?.me.myPlants || [];

  const userData = data?.me || [];

  const [percent, setPercent] = useState(0);
  const [plantCount, setPlantCount] = useState(0);
  const [username, setUsername] = useState("");
  const [plantForm, setPlantForm] = useState("");

  const handleAddWater = async (plantId) => {
    console.log("PlantID:" + plantId);
    try {
      const { plantData } = await addWater({
        variables: { plantId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePlant = async (plantId) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }

    try {
      const { plantData } = await removePlant({
        variables: { plantId },
      });
    } catch (err) {
      console.error(err);
    }
  };


  useEffect(() => {
    // Cleanup the event listener on component unmount
    if (data) {
      let newPercent = plantData.map((plant, i) => {
        let x = plant.waterAdded;
        let y = plant.waterNeeded;
        return ((x / y) * 100).toFixed();
      });
      setPercent(newPercent);
      setPlantCount(plantData.length);
      setUsername(userData.username);
    }
  }, [data, plantData, userData]);

  const dashboardStyle = {
    width: "100%",
    backgroundColor: "lightBlue",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingTop: "5px",
    "@media screen and (min-width: 800px)": {
      padding: "10% 15%",
    },
  };

  const plantFeedContainer = {
    width: "95%",
    paddingTop: "5px",
    backgroundColor: "purple",
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
    "@media screen and (min-width: 800px)": {
      backgroundColor: "black",
    },
    "@media screen and (min-width: 1100px)": {
      backgroundColor: "green",
      justifyContent: "space-around",
    },
  };

  const tableContainer = {
    width: "95%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "navy",
    "@media screen and (min-width: 800px)": {
      padding: "5% 5%",
      backgroundColor: "blue",
    },
  };

  const cardContainer = {
    width: '95%',
    backgroundColor: 'red',
    marginTop: '5px',
    "@media screen and (min-width: 800px)": {
        padding: "5%",
        backgroundColor: "black",
        marginHorizontal: "5px",
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: "45%"
      }
}

  return (
    <div className="garden-container">
      <br></br>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          p: 2,
          m: 1,
        }}
      >
        <Typography
          gutterBottom
          variant="h4"
          component="div"
          style={{
            textAlign: "center",
            fontFamily: "Oswald, sans-serif",
            color: "#EBDBAE",
          }}
        >
          Hello {username}, welcome to your garden
        </Typography>
      </Box>
      <div style={dashboardStyle}>
        <div style={plantFeedContainer} id="plant-feed">
          {/* Elements for the first column */}
          {/* Placeholder for the card with a small image */}
          {plantData?.map((plant) => (
            <>
              {/* key={plant._id} */}
              <div key={plant._id} style={cardContainer}>
              <PlantCard plant={plant} />
              </div>
            </>
          ))}
        </div>
        <div style={tableContainer} id="plant-table">
          <PlantTable plantData={plantData} handleAddWater={handleAddWater} />
        </div>
      </div>
      {/* <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          p: 2,
          m: 1,
        }}
      >
        <Box textAlign="center" width={16}>
          <Typography
            gutterBottom
            variant="h4"
            component="div"
            style={{
              textAlign: "center",
              fontFamily: "Oswald, sans-serif",
              color: "#EBDBAE",
            }}
          >
            Manage your Garden
          </Typography>
        </Box>
      </Box>
      <div justifyContent="center" style={{ margin: 0 }}>
        <div style={{ textAlign: "center" }}>
          <Button
            className="addplantbtn"
            icon
            labelPosition="left"
            primary
            size="small"
            style={{ backgroundColor: "#EBDBAE" }}
            onClick={(e) => {
              setPlantToggle(true);
            }}
          >
            <Icon color="#4f5902" name="remove circle" />
            <Typography variant="body1" color="#4f5902">
              Add Plant To Garden
            </Typography>
          </Button>
        </div>
      </div>
      <Modal
        open={plantToggle}
        onClose={handlePlantModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <AddPlantForm handlePlantModal={handlePlantModal} />
      </Modal> */}
    </div>
  );
}
