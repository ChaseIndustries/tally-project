import styles from '../css/loader.module.css'

const Loader = () => {
  return <div className={styles.root}><img src="/images/rebel_logo.svg" width="100" alt="Loading..." className={styles.loader} />
  Loading...
  </div>
}

export default Loader;  