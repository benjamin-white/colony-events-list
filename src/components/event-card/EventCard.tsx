import { useCallback, useMemo, useState } from 'react';
import Avatar from '../avatar';
import styles from './EventCard.module.css';
import AnimateHeight from 'react-animate-height';
import type { EventType } from '../../utils/get-events-list';

export interface Props {
  timestamp: number;
  message: React.ReactElement;
  userAddress: string;
  eventType: EventType;
}

const EventCard = ({ userAddress, message, timestamp, eventType }: Props) => {

  const collapsedTitleHeight = 20;
  const [height, setHeight] = useState<'auto' | number>(collapsedTitleHeight);

  const CachedAvatar = useMemo(() =>
    <Avatar identity={userAddress} />,
    [userAddress]
  );
  const cachedDate = useMemo(() => (
    new Date(timestamp).toLocaleDateString('en-UK', {
      day: 'numeric',
      month: 'short',
    })
  ), [timestamp]);

  const onEnter = useCallback(() => setHeight('auto'), []);
  const onLeave = useCallback(() => setHeight(collapsedTitleHeight), []);

  return (
    <li
      className={styles.EventCard}
      data-event={eventType}
      onMouseEnter={onEnter}
      onMouseLeave={onLeave}
    >
      {CachedAvatar}
      <div className={styles.EventCardBody}>
        <AnimateHeight
          duration={200}
          height={height}
        >
          <h2 className={styles.EventCardTitle}>{message}</h2>
        </AnimateHeight>
        <time>{cachedDate}</time>
      </div>
    </li>
  );

};

export default EventCard;
