import Avatar from '../avatar';
import styles from './EventCard.module.css';
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
    year: 'numeric',
  });

  return (
    <li className={styles.EventCard} data-event={eventType}>
      <Avatar identity={userAddress} />
      <p>
        <h2 className={styles.EventCardTitle}>{message}</h2>
        <time>{date}</time>
      </p>
    </li>
  );

};

export default EventCard;
