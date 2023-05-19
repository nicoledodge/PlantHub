import { Table, Progress, Icon, Button, Segment } from "semantic-ui-react";
import { Typography } from "@mui/material";
const PlantTable = ({ plantData, handleAddWater }) => {
  const getPercent = (plant) => {
    const percent = (plant.waterAdded / plant.waterNeeded) * 100;
    return percent.toFixed();
  };
  console.log("i'm the table")
  console.log(plantData)
  //This text is a custom component that accepts text as children, variants for different styling, and color.
  const Text = ({ children, variant, color }) => {
    color = color || "#4f5902";
    return (
      <>
        <Typography
          gutterBottom
          variant={variant || "body2"}
          component="div"
          style={{
            textAlign: "center",
            fontFamily: "Fuzzy Bubbles, cursive",
            color,
          }}
        >
          {children}
        </Typography>
      </>
    );
  };

  return (
    <Table>
      <Table.Header>
        <Table.Row>
          <Table.HeaderCell>
            <Text variant={"h5"}>Plant</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text variant={"h5"}>Nickname</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text variant={"h5"}>Hydration Status</Text>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <Text variant={"h5"}>Water</Text>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Header>

      <Table.Body>
        {plantData.map((plant) => (
          <Table.Row key={plant._id}>
            <Table.Cell>
              <Text>{plant.name}</Text>
            </Table.Cell>
            <Table.Cell>
              <Text>{plant.nickname}</Text>
            </Table.Cell>
            <Table.Cell>
              <Progress percent={getPercent(plant)} color="blue" active>
                <Text>{getPercent(plant)}% watered this month</Text>
              </Progress>
            </Table.Cell>
            <Table.Cell>
              <div align="center">
                <Button
                  compact
                  id={plant.name}
                  icon
                  labelPosition="right"
                  primary
                  size="small"
                  onClick={async () => await handleAddWater(plant._id)}
                >
                  <Icon name="tint" />
                  <Text color={"white"}>Add Water</Text>
                </Button>
              </div>
            </Table.Cell>
          </Table.Row>
        ))}
        <Table.Row>
          <Table.Cell textAlign="right" colSpan={4}>
            <Typography
              variant="body1"
              color="#4f5902"
              style={{
                border: "1px solid rgba(34,36,38,.1)",
                borderRadius: "0.28571429rem",
                padding: "0.78571429em 1.5em",
              }}
            >
              You have {plantData.length} plants in your garden
            </Typography>
          </Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
  );
};

export default PlantTable;
