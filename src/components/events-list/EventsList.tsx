import { useState, useEffect } from 'react';
import EventCard from '../event-card';
import Loader from '../loader';
import getEventsList from '../../utils/get-events-list';
import styles from './EventsList.module.css';
import type { EventItemProps } from '../event-card';

export type EventsListType = EventItemProps[];

const EventsList = () => {

  const [events, setEvents] = useState<EventsListType>([]);
  const [hasError, setHasError] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const messageForError =
    <><h1>Sorry, something has gone wrong.</h1>Please try again in a while.</>;
  const messageForNone =
    <h1>No matching events were found.</h1>

  useEffect(() => {
    (async () => {
      try {
        const eventsList = await getEventsList();
        setEvents(eventsList);
      } catch (error) {
        console.warn(error);
        setHasError(true);
      }
      setIsLoaded(true);
    })();
  }, []);

  if (hasError) {
    return <Loader message={messageForError} />;
  }

  if (!events.length && isLoaded) {
    return <Loader message={messageForNone} />;
  }

  if (!events.length) {
    return <Loader />;
  }

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