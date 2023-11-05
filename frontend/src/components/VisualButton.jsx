import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@chakra-ui/react";

function Visual() {
  let navigate = useNavigate();

  function handleClick() {
    navigate("/visualization");
  }

  return (
    <Button onClick={handleClick} colorScheme="blue">
      Go to Visualizations
    </Button>
  );
}

export default Visual;
