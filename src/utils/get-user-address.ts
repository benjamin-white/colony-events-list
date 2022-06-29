import type { Connection } from './connection';
import type { EventData } from './event-message';

interface Args {
  eventData: EventData;
  connection: Connection;
  fundingPotId: string | null;
}

const getUserAddress = async ({ eventData, connection: { client }, fundingPotId }: Args) => {

  let userAddress = eventData.parsed.values?.user;

  if (!userAddress && fundingPotId) {
    const { associatedTypeId } = await client.getFundingPot(fundingPotId);
    const { recipient } = await client.getPayment(associatedTypeId);
    return recipient;
  }

  return userAddress;

};

export default getUserAddress;