import Blockies from 'react-blockies';
import styles from './Avatar.module.css';

const Avatar = ({ identity }: {identity: string}) => {
  return (
    <Blockies
      className={styles.Avatar}
      seed={identity}
      size={10}
      scale={3.7}
    />
  );
}

export default Avatar;