import { utils } from 'ethers';

interface GetFundingPotId {
  (
    arg0: {
      values: {
        fundingPotId?: string | null
      }
    }
  ): string | null
}

const getFundingPotId: GetFundingPotId = ({ values: { fundingPotId } }) => {

  if (fundingPotId) {
    return new utils.BigNumber(
      fundingPotId
    ).toString();
  }

  return null;

}

export default getFundingPotId;