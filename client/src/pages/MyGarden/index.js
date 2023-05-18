import React, { useEffect, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_ME } from "../../utils/queries";
import { ADD_WATER, REMOVE_PLANT } from "../../utils/mutations";
import Auth from "../../utils/auth";
const MyGarden = () => {
  const { loading, data, refetch } = useQuery(QUERY_ME);

  const [addWater, { error }] = useMutation(ADD_WATER);

  const [removePlant, { err }] = useMutation(REMOVE_PLANT);

  const plantData = data?.me.myPlants || [];

  const userData = data?.me || [];

  const handleAddWater = async (plantId) => {
    try {
        await addWater({
        variables: { plantId },
      });
    } catch (err) {
      console.error(err);
    }
  };

  const handleDeletePlant = async (plantId) => {
    try {
        await removePlant({
        variables: { plantId },
      });
    } catch (err) {
      console.error(err);
    }
  };

    


};
