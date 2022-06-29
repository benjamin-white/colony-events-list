import { useState } from 'react';
import Avatar from '../avatar';
import styles from './EventCard.module.css';
import AnimateHeight from "react-animate-height";
import type { EventType } from '../../utils/get-events-list';

export interface Props {
  timestamp: number;
  message: React.ReactElement<React.ReactFragment>;
  userAddress: string;
  eventType: EventType;
}

const EventCard = ({ userAddress, message, timestamp, eventType }: Props) => {

  const date = new Date(timestamp).toLocaleDateString('en-UK', {
    day: 'numeric',
    month: 'short',
  }); // memo?

  const [height, setHeight] = useState<'auto'|number>(20);

  return (
    <li
      className={styles.EventCard}
      data-event={eventType}
      onMouseEnter={() => setHeight('auto')}
      onMouseLeave={() => setHeight(20)}
    >
      <Avatar identity={userAddress} />
      <div className={styles.EventCardBody}>
        <AnimateHeight
          duration={200}
          height={height}
        >
          <h2 className={styles.EventCardTitle}>{message}</h2>
        </AnimateHeight>
        <time>{date}</time>
      </div>
    </li>
  );

};

export default EventCard;
