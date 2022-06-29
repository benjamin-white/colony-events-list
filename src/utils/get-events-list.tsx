import eventsByType from './events-by-type';
import connect from './connection';
import type { EventsListType } from '../components/events-list';

export type EventType =
  | 'ColonyInitialised'
  | 'DomainAdded'
  | 'ColonyRoleSet'
  | 'PayoutClaimed';

const getEventsList = async (): Promise<EventsListType> => {

  const connection = await connect();

  const eventTypes: EventType[] = [
    'ColonyInitialised',
    'DomainAdded',
    'ColonyRoleSet',
    'PayoutClaimed',
  ];

  const getEvents = eventsByType.bind(null, connection);

  const events = await Promise.all(eventTypes.map(getEvents));

  return events.flat().sort((a, b) => b.timestamp - a.timestamp);

};

export default getEventsList;
