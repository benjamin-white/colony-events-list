import { ColonyRole } from '@colony/colony-js';
import { utils } from 'ethers';
import { BigNumberish } from 'ethers/utils';
// import type { Log } from '@ethersproject/abstract-provider';
import { Log } from 'ethers/providers';
import type { EventType } from './get-events-list'

export type EventData = {
  event: Log;
  parsed: {
    values: {
      domainId: BigNumberish;
      role: number;
      amount: BigNumberish;
      fundingPotId: BigNumberish;
      user: string;
      token?: string;
    };
  };
};

interface MessageProps {
  eventData: EventData;
  eventType: EventType;
  connection: {
    client: any;
  };
  userAddress: string | null;
  fundingPotId: string | null;
}

type Tokens =
  '0x6B175474E89094C44Da98b954EedeAC495271d0F' | '0x0dd7b8f3d1fa88FAbAa8a04A0c7B52FC35D4312c'

const TOKEN_TO_SYMBOL = {
  '0x6B175474E89094C44Da98b954EedeAC495271d0F': 'DAI',
  '0x0dd7b8f3d1fa88FAbAa8a04A0c7B52FC35D4312c': 'BLNY',
};

const eventMessage = async ({ eventData, eventType, connection: { client }, userAddress, fundingPotId }: MessageProps) => {

  const domainId: string = eventData.parsed.values?.domainId ?
    new utils.BigNumber(eventData.parsed.values?.domainId).toString() :
    '';
  const role: string = ColonyRole[eventData.parsed.values?.role] || '';

  if (eventType === 'ColonyInitialised') {
    return <>Congratulations! It&apos;s a beautiful baby colony!</>;
  }

  if (eventType === 'DomainAdded') {
    return <>Domain <strong>{domainId}</strong> added</>;
  }

  if (eventType === 'ColonyRoleSet') {
    return (
      <>
        <strong>{role}</strong> role assigned to user{' '}
        <strong>{userAddress}</strong> in domain{' '}
        <strong>{domainId}</strong>
      </>
    );
  }

  if (eventType === 'PayoutClaimed') {

    let amount = new utils.BigNumber(eventData.parsed.values.amount);
    const wei = new utils.BigNumber(10);
    amount = amount.div(wei.pow(18));

    return (
      <>
        User <strong>{userAddress}</strong> claimed{' '}
        <strong>
          {amount.toString()}
          {TOKEN_TO_SYMBOL[eventData.parsed.values.token as Tokens] || ''}
        </strong>{' '}
        payout from pot <strong>{fundingPotId}</strong>
      </>
    );

  }

  return <>No matching event</>;

};

export default eventMessage;