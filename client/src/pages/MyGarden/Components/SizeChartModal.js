import {
  Button,
  Grid,
  Header,
  Modal
} from "semantic-ui-react";

const SizeChartModal = ({open,onOpen,onClose}) => {
    return (
      <Modal
        basic
        onClose={onClose}
        onOpen={onOpen}
        open={open}
        size='small'
        trigger={<Button>Size Chart</Button>}
      >
        <Header>
          Size Chart
        </Header>
        <Modal.Content>
        <Grid columns='equal'>
      <Grid.Column>
        <h2>small</h2>
        <p>These plants are suitable for use on a desk or on a shelf. Depending on the variety of plant you acquire, they are normally 5 to 15 inches tall.</p>
      </Grid.Column>
      <Grid.Column>
        <h2>medium</h2>
        <p>Medium plants are larger than those seen on a desk or shelf. They are usually 1-2 feet tall and have a larger presence.</p>
      </Grid.Column>
      <Grid.Column>
        <h2>large</h2>
        <p>Although some may fit on a desktop or perhaps a shelf, these are perfect floor plants. Depending on the variety of plant you've chosen, they can grow to be anywhere from 3 to 7 feet tall.</p>
      </Grid.Column>
    </Grid>
        </Modal.Content>
        <Modal.Actions>
          <Button color='green' inverted onClick={onClose}>
            Cool
          </Button>
        </Modal.Actions>
      </Modal>
    )
  }

  export default SizeChartModal