import type { EventsListType } from '../components/events-list';

const generateStubData = (size: number = 4): EventsListType => {

  return [...Array(size)].map((_, index) => {
    return {
      timestamp: 0,
      message: <>Entry <strong>#{index}</strong></>,
      userAddress: ((new Date()).getTime() * Math.random()).toString(),
      eventType: 'ColonyInitialised',
    }
  });

}

export default generateStubData;