import { ColonyClient, getColonyNetworkClient, Network } from '@colony/colony-js';
import { Filter, InfuraProvider } from 'ethers/providers';
import { ethers, Wallet } from 'ethers';

export interface Connection {
  provider: ethers.providers.Provider;
  client: ColonyClient & {
    filters: {
      ColonyInitialised: () => Filter;
      DomainAdded: () => Filter;
      ColonyRoleSet: () => Filter;
      PayoutClaimed: () => Filter;
    }
  };
}

const connect = async (): Promise<Connection> => {

  const MAINNET_NETWORK_ADDRESS = '0x5346D0f80e2816FaD329F2c140c870ffc3c3E2Ef';
  const MAINNET_BETACOLONY_ADDRESS = '0x869814034d96544f3C62DE2aC22448ed79Ac8e70';
  const provider = new InfuraProvider();
  const wallet = Wallet.createRandom();
  const connectedWallet = wallet.connect(provider);

  const networkClient = getColonyNetworkClient(
    Network.Mainnet,
    connectedWallet,
    {networkAddress: MAINNET_NETWORK_ADDRESS}
  );

  const colonyClient = await networkClient.getColonyClient(MAINNET_BETACOLONY_ADDRESS);

  return {provider, client: colonyClient as Connection['client']};

};

export default connect;
