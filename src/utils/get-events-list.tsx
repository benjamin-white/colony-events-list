import eventsByType from './events-by-type';
import connect from './connection';
import { BigNumberish } from 'ethers/utils';
import type { Log } from '@ethersproject/abstract-provider';
import type { EventsListType } from '../components/events-list';

export type EventType =
  | 'ColonyInitialised'
  | 'DomainAdded'
  | 'ColonyRoleSet'
  | 'PayoutClaimed';

export type EventData = {
  event: Log;
  parsed: {
    values: {
      domainId: BigNumberish;
      role: number;
      amount: BigNumberish;
      fundingPotId: BigNumberish;
      user: string;
      token: string;
    };
  };
};

interface GetEventsList {
  (): Promise<EventsListType>
}

const getEventsList: GetEventsList = async () => {

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
