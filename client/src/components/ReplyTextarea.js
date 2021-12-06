import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_COMMENT } from "../utils/mutations";
import { Button, Header, Icon, Modal,Form } from 'semantic-ui-react'
const ReplyTextarea = () => {

  const [open, setOpen] = React.useState(false)
  return (
    <Modal
    basic
    onClose={() => setOpen(false)}
    onOpen={() => setOpen(true)}
    open={open}
    size='small'
    trigger={<a>Reply</a>}
  >
    <Header icon>
      <Icon name='reply' />
      Add Reply Here
    </Header>
    <Modal.Content>
    <Form reply>
      <Form.TextArea />
    </Form>
    </Modal.Content>
    <Modal.Actions>
      <Button basic color='red' inverted onClick={() => setOpen(false)}>
        <Icon name='remove' /> Close
      </Button>
      <Button color='green' inverted onClick={() => setOpen(false)}>
        <Icon name='checkmark' /> Reply
      </Button>
    </Modal.Actions>
  </Modal>
  );
};

export default ReplyTextarea;
