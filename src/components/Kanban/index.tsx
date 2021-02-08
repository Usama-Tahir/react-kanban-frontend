import React, { useEffect, useState } from 'react';
import { connect, useSelector } from 'react-redux';
import { AnyAction } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { ApplicationState } from '../../redux';
import { getCardsRequest } from '../../redux/cards/actions';
import { Card } from '../../redux/cards/types';
import Column from '../Column';
interface IProps {
  getCardsRequest: () => void;
}
const Kanban: React.FC<IProps> = ({ getCardsRequest }) => {
  useEffect(() => {
    getCardsRequest();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  const cards: Card[] = useSelector(
    (state: ApplicationState) => state.cards.cards,
  );
  const [todoCards, setTodoCards] = useState<Card[] | []>([]);
  const [inprogressCards, setInprogressCards] = useState<Card[] | []>([]);
  const [doneCards, setDoneCards] = useState<Card[] | []>([]);

  useEffect(() => {
    if (cards.length) {
      const todoCards: Card[] = cards.filter(card => card.state === 'todo');
      const inProgressCards: Card[] = cards.filter(
        card => card.state === 'inprogress',
      );
      const doneCards: Card[] = cards.filter(card => card.state === 'done');
      setTodoCards(todoCards);
      setInprogressCards(inProgressCards);
      setDoneCards(doneCards);
    }
  }, [cards]);
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: 20,
      }}
    >
      <div style={{ backgroundColor: 'ButtonFace', textAlign: 'center' }}>
        <Column title="TO Do" id="todo" cards={todoCards} />
      </div>
      <div style={{ backgroundColor: 'ButtonFace', textAlign: 'center' }}>
        <Column title="IN PROGRESS" id="inprogress" cards={inprogressCards} />
      </div>
      <div style={{ backgroundColor: 'ButtonFace', textAlign: 'center' }}>
        <Column title="DONE" id="done" cards={doneCards} />
      </div>
    </div>
  );
};

const mapDispatchToProps = (dispatch: ThunkDispatch<any, any, AnyAction>) => {
  return {
    getCardsRequest: () => dispatch(getCardsRequest()),
  };
};
export default connect(null, mapDispatchToProps)(Kanban);
