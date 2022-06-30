import { ColonyRole } from '@colony/colony-js';
import { utils } from 'ethers';
import { EventData } from './get-events-list';
import type { EventType } from './get-events-list'

interface EventMessage {
  (
    arg0: {
      parsedData: EventData['parsed'],
      eventType: EventType,
      userAddress: string | null,
      fundingPotId: string | null
    }
  ): Promise<React.ReactElement>
}

const eventMessage: EventMessage = async ({
  parsedData,
  eventType,
  userAddress,
  fundingPotId
}) => {
  
  const tokenToSymbol = {
    '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'DAI',
    '0x0dd7b8f3d1fa88FAbAa8a04A0c7B52FC35D4312c': 'BLNY',
  };

  const domainId =
    parsedData.values.domainId ?
      new utils.BigNumber(parsedData.values.domainId).toString() :
      '';

  const events = {
    ColonyInitialised: () => {
      return (
        <>Congratulations! It&apos;s a beautiful baby colony!</>
      );
    },
    DomainAdded: () => {
      return (
        <>Domain <strong>{domainId}</strong> added</>
      );
    },
    ColonyRoleSet: () => {
      const role = ColonyRole[parsedData.values.role] || '';
      return (
        <>
          <strong>{role}</strong> role assigned to user{' '}
          <strong>{userAddress}</strong> in domain{' '}
          <strong>{domainId}</strong>
        </>
      );
    },
    PayoutClaimed: () => {
      let amount = new utils.BigNumber(parsedData.values.amount);
      const wei = new utils.BigNumber(10);
      amount = amount.div(wei.pow(18));
      return (
        <>
          User <strong>{userAddress}</strong> claimed{' '}
          <strong>
            {amount.toString()}
            {tokenToSymbol[parsedData.values.token as keyof typeof tokenToSymbol] || ''}
          </strong>{' '}
          payout from pot <strong>{fundingPotId}</strong>
        </>
      );
    }
  }

  return events[eventType] ? events[eventType]() : <>No matching event</>;

};

export default eventMessage;