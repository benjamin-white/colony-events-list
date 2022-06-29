import { useState, useEffect } from 'react';
import EventCard from '../event-card';
import getEventsList from '../../utils/get-events-list';
import styles from './EventsList.module.css';
import type { EventItemProps } from '../event-card';

export type EventsListType = EventItemProps[];

const EventsList = () => {

  const [events, setEvents] = useState<EventsListType>([]);

  useEffect(() => {
    (async () => {
      const eventsList = await getEventsList();
      setEvents(eventsList);
    })();
  }, []);

  return (
    <ul className={styles.EventsList}>
      {events.map((event, index) =>
        <EventCard
          key={index}
          timestamp={event.timestamp}
          message={event.message}
          userAddress={event.userAddress}
          eventType={event.eventType}
        />
      )}
    </ul>
  );

}

export default EventsList;