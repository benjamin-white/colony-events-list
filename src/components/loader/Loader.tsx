import styles from './Loader.module.css';

const Loader = ({ message }: { message?: React.ReactElement }) => {

  return (
    <div className={styles.Loader}>
      {message ? message : <h1>Loading...</h1>}
    </div>
  );

}

export default Loader;