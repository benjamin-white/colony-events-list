import Blockies from 'react-blockies';

const Avatar = ({ identity }: {identity: string}) => {
  return (
    <Blockies
      seed={identity}
      size={10}
      scale={3}
    />
  );
}

export default Avatar;