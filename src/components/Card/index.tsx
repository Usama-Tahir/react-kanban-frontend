import React from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useTime } from 'react-timer-hook';
import './style.css';
import { Card as ICard, IPartialCard } from '../../redux/cards/types';
import { ThunkDispatch } from 'redux-thunk';
import { updateCardRequest } from '../../redux/cards/actions';
import { AnyAction } from 'redux';
import { connect } from 'react-redux';
interface IProps {
  card: ICard;
  id: string;
  updateCardRequest: (_id: string, payload: IPartialCard) => void;
}
const CardComponent: React.FC<IProps> = ({ card, id, updateCardRequest }) => {
  const updateCardState = (card: ICard, state: string) => {
    if (state === 'inprogress') {
      const payload = {
        _id: card._id,
        state,
        startTime: new Date().getTime(),
      };
      updateCardRequest(_id, payload);
    } else if (state === 'done') {
      const { startTime } = card;
      if (!startTime) {
        return null;
      }
      const endTime = new Date().getTime();
      // hard coded for now
      const hourlyRate = 10;
      const timeleft = endTime - startTime;
      const seconds = Math.ceil(timeleft / 1000);
      const minutes = Math.ceil(seconds / 60);
      const hours = minutes / 60;
      const calculatedCost = `${hours * hourlyRate}$`;
      const timeSpent = `${hours}h`;
      const payload = {
        _id: card._id,
        state,
        startTime,
        endTime,
        calculatedCost,
        timeSpent,
      };
      updateCardRequest(_id, payload);
    }
  };
  const { seconds, minutes, hours, ampm } = useTime({ format: '12-hour' });
  const { title, _id } = card;
  return (
    <div>
      <Card style={{ width: '18rem' }}>
        <Card.Body>
          <Card.Title>{title}</Card.Title>
          {id === 'todo' && (
            <Button
              variant="primary"
              onClick={() => updateCardState(card, 'inprogress')}
            >
              Start
            </Button>
          )}
          {id === 'inprogress' && (
            <div style={{ fontSize: '20px' }}>
              <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
              <span>{ampm}</span>
            </div>
          )}
          {id === 'inprogress' && (
            <Button
              variant="primary"
              onClick={() => updateCardState(card, 'done')}
            >
              Resolve
            </Button>
          )}
          {id === 'done' && <Card.Text>$15</Card.Text>}
        </Card.Body>
      </Card>
    </div>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    updateCardRequest: (_id: string, payload: IPartialCard) =>
      dispatch(updateCardRequest(_id, payload)),
  };
};
export default connect(null, mapDispatchToProps)(CardComponent);
