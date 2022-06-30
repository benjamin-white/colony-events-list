import type { Connection } from './connection';
import type { EventData } from './get-events-list';

interface GetUserAddress {
  (
    arg0: {
      parsedData: EventData['parsed'];
      connection: Connection;
      fundingPotId: string | null
    }
  ): Promise<string>
}

const getUserAddress: GetUserAddress = async ({ parsedData, connection: { client }, fundingPotId }) => {

  let userAddress = parsedData.values.user || '';

  if (!userAddress && fundingPotId) {
    const { associatedTypeId } = await client.getFundingPot(fundingPotId);
    const { recipient } = await client.getPayment(associatedTypeId);
    return recipient;
  }

  return userAddress;

};

export default getUserAddress;