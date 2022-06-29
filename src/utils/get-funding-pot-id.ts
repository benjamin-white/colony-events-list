import { utils } from 'ethers';

interface Args {
  values: {
    fundingPotId: string | null;
  }
}

const getFundingPotId = ({ values: { fundingPotId } }: Args) => {

  if (fundingPotId) {
    return new utils.BigNumber(
      fundingPotId
    ).toString();
  }

  return null;

}

export default getFundingPotId;