import React, { FormEvent, useState } from 'react';

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';
import { addCardRequest } from '../../redux/cards/actions';
import { connect } from 'react-redux';
interface IProps {
  addCardRequest: (title: string) => void;
}
const AddCard: React.FC<IProps> = ({ addCardRequest }) => {
  const [addCard, setAddCard] = useState(false);
  const [cardTitle, setCardTitle] = useState('');
  function validateForm() {
    return cardTitle.length;
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    addCardRequest(cardTitle);
    setAddCard(false);
  }
  return (
    <Card style={{ width: '18rem' }}>
      <Card.Body>
        {!addCard && <Button onClick={_e => setAddCard(true)}>Add Card</Button>}
        {addCard && (
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Card Title</Form.Label>
              <Form.Control
                autoFocus
                type="title"
                value={cardTitle}
                onChange={e => setCardTitle(e.target.value)}
              />
            </Form.Group>

            <Button block size="lg" type="submit" disabled={!validateForm()}>
              Add
            </Button>
            <Button
              block
              size="lg"
              variant="warning"
              onClick={_e => setAddCard(false)}
            >
              Cancel
            </Button>
          </Form>
        )}
      </Card.Body>
    </Card>
  );
};
const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    addCardRequest: (title: string) => dispatch(addCardRequest(title)),
  };
};
export default connect(null, mapDispatchToProps)(AddCard);
