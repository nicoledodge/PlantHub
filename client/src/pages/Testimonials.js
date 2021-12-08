import React, { Component } from "react";
import { Form, Button, Modal, Grid, Header } from "semantic-ui-react";

const options = [
  { key: "i", text: "Indoor", value: "indoor" },
  { key: "o", text: "Outdoor", value: "outdoor" },
];
function SizeChartModal() {
  const [open, setOpen] = React.useState(false);

  return (
    <Modal
      basic
      onClose={() => setOpen(false)}
      onOpen={() => setOpen(true)}
      open={open}
      size="small"
      trigger={<Button>Size Chart</Button>}
    >
      <Header>Size Chart</Header>
      <Modal.Content>
        <Grid columns="equal">
          <Grid.Column>
            <h2>small</h2>
            <p>
              These plants are suitable for use on a desk or on a shelf.
              Depending on the variety of plant you acquire, they are normally 5
              to 15 inches tall.
            </p>
          </Grid.Column>
          <Grid.Column>
            <h2>medium</h2>
            <p>
              Medium plants are larger than those seen on a desk or shelf. They
              are usually 1-2 feet tall and have a larger presence.
            </p>
          </Grid.Column>
          <Grid.Column>
            <h2>large</h2>
            <p>
              Although some may fit on a desktop or perhaps a shelf, these are
              perfect  floor plants. Depending on the variety of plant you've
              chosen, they can grow to be anywhere from 3 to 7 feet tall.
            </p>
          </Grid.Column>
        </Grid>
      </Modal.Content>
      <Modal.Actions>
        <Button color="green" inverted onClick={() => setOpen(false)}>
          Cool
        </Button>
      </Modal.Actions>
    </Modal>
  );
}

class AddPlantForm extends Component {
  state = {};
  handleChange = (e, { value }) => this.setState({ value });
  render() {
    const { value } = this.state;
    return (
      <div id="PlantFormCont">
        <Form>
          <Form.Group widths="equal">
            <Form.Input fluid label="Plant Name" placeholder="Sunflower" />
            <Form.Input fluid label="Nickname" placeholder="Sunny" />
            <Form.Select
              fluid
              label="Plant Type"
              options={options}
              placeholder="Indoor or Outdoor"
            />
          </Form.Group>
          <Form.Group inline>
            <label>Size</label>
            <Form.Radio
              label="Small"
              value="s"
              checked={value === "s"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Medium"
              value="m"
              checked={value === "m"}
              onChange={this.handleChange}
            />
            <Form.Radio
              label="Large"
              value="l"
              checked={value === "l"}
              onChange={this.handleChange}
            />
            <SizeChartModal />
          </Form.Group>
          <Form.Input
            fluid
            label="Days of Water Needed Per Month"
            placeholder="18"
          />
          <Form.Button>Submit</Form.Button>
        </Form>
      </div>
    );
  }
}

export default AddPlantForm;
