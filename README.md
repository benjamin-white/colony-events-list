# **Colony Events List**

This project uses [colonyjs](https://github.com/JoinColony/colonyJS) to retrieve and filter logs from Colony Network smart contracts deployed on the Ethereum mainnet. The filtered logs are used to display a list of events in reverse chronological order with relevant information for each event. Of all available events only the below are currently being used in the list:

+ ColonyInitialised
+ ColonyRoleSet
+ PayoutClaimed
+ DomainAdded

### _**View on [Github Pages](https://benjamin-white.github.io/colony-events-list)**_
<hr>


## _**To Run**_

Clone this project to your local machine.

```shell
$ git clone git@github.com:benjamin-white/colony-events-list.git && cd colony-events-list
```

Install the project dependencies.
```shell
$ yarn
```
Start the development server and watch task.

```shell
$ yarn start
```

Now the project should be available on [localhost:3000](http://localhost:3000).

## _**Program Structure**_

This project is bootstrapped with Create React App and uses **React**, **Typescript** and **CSSModules**. Components are primarily concerned with rendering and state management while data retrieval and processing is handled by functions inside the `/utils` folder. The retrieving and processing of logs principally relies on the [colonyjs](https://github.com/JoinColony/colonyJS) and [ethers](https://github.com/ethers-io/ethers.js/) libraries for all heavy lifting.

The strucure of logs and content of entries was unfamiliar to me and this presented some conceptual challenges in how best to create the list passed into the `EventsList` component. In essence some of the values encountered in Blockchain data were so alien looking it was challenging to pull on a previous mental schematic. I tried to break it down into smaller steps that could mostly be addressed by single functions, but if I were to start again I would probably change the order of this processing and purpose of some functions. The reason would be to have a date ordered flat list initially but defer the transforming of a log entry to `EventCard` consumable data. This would allow the `EventsList` to more easily paginate results and thereby improve first load performance.

The function `generateStubData` in `/utils/_data.stub.tsx` is used to test styling and UI interaction in isoloation from data processing logic and without the need to hit an external API. It does not contribute to the running page.

## _**Future Features &amp; Improvements**_

+ Add unit tests for the code in `/utils` and `/components`.
+ Add lazy loading of items in `EventsList`. As suggested above some restructuring might be needed to gain a performance benefit.
+ Animation of line-wrapping in the `EventCard` component currently uses the [React Animate Height](https://www.npmjs.com/package/react-animate-height) package. It would be nice to investigate alternatives that may yield a more refined animation.