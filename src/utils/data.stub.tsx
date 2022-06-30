import type { EventsListType } from '../components/events-list';

interface GenerateStubData {
  (n?: number): EventsListType
}

const generateStubData: GenerateStubData = (size = 4) =>
  [...Array(size)].map((_, index) => {
    return {
      timestamp: 0,
      message: <>Entry <strong>#{index}</strong></>,
      userAddress: ((new Date()).getTime() * Math.random()).toString(),
      eventType: 'ColonyInitialised',
    }
  });

export default generateStubData;