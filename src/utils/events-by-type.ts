import { getLogs, getBlockTime } from '@colony/colony-js';
import getFundingPotId from './get-funding-pot-id';
import getUserAddress from './get-user-address';
import eventMessage from './event-message';
import type { Log } from '@ethersproject/abstract-provider';
import type { EventType } from './get-events-list';
import type { Connection } from './connection';
import type { EventItemProps } from '../components/event-card'

const COLONY_ADDRESS = '0x5346D0f80e2816FaD329F2c140c870ffc3c3E2Ef';

const populateEventFields = async (
  eventType: EventType,
  connection: Connection,
  event: Log
): Promise<EventItemProps> => {

  const timestamp = await getBlockTime(connection.provider, event.blockHash);
  const parsed = connection.client.interface.parseLog(event);
  const fundingPotId = getFundingPotId(parsed);
  const userAddress = await getUserAddress({
    eventData: { event, parsed },
    connection,
    fundingPotId
  });
  const message = await eventMessage({
    eventData: { event, parsed },
    eventType,
    connection,
    userAddress,
    fundingPotId
  });

  return {
    userAddress: userAddress || COLONY_ADDRESS,
    message,
    eventType,
    timestamp,
  };

};

const eventsByType = async (connection: Connection, eventType: EventType) => {

  const rawEvents = await getLogs(connection.client, connection.client.filters[eventType]());

  const eventsFields = await Promise.all(rawEvents.map((event) => {
    return populateEventFields(eventType, connection, event as Log);
  }));

  return eventsFields;

};

export default eventsByType;