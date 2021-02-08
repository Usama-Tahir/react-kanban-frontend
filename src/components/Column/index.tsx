import React from 'react';
import { Card } from '../../redux/cards/types';
import AddCard from '../AddCard';
import CardComponent from '../Card';
interface IProps {
  title: string;
  id: string;
  cards: Card[];
}

const Column: React.FC<IProps> = ({ title, id, cards }) => {
  return (
    <div>
      <p>{title}</p>
      {cards.map(card => (
        <CardComponent card={card} id={id}></CardComponent>
      ))}
      {id === 'todo' && <AddCard />}
    </div>
  );
};

export default Column;
