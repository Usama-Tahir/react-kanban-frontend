import React, { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
  const [seconds, setSeconds] = useState<number | undefined>();
  const [minutes, setMinutes] = useState<number | undefined>();
  const [hours, setHours] = useState<number | undefined>();
  const calculateUpdatedTime = () => {
    if (card.state === 'inprogress' && card.startTime) {
      const timeDiff = new Date().getTime() - card.startTime;
      const totalSeconds = timeDiff / 1000;
      const totalHours = Math.round(totalSeconds / 3600);
      const minutes = Math.round((totalSeconds % 3600) / 60);
      const seconds = Math.round((totalSeconds % 3600) % 60);
      setSeconds(seconds);
      setMinutes(minutes);
      setHours(totalHours);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      calculateUpdatedTime();
    }, 1000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
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
  console.log({ card });
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
          {id === 'inprogress' && seconds && (
            <div style={{ fontSize: '20px' }}>
              <span>{hours}</span>:<span>{minutes}</span>:<span>{seconds}</span>
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
          {id === 'done' && <Card.Text>{card.calculatedCost}</Card.Text>}
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
