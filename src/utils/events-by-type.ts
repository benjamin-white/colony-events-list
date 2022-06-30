import { getLogs, getBlockTime } from '@colony/colony-js';
import getFundingPotId from './get-funding-pot-id';
import getUserAddress from './get-user-address';
import eventMessage from './event-message';
import type { Log } from '@ethersproject/abstract-provider';
import type { EventType } from './get-events-list';
import type { Connection } from './connection';
import type { EventItemProps } from '../components/event-card'

interface PopulateEventFields {
  (
    arg0: EventType,
    arg1: Connection,
    arg2: Log
  ): Promise<EventItemProps>
}

const populateEventFields: PopulateEventFields = async (eventType, connection, event) => {

  const colonyAddress = '0x5346D0f80e2816FaD329F2c140c870ffc3c3E2Ef';
  const timestamp = await getBlockTime(connection.provider, event.blockHash);
  const parsed = connection.client.interface.parseLog(event);
  const fundingPotId = getFundingPotId(parsed);

  const userAddress = await getUserAddress({
    parsedData: parsed,
    connection,
    fundingPotId
  });

  const message = await eventMessage({
    parsedData: parsed,
    eventType,
    userAddress,
    fundingPotId
  });

  return {
    userAddress: userAddress || colonyAddress,
    message,
    eventType,
    timestamp,
  };

};

interface EventsByType {
  (
    arg0: Connection,
    arg1: EventType
  ): Promise<EventItemProps[]>
}

const eventsByType: EventsByType = async (connection, eventType) => {

  const rawEvents = await getLogs(connection.client, connection.client.filters[eventType]());

  const eventsFields = await Promise.all(rawEvents.map((event) => {
    return populateEventFields(eventType, connection, event as Log);
  }));

  return eventsFields;

};

export default eventsByType;